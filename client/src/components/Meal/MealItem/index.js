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
        <h4>{item.orderItemName}</h4>
        <div className="item-details">
          <em>{item.orderItemNotes}</em>
        </div>
      </div>
      <div className="col-1 item-qty">x{item.orderItemQty ? item.orderItemQty : 1}</div>
      <div className="col-3 item-price">{"$"+(item.orderItemPrice/100).toFixed(2)}</div>
    </div>
  );
}

export default MealItem;
