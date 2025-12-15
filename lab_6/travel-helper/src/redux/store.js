import { createStore } from "redux";
import cartReducer from "./reducers";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("cartState");
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("cartState", serialized);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const persistedState = loadState();

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(cartReducer, persistedState, devTools);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
