export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const INCREASE_QTY = "INCREASE_QTY";
export const DECREASE_QTY = "DECREASE_QTY";

export const addToCart = (tour) => ({
  type: ADD_TO_CART,
  payload: tour,
});

export const removeFromCart = (id, tourType) => ({
  type: REMOVE_FROM_CART,
  payload: { id, tourType },
});

export const increaseQty = (id, tourType) => ({
  type: INCREASE_QTY,
  payload: { id, tourType },
});

export const decreaseQty = (id, tourType) => ({
  type: DECREASE_QTY,
  payload: { id, tourType },
});