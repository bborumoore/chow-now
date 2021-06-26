import React from "react";
import "./style.css";

function MealEditItemHeader(props) {
  return (
    <div className="edit-item-header">
      <div className="row">
        <div className="col-1 edit-item-icon">
          <i>✏</i>
        </div>
        <div className="col-7 edit-item-name">
          <h3>ITEM NAME:</h3>
        </div>
        <div className="col-1 edit-item-qty">
          <h3>QTY:</h3>
        </div>
        <div className="col-2 edit-item-price">
          <h3>UNIT:</h3>
        </div>
      </div>
    </div>
  );
}

export default MealEditItemHeader;
