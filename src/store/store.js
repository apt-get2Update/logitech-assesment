import { createStore, combineReducers } from "redux";
import OrderBookBidsReducer from "./OrderBook/reducers/bids";
import OrderBookAsksReducer from "./OrderBook/reducers/asks";
import interFace from "./OrderBook/reducers/interface";

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("state", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem("state");
    return stateStr ? JSON.parse(stateStr) : undefined;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const rootReducer = combineReducers({
  orderBookBids: OrderBookBidsReducer,
  orderBookAsks: OrderBookAsksReducer,
  interFace: interFace,
});

const persistedStore = loadFromLocalStorage();

const store = createStore(rootReducer, persistedStore);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
