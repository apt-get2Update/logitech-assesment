import dataManimpulator from '../reducerUtil';

export default function (state = [], action) {
	switch (action.type) {
		case 'UPDATE_BIDS_ORDER_BOOK': 
			let newState = action.newBidsData;
			return dataManimpulator(state, newState, false);
		case 'CLEAR_BIDS': 
				return action.newBidsData;
		default:
      		return state.slice()
	}
}