// Calculate Discount Percentage
function calculateDiscountPercentage(originalPrice, discountedPrice) {
  // Calculate the discount amount
  var discountAmount = originalPrice - discountedPrice;

  // Calculate the discount percentage
  var discountPercentage = (discountAmount / originalPrice) * 100;

  // Round the result to the nearest whole number
  var roundedDiscountPercentage = Math.round(discountPercentage);

  return roundedDiscountPercentage;
}

export default calculateDiscountPercentage;