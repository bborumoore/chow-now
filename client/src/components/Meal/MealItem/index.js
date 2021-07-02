import React from "react";
import "./style.css";

// MealItem is a row for a single food item.

//TODO: DB needs orderItemQty

function MealItem(props) {
  return (
    <div className="row meal-item-row">
      <div className="col-1 edit-icon">
        <i>✏</i>
      </div>
      <div className="col-7 item-name">
        Cheeseburger {props.orderItemName}
        <div className="item-details">
          <em>No pickles, no tomato{props.orderItemNotes}</em>
        </div>
      </div>
      <div className="col-1 item-qty">x{props.orderItemQty}</div>
      <div className="col-2 item-price">${props.orderItemPrice}</div>
    </div>
  );
}

export default MealItem;
