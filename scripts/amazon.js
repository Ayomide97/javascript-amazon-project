import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js'; 
import {formatCurrency} from '../scripts/utils/money.js';




const savedCartQuantity = JSON.parse(localStorage.getItem("cartQuantity"));

if(savedCartQuantity !== null)
{
  document.querySelector('.js-cart-quantity').innerHTML = savedCartQuantity;
}


let productsHTML = '';

// Generate the HTML for each product in the products array.
// The forEach loop goes through each product and adds its HTML to productsHTML.

products.forEach((product) => {

  productsHTML += `
   <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;



// Object to track timeouts for the "Added" notification for each product
let addedCartTimeouts =  {};




  // Update the cart quantity in the navbar and recalculate the total when the dropdown is used
  function updateCartQuantity()
  {
    let cartQuantity = 0;


    
    cart.forEach((cartItem) =>{

      cartQuantity += cartItem.quantity;
    

    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;



    localStorage.setItem('cartQuantity', cartQuantity)

   

    console.log(cartQuantity);
    console.log(cart)
  }

  

  

// Code for what happens when an "Add to Cart" button is clicked
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click',() => {

      const productId = button.dataset.productId;

     


      // Show the "Added" notification and set a timeout to hide it after 2 seconds
      const addedCart = document.querySelector(`.js-added-to-cart-${productId}`);

      addedCart.classList.add("added-to-cart-active")

      if (addedCartTimeouts[productId]){

        clearTimeout(addedCartTimeouts[productId]);

      }

      addedCartTimeouts[productId] = setTimeout(()=>{

        addedCart.classList.remove('added-to-cart-active')

      },2000)

        

    
   
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector.value);
  
      addToCart(productId,quantity);
      updateCartQuantity();
     
      
    });

});

  