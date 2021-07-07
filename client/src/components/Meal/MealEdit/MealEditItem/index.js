import React from "react";
import "./style.css";

// TODO: is input's prop done correctly?

function MealEditItem(props) {
  return (
    <div className="row add-item-row">
      <div className="item-info">
        <div className="row">
          <div className="col-1 item-icon add">
            <i>❌</i>
          </div>
          <div className="col-7 item-name add">
            <h4 style={{ "margin": "1px", "padding": "3px" }}>Sprite {props.orderItemName}</h4>
            <input type="text" placeholder="Add additional notes here" style={{ "width": "95%", "fontStyle": "italic" }} />{" "}<em>{props.orderItemNotes}</em>
          </div>

          <div className="col-1 item-qty">x{props.orderItemQty}</div>
          <div className="col-2 item-price">${props.orderItemPrice}</div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-7">&nbsp;</div>
          <div className="col-4">
            <button className="item-add-btn">Add Item</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealEditItem;
