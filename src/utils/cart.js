// src/utils/cart.js
export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem('hygiena_cart') || '[]');
  } catch {
    return [];
  }
};

export const saveCart = (cart) => {
  localStorage.setItem('hygiena_cart', JSON.stringify(cart));
};

export const addToCart = (product, qty = 1) => {
  const cart = getCart();
  const index = cart.findIndex((p) => p.id === product.id);
  if (index > -1) {
    cart[index].qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  saveCart(cart);
  return cart;
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((s, p) => s + (p.qty || 0), 0);
};
