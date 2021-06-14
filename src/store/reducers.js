import { combineReducers } from 'redux';
import OrderBookBidsReducer from './OrderBook/reducers/bids'
import OrderBookAsksReducer from './OrderBook/reducers/asks'

const rootReducer = combineReducers({
	orderBookBids: OrderBookBidsReducer,
	orderBookAsks: OrderBookAsksReducer,
});

export default rootReducer;