import React from "react";
import "./style.css";

// MealBox displays meal name, MealItem child components, and total meal cost

// TODO: DB needs orderMealName, orderTotalPrice

function MealBox({ children }) {
  return (
    <div style={{ textAlign: "center" }} className="mealbox">
      <h2>#6 Deluxe {props.orderMealName}</h2>
      {children}

      <h2 className="order-total-price">${props.orderTotalPrice}</h2>
    </div>
  );
}

export default MealBox;
