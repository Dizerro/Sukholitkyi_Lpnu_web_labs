import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  CLEAR_CART,
} from "./actions";

/* ===== helpers (local to reducer) ===== */
const getCartKey = () => {
  const user = localStorage.getItem("user");
  return user ? `cart_${user}` : null;
};

const loadCart = () => {
  const key = getCartKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key)) || [];
};

const saveCart = (cart) => {
  const key = getCartKey();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(cart));
};
/* ===================================== */

const initialState = {
  cart: loadCart(),
};

function cartReducer(state = initialState, action) {
  let updatedCart;

  switch (action.type) {
    case ADD_TO_CART: {
      const newItem = action.payload;

      const exists = state.cart.find(
        (item) =>
          item.id === newItem.id &&
          item.tourType === newItem.tourType
      );

      updatedCart = exists
        ? state.cart.map((item) =>
            item.id === newItem.id && item.tourType === newItem.tourType
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        : [...state.cart, { ...newItem, qty: 1 }];

      saveCart(updatedCart);
      return { ...state, cart: updatedCart };
    }

    case REMOVE_FROM_CART:
      updatedCart = state.cart.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.tourType === action.payload.tourType
          )
      );
      saveCart(updatedCart);
      return { ...state, cart: updatedCart };

    case INCREASE_QTY:
      updatedCart = state.cart.map((item) =>
        item.id === action.payload.id &&
        item.tourType === action.payload.tourType
          ? { ...item, qty: item.qty + 1 }
          : item
      );
      saveCart(updatedCart);
      return { ...state, cart: updatedCart };

    case DECREASE_QTY:
      updatedCart = state.cart
        .map((item) =>
          item.id === action.payload.id &&
          item.tourType === action.payload.tourType &&
          item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);

      saveCart(updatedCart);
      return { ...state, cart: updatedCart };

    case CLEAR_CART:
      saveCart([]);
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export default cartReducer;
