import React from "react";
import "./style.css";

function MealEditBox({ children }) {
  return (
    <div style={{ textAlign: "center" }} className="meal-edit-box">
      {children}
    </div>
  );
}

export default MealEditBox;
