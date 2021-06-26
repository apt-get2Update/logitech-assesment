import React from "react";

function Row({
  row,
  index,
  books,
  zoom,
  type,
  visual,
  format,
  order = "count,price,amount,total",
}) {
  const point = format === "compact" ? 2 : 4;
  const key = visual === "default" ? "total" : "amount";
  const maxTotal = books.reduce((a, b) => (a < b[key] ? b[key] : a), 0);
  const percentage = (row[key] * 100) / (maxTotal * zoom);

  let bimage =
    type === "bits"
      ? `linear-gradient(to left, #314432 ${percentage}%, #1b262d 0%)`
      : `linear-gradient(to right, #402c33 ${percentage}%, #1b262d 0%)`;
  const keys = order.split(",");
  return (
    <div
      className={type === "bits" ? "flex-table" : "flex-table reverse"}
      style={{ backgroundImage: bimage }}
      key={`${type}-${index}${row.amount}${row.count}%${row.price}${row.total}`}
    >
      {keys.map((k) => (
        <div className="flex-row">
          {k === "amount" || k === "total"
            ? Math.abs(parseFloat(row[k])).toFixed(point)
            : row[k]}
        </div>
      ))}
    </div>
  );
}

export default Row;
