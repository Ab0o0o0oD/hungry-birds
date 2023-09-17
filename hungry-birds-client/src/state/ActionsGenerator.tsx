import { CartItem, Product } from '../types';

export const addToCart = (
  cartItems: CartItem[],
  product: Product,
): CartItem[] => {
  return [
    ...cartItems,
    {
      product: product,
      quantity: 1,
    },
  ];
};

export const deleteFromCart = (
  cartItems: CartItem[],
  product: Product,
): CartItem[] => {
  return cartItems.filter((item) => item.product.id !== product.id);
};
export const incrementItem = (
  cartItems: CartItem[],
  product: Product,
): CartItem[] => {
  return cartItems?.map((cartItem: CartItem) =>
    cartItem.product.id === product.id
      ? {
          ...cartItem,
          ...{
            product: product,
            quantity: cartItem.quantity + 1,
          },
        }
      : cartItem,
  );
};

export const decrementItem = (
  cartItems: CartItem[],
  product: Product,
): CartItem[] => {
  const updatedCartItems = cartItems.map((cartItem) => {
    if (cartItem.product.id === product.id) {
      return {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      };
    }
    return cartItem;
  });

  return updatedCartItems.filter((item) => item.quantity > 0);
};

export const updateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems
    ?.map((item) => item.quantity * item.product.price)
    .reduce(
      (previousValue, currentValue, currentIndex) =>
        previousValue + currentValue,
      0,
    );
};
