// ========================================
// DELIVERY OPTIONS DATA
// ========================================
// This file contains all available delivery options for the Amazon clone
// Each option includes delivery time and cost information

export const deliveryOptions = [{
  id: '1',                    // Unique identifier for standard delivery
  deliveryDays: 7,            // Delivery takes 7 days
  priceCents: 0               // Free shipping (0 cents)
},{
  id: '2',                    // Unique identifier for fast delivery
  deliveryDays: 3,            // Delivery takes 3 days
  priceCents: 499             // $4.99 shipping cost
},{
  id: '3',                    // Unique identifier for express delivery
  deliveryDays: 1,            // Delivery takes 1 day
  priceCents: 999             // $9.99 shipping cost
}];