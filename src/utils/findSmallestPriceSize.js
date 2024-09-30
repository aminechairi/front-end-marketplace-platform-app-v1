export const findSmallestPriceSize = (sizes) => {
  if (sizes.length === 0) return {};

  // Filtering sizes with a quantity greater than 0.
  const availableSizes = sizes.filter((item) => item.quantity > 0);

  let smallestPriceSize;
  if (availableSizes.length > 0) {
    // Finding the size with the smallest price among available sizes.
    smallestPriceSize = availableSizes.reduce((min, size) =>
      size.price < min.price ? size : min
    );
  } else {
    // Finding the size with the smallest price if no sizes are available.
    smallestPriceSize = sizes.reduce((min, size) =>
      size.price < min.price ? size : min
    );
  }

  return smallestPriceSize;
};
