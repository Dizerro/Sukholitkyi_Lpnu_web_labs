import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREASE_QTY,
  DECREASE_QTY,
  CLEAR_CART,
} from "./actions";

const initialState = {
  cart: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const newItem = action.payload;

      const exists = state.cart.find(
        (item) =>
          item.id === newItem.id &&
          item.tourType === newItem.tourType
      );

      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === newItem.id && item.tourType === newItem.tourType
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...newItem, qty: 1 }],
      };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.tourType === action.payload.tourType
            )
        ),
      };

    case INCREASE_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id &&
          item.tourType === action.payload.tourType
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };

    case DECREASE_QTY:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id &&
            item.tourType === action.payload.tourType &&
            item.qty > 1
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter((item) => item.qty > 0),
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}

export default cartReducer;
