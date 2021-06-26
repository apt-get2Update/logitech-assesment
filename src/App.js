import React, { Component } from 'react';
import OrderBook from './containers/OrderBook';

import { Provider } from 'react-redux';

import reducers from './store/store';


class App extends Component {
  render() {
    return (
      <Provider store={reducers}>
        <div className="App">
          <OrderBook/>
        </div>
      </Provider>
    );
  }
}

export default App;
