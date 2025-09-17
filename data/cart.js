// ========================================
// CART DATA MANAGEMENT MODULE
// ========================================
// This file handles all cart-related operations including:
// - Loading/saving cart data from localStorage
// - Adding/removing items from cart
// - Updating quantities
// - Cart persistence across page refreshes

import {products} from "../data/products.js"

// ========================================
// CART INITIALIZATION
// ========================================
// Load cart data from browser's localStorage
// If no cart exists, localStorage.getItem returns null
export let cart = JSON.parse(localStorage.getItem('cart'));

// If no cart exists in localStorage, create a default cart with sample items
// This provides demo data for first-time visitors
if(!cart){
  cart = [{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',  // Athletic Cotton Socks
    quantity: 2,
    deliveryOptionId: '1'  // Standard delivery (7 days, free)
  }, {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',  // Basketball
    quantity: 1,
    deliveryOptionId: '2'  // Fast delivery (3 days, $4.99)
  }];
}


// ========================================
// LOCAL STORAGE HELPER FUNCTION
// ========================================
// Saves the current cart state to browser's localStorage
// This ensures cart data persists across page refreshes and browser sessions
function saveToStorage()
{
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ========================================
// ADD TO CART FUNCTIONALITY
// ========================================
// Adds a product to the cart or increases quantity if already exists
export function addToCart(productId, quantity)
{
  // Variable to track if the product is already in the cart
  let matchingItem;

  // Search through existing cart items to find a match
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // If product already exists in cart, increase the quantity
  if(matchingItem) {
    matchingItem.quantity += quantity;
  } 
  // If product is new, add it as a new cart item
  else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '1'  // Default to standard delivery (7 days, free)
    });
  }

  // Save the updated cart to localStorage
  saveToStorage();
}


// ========================================
// REMOVE FROM CART FUNCTIONALITY
// ========================================
// Removes a specific product completely from the cart
export function removeFromCart(productId)
{
  // Create a new empty cart array
  const newCart = []; 

  // Loop through all cart items and keep only those that don't match the productId
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  // Replace the old cart with the new cart (without the removed item)
  cart = newCart;

  // Save the updated cart to localStorage
  saveToStorage();
}

// ========================================
// CALCULATE CART QUANTITY FUNCTIONALITY
// ========================================
// Calculates the total number of items in the cart
// Note: This function has some issues and may need debugging
export function calculateCartQuantity(){
  // Initialize cart quantity counter
  let cartQuantity = 0;
  
  // Loop through all cart items and sum up their quantities
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  // Update the cart quantity display in the navbar
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

  // Save cart quantity to localStorage (note: this line has a bug)
  // Should be: localStorage.setItem('cartQuantity', cartQuantity.toString())
  localStorage.setItem(cartQuantity, JSON.stringify('cartQuantity'));

  // Return the calculated quantity
  return cartQuantity;
}


// ========================================
// UPDATE QUANTITY FUNCTIONALITY
// ========================================
// Updates the quantity of a specific product in the cart
export function updateQuantity(productId, newQuantity)
{
  // Variable to track the cart item that matches the productId
  let matchingItem;

  // Search through cart items to find the matching product
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // Update the quantity of the found item
  matchingItem.quantity = newQuantity;

  // Save the updated cart to localStorage
  saveToStorage();
}

  














