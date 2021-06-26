import React, { Component } from "react";
import BidsBook from "../components/OrderBook/BidsBook";
import AsksBook from "../components/OrderBook/AsksBook";
import { connect } from "react-redux";
import updateBidsOrderBook from "../store/OrderBook/actions/update_bids";
import updateAsksOrderBook from "../store/OrderBook/actions/update_asks";
import clearAsksOrderBook from "../store/OrderBook/actions/clear_asks";
import clearBidsOrderBook from "../store/OrderBook/actions/clear_bids";
import { bindActionCreators } from "redux";

let wss;
class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionReady: true,
      isConnected: false,
      pres: 0,
      volume24h: 0,
      lastPrice: 0,
      priceChange: 0,
      zoom: 1,
    };
  }
  componentDidMount() {
    this.subscribeToBtc();
  }
  componentWillUnmount() {
    this.closeConnection();
  }
  morePrecision() {
    this.closeConnection();
    this.props.clearBidsOrderBook();
    this.props.clearAsksOrderBook();
    const currentPres = this.state.pres;
    this.setState({ pres: currentPres + 1 });
    this.subscribeToBtc();
  }

  lessPrecision() {
    this.closeConnection();
    this.props.clearBidsOrderBook();
    this.props.clearAsksOrderBook();
    const currentPres = this.state.pres;
    this.setState({ pres: currentPres - 1 });
    this.subscribeToBtc();
  }
  subscribeToBtc() {
    this.setState({ isConnected: true });
    let onMessageRecieved = (payloadData) => {
      if (
        !payloadData.event &&
        Array.isArray(payloadData[1]) &&
        payloadData[1].length === 3
      ) {
        //Is order book data
        let tmpbookOrderRow = {
          price: parseFloat(payloadData[1][0]),
          count: payloadData[1][1],
          amount: parseFloat(payloadData[1][2]),
          total: parseFloat(0),
        };
        tmpbookOrderRow.amount > 0
          ? this.props.updateBidsOrderBook(
              tmpbookOrderRow,
              this.interFace.order
            )
          : this.props.updateAsksOrderBook(
              tmpbookOrderRow,
              this.interFace.order
            );
      }
    };
    wss = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    wss.onopen = () => {
      console.log("connected");
      this.setState({ connectionReady: true });
      wss.send(JSON.stringify({ event: "conf", flags: 131072 }));
      wss.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          pair: "tBTCUSD",
          prec: "P" + this.state.pres,
          len: 25,
        })
      );
    };

    wss.onmessage = (evt) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(evt.data);
      onMessageRecieved(message);
    };

    wss.onclose = () => {
      console.log("disconnected");
    };
  }

  closeConnection() {
    wss.close();
    this.setState({ isConnected: false });
  }

  zoomOut() {
    this.setState({ zoom: this.state.zoom - 0.2 });
  }

  zoomIn() {
    this.setState({ zoom: this.state.zoom + 0.2 });
  }

  render() {
    return (
      <div>
        <div>
          <button
            disabled={this.state.zoom < 0.21}
            onClick={this.zoomOut.bind(this)}
          >
            Z-
          </button>
          <button
            disabled={this.state.zoom === 1}
            onClick={this.zoomIn.bind(this)}
          >
            Z+
          </button>
          <button
            disabled={this.state.pres === 0}
            onClick={this.lessPrecision.bind(this)}
          >
            P-
          </button>
          <button
            disabled={this.state.pres === 3}
            onClick={this.morePrecision.bind(this)}
          >
            P+
          </button>
        </div>
        <div className="books-wrapper">
          <div className="bids-container">
            <BidsBook
              orderBookBids={this.props.orderBookBids}
              zoom={this.state.zoom}
            />
          </div>
          <div className="asks-container">
            <AsksBook
              orderBookAsks={this.props.orderBookAsks}
              zoom={this.state.zoom}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    orderBookBids: state.orderBookBids,
    orderBookAsks: state.orderBookAsks,
    interFace: state.interFace,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateAsksOrderBook: updateAsksOrderBook,
      updateBidsOrderBook: updateBidsOrderBook,
      clearBidsOrderBook: clearBidsOrderBook,
      clearAsksOrderBook: clearAsksOrderBook,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderBook);
