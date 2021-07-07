import React from "react";
import "./style.css";
import MealItem from "../MealItem";

function MealBox(props) {

  let listItems = props.listOfItems;

  // add math stuffs
  let orderTotal = 0;
  for (let iOrder = 0; iOrder < listItems.length; iOrder++) {
    let price = listItems[iOrder].orderItemPrice.replace("$", "");
    let qty = listItems[iOrder].orderItemQty;

    orderTotal += parseFloat(price) * qty;
  }

  return (
    <div className="mealbox">
      <h2 className="meal-title">#6 Deluxe {props.orderMealName}</h2>
      <div className="list-items">

        {listItems.map(item => {
          return (
            <MealItem item={item} />
          )
        })}
      </div>
      <h2 className="order-total-price">${orderTotal.toFixed(2)}</h2>
    </div>
  );
}

export default MealBox;
