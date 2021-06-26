import React, { Component } from "react";
import BidsBook from "../components/OrderBook/BidsBook";
import AsksBook from "../components/OrderBook/AsksBook";
import { connect } from "react-redux";
import updateBidsOrderBook from "../store/OrderBook/actions/update_bids";
import updateAsksOrderBook from "../store/OrderBook/actions/update_asks";
import clearAsksOrderBook from "../store/OrderBook/actions/clear_asks";
import clearBidsOrderBook from "../store/OrderBook/actions/clear_bids";
import { bindActionCreators } from "redux";

const wss = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionReady: true,
      isConnected: false,
      pres: "P0",
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
    switch (currentPres) {
      case "P0":
        this.setState({ pres: "P1" });
        break;

      case "P1":
        this.setState({ pres: "P2" });
        break;

      case "P2":
        this.setState({ pres: "P3" });
        break;

      default:
        return;
    }

    this.subscribeToBtc();
  }

  lessPrecision() {
    this.closeConnection();
    this.props.clearBidsOrderBook();
    this.props.clearAsksOrderBook();
    const currentPres = this.state.pres;
    switch (currentPres) {
      case "P3":
        this.setState({ pres: "P2" });
        break;

      case "P2":
        this.setState({ pres: "P1" });
        break;

      case "P1":
        this.setState({ pres: "P0" });
        break;

      default:
        return;
    }

    this.subscribeToBtc();
  }
  subscribeToBtc() {
    const self = this;
    this.setState({ isConnected: true });

    function onMessageRecieved(payloadData) {
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
        if (tmpbookOrderRow.amount > 0) {
          self.props.updateBidsOrderBook(tmpbookOrderRow);
        } else {
          self.props.updateAsksOrderBook(tmpbookOrderRow);
        }
      }
    }

    wss.onopen = () => {
      console.log("connected");
      self.setState({ connectionReady: true });
      wss.send(JSON.stringify({ event: "conf", flags: 131072 }));
      wss.send(
        JSON.stringify({
          event: "subscribe",
          channel: "book",
          pair: "tBTCUSD",
          prec: self.state.pres,
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
      // automatically try to reconnect on connection loss
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
            Zoom Out
          </button>
          <button
            disabled={this.state.zoom === 1}
            onClick={this.zoomIn.bind(this)}
          >
            Zoom In
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
    tradesList: state.tradesList,
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
