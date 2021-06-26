import React from "react";
import Row from './Row';

function BidsBook(props) {
  
  function renderBidRows() {
    
    if (!props.orderBookBids) {
      return <h2>Loading...</h2>;
    }
    return props.orderBookBids.map((row, index) =><Row
      key={row.price}
      row={row}
      index={index}
      books={props.orderBookBids}
      zoom={props.zoom}
      type={"bits"}
    />);
  } 
    return (

      <div className="table-container">
      <div className="flex-table header" role="rowgroup">
        <div className="flex-row">COUNT</div>
        <div className="flex-row">AMOUNT</div>
        <div className="flex-row">TOTAL</div>
        <div className="flex-row">PRICE</div>
      </div>
      {renderBidRows()}
    </div>
    );
}

export default BidsBook;
