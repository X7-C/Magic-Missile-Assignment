export const getCart = (): any[] => {
  const user = localStorage.getItem("user");
  if (!user) return [];

  const cartKey = `cart_${JSON.parse(user).name}`;
  const cart = localStorage.getItem(cartKey);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: any) => {
  let cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  const user = localStorage.getItem("user");
  if (user) {
    const cartKey = `cart_${JSON.parse(user).name}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }
};

export const removeFromCart = (id: string) => {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== id);

  const user = localStorage.getItem("user");
  if (user) {
    const cartKey = `cart_${JSON.parse(user).name}`;
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }
};

export const clearCart = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const cartKey = `cart_${JSON.parse(user).name}`;
    localStorage.removeItem(cartKey);
  }
};
