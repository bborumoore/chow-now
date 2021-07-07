import React from "react";
import "./style.css";

function MealEditItemHeader(props) {
  return (
    <div className="edit-item-header">
      <div className="row">
        <div className="col-1 edit-item-icon">
          <i>&nbsp;</i>
        </div>
        <div className="col-7 edit-item-name">
          <h6>Item Name:</h6>
        </div>
        <div className="col-1 edit-item-qty">
          <h6>Qty:</h6>
        </div>
        <div className="col-2 edit-item-price">
          <h6>Unit:</h6>
        </div>
      </div>
    </div>
  );
}

export default MealEditItemHeader;
