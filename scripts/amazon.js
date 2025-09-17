// ========================================
// AMAZON CLONE - MAIN PRODUCT PAGE SCRIPT
// ========================================
// This file handles the main product listing page functionality
// including displaying products, cart management, and user interactions

// Import necessary modules from other files
import {cart, addToCart} from '../data/cart.js';        // Cart data and add to cart function
import {products} from '../data/products.js';           // Product catalog data
import {formatCurrency} from '../scripts/utils/money.js'; // Currency formatting utility

// ========================================
// CART QUANTITY DISPLAY INITIALIZATION
// ========================================
// Load the saved cart quantity from browser's localStorage
// This ensures the cart count persists even after page refresh
const savedCartQuantity = JSON.parse(localStorage.getItem("cartQuantity"));

// If there's a saved cart quantity, display it in the navbar
// This prevents the cart from showing 0 when the page loads
if(savedCartQuantity !== null)
{
  document.querySelector('.js-cart-quantity').innerHTML = savedCartQuantity;
}


// ========================================
// PRODUCT DISPLAY GENERATION
// ========================================
// Create an empty string to store all product HTML
let productsHTML = '';

// Loop through each product in the products array and generate HTML
// This creates the product grid that users see on the main page
products.forEach((product) => {

  // Build HTML for each product card with all necessary elements
  productsHTML += `
   <div class="product-container">
          <!-- Product Image Section -->
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <!-- Product Name with text truncation -->
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <!-- Star Rating and Review Count -->
          <div class="product-rating-container">
            <!-- Display star rating image based on product.rating.stars -->
            <!-- Multiply by 10 to match image naming convention (4.5 stars = rating-45.png) -->
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <!-- Product Price (converted from cents to dollars) -->
          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <!-- Quantity Selector Dropdown -->
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

          <!-- Spacer for layout -->
          <div class="product-spacer"></div>

          <!-- "Added to Cart" Confirmation Message (initially hidden) -->
          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <!-- Add to Cart Button with product ID for identification -->
          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

// Insert all generated product HTML into the products grid container
document.querySelector('.js-products-grid').innerHTML = productsHTML;



// ========================================
// CART QUANTITY MANAGEMENT
// ========================================
// Object to track timeouts for the "Added" notification for each product
// This prevents multiple notifications from overlapping
let addedCartTimeouts = {};

// Function to update the cart quantity display in the navbar
// This runs whenever items are added, removed, or quantities change
function updateCartQuantity()
{
  // Start with zero and count all items in cart
  let cartQuantity = 0;
  
  // Loop through each item in the cart array
  cart.forEach((cartItem) => {
    // Add the quantity of each item to the total
    cartQuantity += cartItem.quantity;
  });

  // Update the cart quantity display in the navbar
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

  // Save the cart quantity to localStorage for persistence
  // This ensures the count survives page refreshes
  localStorage.setItem('cartQuantity', cartQuantity);

  // Debug logging (can be removed in production)
  console.log('Total cart quantity:', cartQuantity);
  console.log('Current cart contents:', cart);
}

  

  

// ========================================
// ADD TO CART EVENT HANDLERS
// ========================================
// Add click event listeners to all "Add to Cart" buttons
// This handles the main user interaction for adding products to cart
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      
      // Get the product ID from the button's data attribute
      // This identifies which product is being added to cart
      const productId = button.dataset.productId;

      // ========================================
      // VISUAL FEEDBACK - "ADDED" NOTIFICATION
      // ========================================
      // Show the "Added" notification for this specific product
      const addedCart = document.querySelector(`.js-added-to-cart-${productId}`);
      
      // Add CSS class to make the notification visible
      addedCart.classList.add("added-to-cart-active");

      // Clear any existing timeout for this product to prevent overlapping notifications
      if (addedCartTimeouts[productId]) {
        clearTimeout(addedCartTimeouts[productId]);
      }

      // Set a timeout to hide the notification after 2 seconds
      addedCartTimeouts[productId] = setTimeout(() => {
        addedCart.classList.remove('added-to-cart-active');
      }, 2000);

      // ========================================
      // CART FUNCTIONALITY
      // ========================================
      // Get the selected quantity from the dropdown
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector.value);
      
      // Add the product to cart with the selected quantity
      addToCart(productId, quantity);
      
      // Update the cart quantity display in the navbar
      updateCartQuantity();
    });
});

  