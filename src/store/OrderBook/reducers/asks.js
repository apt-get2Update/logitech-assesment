import dataManimpulator from '../reducerUtil'
export default function (state = [], action) {
	switch (action.type) {
		case 'UPDATE_ASKS_ORDER_BOOK': 
			let newState = action.newAsksData;
			return dataManimpulator(state, newState, true);
			case 'CLEAR_ASKS': 
				return action.newAsksData;

		default:
      		return state.slice()
	}
}