import React from "react";
import "./style.css";

// TODO: is input's prop done correctly?

function MealItemEdit(props) {
  return (
    <div className="row add-item-row">
      <div className="item-info">
        <div className="row">
          <div className="col-1 item-icon add">
            <i>❌</i>
          </div>
          <div className="col-7 item-name add">
            Sprite {props.orderItemName}
            <input type="text" placeholder="Add additional notes here" />{" "}
            Notes are here {props.orderItemNotes}
          </div>

          <div className="col-1 item-qty">x{props.orderItemQty}</div>
          <div className="col-2 item-price">${props.orderItemPrice}</div>
        </div>
      </div>

      <div className="btn-item-add">
        <div className="row">
          <div className="col-7">&nbsp;</div>
          <div className="col-4">
            <button className="btn-add-item">+ Add Item</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealItemEdit;
