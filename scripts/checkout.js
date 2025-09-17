// ========================================
// CHECKOUT PAGE FUNCTIONALITY
// ========================================
// This file handles the checkout page where users can:
// - View items in their cart
// - Update quantities
// - Remove items
// - Select delivery options
// - See delivery dates and costs

// Import necessary modules
import{cart, updateQuantity, updateDeliveryOption} from '../data/cart.js'        // Cart data and quantity updates
import {products} from '../data/products.js';              // Product catalog
import {formatCurrency} from '../scripts/utils/money.js'    // Currency formatting
import {removeFromCart} from '../data/cart.js';            // Remove items from cart
import {calculateCartQuantity} from '../data/cart.js';     // Calculate total items
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'  // Date manipulation library
import{deliveryOptions} from '../data/deliverOptions.js'   // Available delivery options





updateCartQuantity();

const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd,MMMM D'));


function updateCartQuantity()
{
  

  let cartQuantity = 0;
    
  cart.forEach((cartItem) =>{

    cartQuantity += cartItem.quantity;


  });

  document.querySelector('.js-return-to-home-link').innerHTML =`${cartQuantity} items`;

  
}






let cartSummaryHTML = '';

cart.forEach((cartItem) => {

  const productId = cartItem.productId

  let matchingProduct;

  products.forEach((product)=>{

    if(product.id === productId){

      matchingProduct = product;

    }

  });

  console.log(matchingProduct);


  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option)=>{

    if(option.id === deliveryOptionId)
    {

      deliveryOption = option;

    }

  });


  const today = dayjs();

  const deliveryDate = today.add(

    deliveryOption.deliveryDays,
    'days'
  );

  const dateString = deliveryDate.format('dddd, MMMM, D');







  cartSummaryHTML +=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
           ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          ${deliveryOptionsHTML(matchingProduct,cartItem)}
 
        
        </div>
      </div>
    </div>
  `



});

function deliveryOptionsHTML(matchingProduct,cartItem){

  let html = '';


  deliveryOptions.forEach((deliveryOption)=>{

    const today = dayjs();

    const deliveryDate = today.add(

      deliveryOption.deliveryDays,
      'days'
    );

    const dateString = deliveryDate.format('dddd, MMMM, D');

    const priceString = deliveryOption.priceCents === 0
    ? 'Free'
    : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === 
    cartItem.deliveryOptionId;


    html +=
    `
       <div class="delivery-option js-delivery-option"
       data-product-id="${matchingProduct.id}"
       data-delivery-option-id="${deliveryOption.id}">
            <input type="radio"
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div> 
    `
  });
  return html
}



document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML ;

document.querySelectorAll('.js-delete-link').forEach((link) => {

  link.addEventListener('click', () => {

    const productId = link.dataset.productId;
    removeFromCart(productId);
    

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
    updateCartQuantity();
  });

  
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click',() =>{


    const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  
  });
});

document.querySelectorAll(`.js-update-link`).forEach((link)=>{

  link.addEventListener('click', () =>{

    const productId = link.dataset.productId;
    console.log(productId);


    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.classList.add('is-editing-quantity');


    

  });


});


document.querySelectorAll(`.js-save-link`).forEach((link) => {

  link.addEventListener('click', () => {

    const productId = link.dataset.productId;
   


    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');
    

    const getQuantity = document.querySelector(`.js-quantity-input-${productId}`);
    
    const newQuantity = Number(getQuantity.value);
    updateQuantity(productId, newQuantity);

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = newQuantity;

    updateCartQuantity();

    if(newQuantity < 0 || newQuantity >= 1000){

      alert('Quantity must be at least 0 and less than 1000');
      return;

    }

  });




});

