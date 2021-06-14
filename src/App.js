import React, { Component } from 'react';
import OrderBook from './containers/OrderBook';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './store/reducers';

import './scss/App.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <div className="App">
          <OrderBook/>
        </div>
      </Provider>
    );
  }
}

export default App;
