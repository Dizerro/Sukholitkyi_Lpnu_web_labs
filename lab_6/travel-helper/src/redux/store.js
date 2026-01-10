import { createStore } from "redux";
import cartReducer from "./reducers";

const makeStorageKey = (userEmail) => `cartState_${userEmail}`;

const loadStateForUser = (userEmail) => {
  try {
    if (!userEmail) return undefined;
    const serialized = localStorage.getItem(makeStorageKey(userEmail));
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

const saveStateForUser = (userEmail, state) => {
  try {
    if (!userEmail) return;
    localStorage.setItem(makeStorageKey(userEmail), JSON.stringify(state));
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const createAppStore = (userEmail) => {
  const persistedState = loadStateForUser(userEmail);

  const store = createStore(cartReducer, persistedState, devTools);

  store.subscribe(() => {
    saveStateForUser(userEmail, store.getState());
  });

  return store;
};
