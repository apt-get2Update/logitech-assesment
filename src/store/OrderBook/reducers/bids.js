import dataManimpulator from "../reducerUtil";

export default function(state = [], action) {
  const { type, newBidsData, orderBy } = action;
  switch (type) {
    case "UPDATE_BIDS_ORDER_BOOK":
      return dataManimpulator(state, newBidsData, false, orderBy);
    case "CLEAR_BIDS":
      return newBidsData;
    default:
      return state.slice();
  }
}
