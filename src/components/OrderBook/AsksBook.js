import React from "react";
import Row from "./Row";
import Header from "./Header";

function AsksBook(props) {
  function renderAskRows() {
    if (!props.orderBookAsks) {
      return <h2>Loading...</h2>;
    }
    return props.orderBookAsks.map((row, index) => (
      <Row
        key={row.price}
        row={row}
        index={index}
        books={props.orderBookAsks}
        zoom={props.zoom}
        type={"asks"}
        visual={props.visual}
        format={props.format}
        order={props.order}
      />
    ));
  }
  return (
    <div className="table-container">
      <Header order={props.order} className="flex-table header reverse" />
      {renderAskRows()}
    </div>
  );
}

export default AsksBook;
