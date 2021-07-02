import React from "react";
import "./style.css";

// MealItem is a row for a single food item.

//TODO: DB needs orderItemQty

function MealItem({ item }) {

  return (
    <div className="row meal-item-row">
      <div className="col-1 edit-icon">
        <i>✏</i>
      </div>
      <div className="col-7 item-name">
        {item.orderItemName}
        <div className="item-details">
          <em>{item.orderItemNotes}</em>
        </div>
      </div>
      <div className="col-1 item-qty">x{item.orderItemQty}</div>
      <div className="col-2 item-price">{item.orderItemPrice}</div>
    </div>
  );
}

export default MealItem;