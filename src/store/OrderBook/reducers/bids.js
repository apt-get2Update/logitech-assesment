import dataManimpulator from "../reducerUtil";

export default function(state = [], action) {
  const { type, newBidsData } = action;
  switch (type) {
    case "UPDATE_BIDS_ORDER_BOOK":
      return dataManimpulator(state, newBidsData, false);
    case "CLEAR_BIDS":
      return newBidsData;
    default:
      return state.slice();
  }
}
