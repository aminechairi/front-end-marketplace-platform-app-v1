const limitOfProducts = (sizes) => {
  if (window.matchMedia("(min-width: 1536px)").matches) {
    return sizes[5]; // 2xl
  } else if (window.matchMedia("(min-width: 1280px)").matches) {
    return sizes[4]; // xl
  } else if (window.matchMedia("(min-width: 1024px)").matches) {
    return sizes[3]; // lg
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    return sizes[2]; // md
  } else if (window.matchMedia("(min-width: 640px)").matches) {
    return sizes[1]; // sm
  } else {
    return sizes[0]; // Default limit for small screens
  }
};

export default limitOfProducts;
