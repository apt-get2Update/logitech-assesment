import React from "react";
import Row from "./Row";
import Header from "./Header";
function BidsBook(props) {
  function renderBidRows() {
    if (!props.orderBookBids) {
      return <h2>Loading...</h2>;
    }
    return props.orderBookBids.map((row, index) => (
      <Row
        key={row.price}
        row={row}
        index={index}
        books={props.orderBookBids}
        zoom={props.zoom}
        type={"bits"}
        visual={props.visual}
        format={props.format}
        order={props.order}
      />
    ));
  }
  return (
    <div className="table-container">
      <Header order={props.order} className="flex-table header" />
      {renderBidRows()}
    </div>
  );
}

export default BidsBook;
