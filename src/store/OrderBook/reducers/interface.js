export default function(
  state = { format: "compact", visual: "default", order: "count,price,amount,total" },
  action
) {
  const { type, data } = action;
  switch (type) {
    case "UPDATE_ORDER":
      return { ...state, order: data };
    case "UPDATE_VISUALIZATION":
      return { ...state, visual: data };
    case "UPDATE_FORMAT":
      return { ...state, format: data };
    default:
      return { ...state };
  }
}
