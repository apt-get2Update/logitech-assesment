import React from "react";

function Row({ row, index, books, zoom, type }) {
  const maxTotal = books.reduce((a, b) => (a < b.total ? b.total : a), 0);
  const percentage = (row.total * 100) / (maxTotal * zoom);
  // let percentage = ((100 * row.total) / (books[books.length - 1].total * zoom))
  let bimage =
    type === "bits"
      ? `linear-gradient(to left, #314432 ${percentage}%, #1b262d 0%)`
      : `linear-gradient(to right, #402c33 ${percentage}%, #1b262d 0%)`;
  // let staticStyle =  {
  //     display:  "initial",
  //     position: "absolute",
  //     width: `calc(${percentage}% - 10px)`,
  //     height: "17px",
  //   }
  // let style = type === 'bits' ? {...staticStyle, background:"rgba(82,108,46, 0.3)", right: "0px"}:{...staticStyle, background:"rgba(139,42,2, 0.3)",left: "0px"}
  return (
    <div
      className={type === "bits" ? "flex-table" : "flex-table reverse"}
      style={{ backgroundImage: bimage }}
      key={`${type}-${index}${row.amount}${row.count}%${row.price}${row.total}`}
    >
      {/*<span
     style={style}
   />*/}
      <div className="flex-row">{row.count}</div>
      <div className="flex-row">
        {Math.abs(parseFloat(row.amount)).toFixed(4)}
      </div>
      <div className="flex-row">{parseFloat(row.total).toFixed(4)}</div>
      <div className="flex-row">{row.price}</div>
    </div>
  );
}

export default Row;
