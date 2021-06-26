import React from "react";
import Row from "./Row";

function AsksBook(props) {
  function renderAskRows() {
    if (!props.orderBookAsks) {
      return <h2>Loading...</h2>;
    }
    return props.orderBookAsks.map((row, index) =><Row
      key={row.price}
      row={row}
      index={index}
      books={props.orderBookAsks}
      zoom={props.zoom}
      type={"asks"}
    />);
  }
  return (
    <div className="table-container">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row">PRICE</div>
        <div className="flex-row">TOTAL</div>
        <div className="flex-row">AMOUNT</div>
        <div className="flex-row">COUNT</div>
      </div>
      {renderAskRows()}
    </div>
  );
}

export default AsksBook;
