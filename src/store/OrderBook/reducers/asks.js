import dataManimpulator from "../reducerUtil";
export default function(state = [], action) {
  const { type, newAsksData } = action;
  switch (type) {
    case "UPDATE_ASKS_ORDER_BOOK":
      return dataManimpulator(state, newAsksData, true);
    case "CLEAR_ASKS":
      return newAsksData;
    default:
      return state.slice();
  }
}
