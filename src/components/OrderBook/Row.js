import React from 'react';

function Row({row,index,books,zoom,type}) {
    let width = ((100 * row.total) / books[books.length - 1].total).toFixed(0) * zoom
    let staticStyle =  {
        display: index > 23 ? "none" : "initial",
        position: "absolute",
        width: `calc(${width}% - 20px)`,
        height: "17px",
      } 
    let style = type === 'bits' ? {...staticStyle, background:"rgba(82,108,46, 0.3)", right: "0px"}:{...staticStyle, background:"rgba(139,42,2, 0.3)",left: "0px"}
   return (<div className={type === 'bits' ? "flex-table" : "flex-table reverse"} key={row.price}>
   <span
     style={style}
   />
   <div className="flex-row">{row.count}</div>
   <div className="flex-row">{Math.abs(parseFloat(row.amount)).toFixed(4)}</div>
   <div className="flex-row">{parseFloat(row.total).toFixed(4)}</div>
   <div className="flex-row">{row.price}</div>
 </div>)
 }

 export default Row;