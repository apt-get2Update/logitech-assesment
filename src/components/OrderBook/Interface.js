import React from "react";

const orders = [
  "count,price,amount,total",
  "count,amount,total,price",
  "count,total,price,amount",
];
const formats = ["compact", "normal"];
const toProperCase = function(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
const InterfaceView = (props) => {
  const { interFace, updateVisualization, updateOrder, updateFormat } = props;
  const { order, format, visual } = interFace;
  return (
    <div>
      <section>
        <header>Book Depth Visualization:</header>
        <div>
          <input
            type="radio"
            id="default"
            value="default"
            checked={visual === "default"}
            onChange={() => updateVisualization("default")}
          />
            <label htmlFor="default">Cumulative (default)</label>
          <br />
          <input
            type="radio"
            id="amount"
            value="amount"
            checked={visual === "amount"}
            onChange={() => updateVisualization("amount")}
          />
            <label htmlFor="amount">Amount</label>
        </div>
      </section>
      <section>
        <header>Choose the order of the columns in the order book:</header>
        <div>
          {orders.map((o) => (
            <div key={o}>
              <input
                type="radio"
                id={o}
                value={o}
                checked={order === o}
                onChange={() => updateOrder(o)}
              />
               {" "}
              <label htmlFor={o}>
                {o
                  .split(",")
                  .map(toProperCase)
                  .join(" ")}
                {" "}<b>
                  {o
                    .split(",")
                    .map(toProperCase)
                    .reverse()
                    .join(" ")}
                </b>
              </label>
            </div>
          ))}
        </div>
      </section>
      <section>
        <header>Book Amount and Total format numbers:</header>
        <div>
          {formats.map((o) => (
            <div key={o}>
              <input
                type="radio"
                id={o}
                value={o}
                checked={format === o}
                onChange={() => updateFormat(o)}
              />
                <label htmlFor={o}>{toProperCase(o)}</label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InterfaceView;
