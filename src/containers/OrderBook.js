import React, { Component } from "react";
import Col from "react-bootstrap/lib/Col";
import Row from "react-bootstrap/lib/Row";
import Button from "react-bootstrap/lib/Button";
import ButtonToolbar from "react-bootstrap/lib/ButtonToolbar";

import Container from "react-bootstrap/lib/Container";
import Sockette from "sockette";

import BidsBook from "../components/OrderBook/BidsBook";
import AsksBook from "../components/OrderBook/AsksBook";

import { connect } from "react-redux";
import updateBidsOrderBook from "../store/OrderBook/actions/update_bids";
import clearBidsOrderBook from "../store/OrderBook/actions/clear_bids";
import updateAsksOrderBook from "../store/OrderBook/actions/update_asks";
import clearAsksOrderBook from "../store/OrderBook/actions/clear_asks";
import { bindActionCreators } from "redux";


let ws;
class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionReady: true,
      isConnected: false,
      volume24h: 0,
      lastPrice: 0,
      priceChange: 0,
      zoom:1
    };
  }
  componentDidMount() {
    this.subscribeToAll();
  }
  componentWillUnmount() {
    this.closeConnection();
  }
  subscribeToAll() {
    const self = this;
    let payloadData = {};
    function onConnectionEstablished(e) {
      console.log("connected");
      console.log(e);
      self.setState({ connectionReady: true });
      let bookRequest = JSON.stringify({
        event: "subscribe",
        channel: "book",
        symbol: "tBTCUSD",
      });
      ws.send(bookRequest);
    }

    function onConnectionClosed(e) {
      console.log("closed");
      console.log(e);
    }

    function onMessageRecieved(e) {
      payloadData = JSON.parse(e.data);
      console.log(e);
      console.log(payloadData);

      if (
        !payloadData.event &&
        Array.isArray(payloadData[1]) &&
        payloadData[1].length === 3
      ) {
        //Is order book data
        let tmpbookOrderRow = {
          price: parseFloat(payloadData[1][0]).toFixed(1),
          count: payloadData[1][1],
          amount: parseFloat(payloadData[1][2]).toFixed(2),
          total: parseFloat(0).toFixed(2),
        };
        if (tmpbookOrderRow.amount > 0) {
          self.props.updateBidsOrderBook(tmpbookOrderRow);
        } else {
          self.props.updateAsksOrderBook(tmpbookOrderRow);
        }
      }
    }
    ws = new Sockette("wss://api-pub.bitfinex.com/ws/2", {
      timeout: 5e3,
      maxAttempts: 10,
      onopen: onConnectionEstablished,
      onmessage: onMessageRecieved,
      onreconnect: (e) => console.log("Reconnecting...", e),
      onmaximum: (e) => console.log("Stop Attempting!", e),
      onclose: (e) => onConnectionClosed,
      onerror: (e) => console.log("Error:", e),
    });
    this.setState({ isConnected: true });
  }

  closeConnection() {
    ws.close();
    this.setState({ isConnected: false });
  }

  formmatNumberWithCommas(currentNumber) {
    return currentNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  zoomOut() {
    this.setState({ zoom: this.state.zoom - 0.2 });
  }

  zoomIn() {
    this.setState({ zoom: this.state.zoom + 0.2 });
  }

  render() {
    let priceChangeColor =
      this.state.priceChange >= 0 ? "rgba(82,108,46)" : "rgba(139,42,2)";
    priceChangeColor =
      this.state.priceChange === 0 ? "white" : priceChangeColor;

    let priceChangeSign = this.state.priceChange >= 0 ? " +" : " -";
    priceChangeSign = this.state.priceChange === 0 ? "" : priceChangeSign;

    return (
      <Container fluid={true}>
        <Row>
          <Col lg={12} className="buttons-container text-left mb-3">
            <div className="ticker-container text-left">
              <h3>BTC/USD</h3>
              <p>
                Last Price (USD):{" "}
                {this.formmatNumberWithCommas(this.state.lastPrice.toFixed(1))}{" "}
                / 24h VOL (BTC):{" "}
                {this.formmatNumberWithCommas(this.state.volume24h.toFixed(0))}
              </p>
              <p style={{ color: priceChangeColor }}>
                Price Change:
                {priceChangeSign} {this.state.priceChange.toFixed(2)}%
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Container fluid={true}>
            <Row>
              <Col lg={12}>
                <ButtonToolbar
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <Button
                    disabled={this.state.zoom < 0.21}
                    onClick={this.zoomOut.bind(this)}
                  >
                    Zoom Out
                  </Button>
                  <Button
                    disabled={this.state.zoom === 1}
                    onClick={this.zoomIn.bind(this)}
                  >
                    Zoom In
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
            <Row>
              <Col lg={6} className="bids-container">
                <BidsBook orderBookBids={this.props.orderBookBids} zoom={this.state.zoom} />
              </Col>
              <Col lg={6} className="asks-container">
                <div className="depth-bars-asks-container" />
                <AsksBook orderBookAsks={this.props.orderBookAsks} zoom={this.state.zoom} />
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
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
