import React, {useState, useEffect} from "react";
import "./style.css";
import MealItem from "../MealItem";
import MealEditItem from "../MealEdit/MealEditItem";
import { Button } from "../../Button/Button";
import API from "../../../utils/API";

// This was async and the API call was await, but I don't think that is necessary.
function getStatusFromAPI(oid, statusCB) {
  API.getOrder(oid)
    .then((res) => {
      statusCB(res.data.status);
    })
    .catch(err => console.log(err));
}

function MealBox(props) {
  // Save orderID for updating
  const oid = props.orderID;
  let listItems = props.listOfItems;

  // State
  const [displayAddItemMenu, setDisplayAddItemMenu] = useState(false);
  const [status, setStatus] = useState("");
  function setDisplayAddItemMenuCB() {
    setDisplayAddItemMenu(true);
  }

  useEffect(() => {
    getStatusFromAPI(oid,setStatus);
  }, []);

  useEffect(() => {
    // This is here just so the page refreshes once status is updated, it does not refresh otherwise.
    // There is probably a better solution, but time is running out.
  }, [status])

  function updateStatus() {
    API.updateOrder(oid,
      {
          status: "placed",
      })
      .then((res) => {
          window.location.reload();
      })
  }

  // add math stuffs
  let orderTotal = 0;
  for (let iOrder = 0; iOrder < listItems.length; iOrder++) {
    let price = listItems[iOrder].orderItemPrice/100;
    let qty = listItems[iOrder].orderItemQty ? listItems[iOrder].orderItemQty : 1;

    orderTotal += parseFloat(price) * qty;
  }

  return (
    <div className="mealbox">
      <h2 className="meal-title">{props.orderName}</h2>

      <div className="list-items">
        {listItems.map(item => {
          return (
            <MealItem key={item.orderItemName} item={item} />
          )
        })}
      </div>

      { props.runStatus === "started" && displayAddItemMenu ? <MealEditItem oid={oid} /> : false }
      { props.runStatus === "started" && !displayAddItemMenu ? <Button type="button" buttonSize="btn-lg" onClick={setDisplayAddItemMenuCB} >+ Add Item</Button> : false }
      { props.runStatus === "started" && status === "waiting" ? <Button type="button" buttonSize="btn-lg" onClick={updateStatus} >Place Order</Button> : false }
      <h2 className="order-total-price">My total: ${orderTotal.toFixed(2)}</h2>
    </div>
  );
}

export default MealBox;
