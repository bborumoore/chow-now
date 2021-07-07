import React, {useState, useEffect} from "react";
import "./style.css";
import MealItem from "../MealItem";
import MealEditItem from "../MealEdit/MealEditItem";
import { Button } from "../../Button";

function MealBox(props) {
  // Save orderID for updating
  const oid = props.orderID;
  let listItems = props.listOfItems;

  // State
  const [displayAddItemMenu, setDisplayAddItemMenu] = useState(false);
  function setDisplayAddItemMenuCB() {
    setDisplayAddItemMenu(true);
  }

  // add math stuffs
  let orderTotal = 0;
  for (let iOrder = 0; iOrder < listItems.length; iOrder++) {
    let price = listItems[iOrder].orderItemPrice/100;
    let qty = listItems[iOrder].orderItemQty ? listItems[iOrder].orderItemQty : 1;

    orderTotal += parseFloat(price) * qty;
  }

  return (
    <div style={{ textAlign: "center" }} className="mealbox">
      <h2>{props.orderName}</h2>

      {listItems.map(item => {
        return (
          <MealItem key={item.orderItemName} item={item} />
        )
      })}

      { displayAddItemMenu ? <MealEditItem oid={oid} /> : false }
      { !displayAddItemMenu ? <Button type="button" buttonSize="btn-lg" onClick={setDisplayAddItemMenuCB} >+ Add Item</Button> : false }
      <h2 className="order-total-price">My total: ${orderTotal.toFixed(2)}</h2>
    </div>
  );
}

export default MealBox;
