// ========================================
// CURRENCY FORMATTING UTILITY
// ========================================
// This utility file handles currency formatting for the Amazon clone
// Converts price values from cents to dollars with proper formatting

// ========================================
// FORMAT CURRENCY FUNCTION
// ========================================
// Converts price from cents to dollars and formats with 2 decimal places
// Example: 1090 cents becomes "10.90"
export function formatCurrency(priceCents)
{
  // Divide by 100 to convert cents to dollars
  // Use toFixed(2) to ensure exactly 2 decimal places
  return (Math.round(priceCents) / 100).toFixed(2);
}

// Export as default for easier importing
export default formatCurrency;