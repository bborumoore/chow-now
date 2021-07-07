import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function AddMealBtn(props) {
  return (
    <div>
      <button className="add-meal-btn">Add Meal</button>
    </div>
  );
}

export default AddMealBtn;
