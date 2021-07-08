import React, {useState} from "react";
import API from "../../../../utils/API";
import { Input, FormBtn } from "../../..//Form";
import "./style.css";

// TODO: is input's prop done correctly?

function MealEditItem(props) {
  // Get order ID
  const oid = props.oid;

  // State
  const [formObject, setFormObject] = useState({});

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
      const { name, value } = event.target;
      setFormObject({ ...formObject, [name]: value })
  };

  // When form is submitted, send information to backend for a login request and store the usersession token in localstorage
  function handleFormSubmit(event) {
    event.preventDefault();

    //Grab State
    const itemName = formObject.itemName;
    const notes = formObject.notes;
    const qty = formObject.qty;
    const price = formObject.price;

    const newOrderItem = {
      orderItemName: itemName,
      orderItemNotes: notes,
      orderItemQty: qty,
      orderItemPrice: price
    }

    // Create the new order item in the database
    API.createOrderItem(newOrderItem)
    .then((res) => {
      // Get the new order items ID
      const orderItem_id = res.data._id;

      // Get the order information
      API.getOrder(oid)
      .then((res) => {
        // get the list of order items
        let orderItems = res.data.orderItems;
        orderItems.push(orderItem_id);

        // Update the order with the updated order items
        API.updateOrder(oid,
          {
            orderItems: orderItems
          })
        .then((res) => {
          // Refresh page to remove add item menu and display new items
          window.location.reload();
        });
      });
    });
}

  return (
    <form className="row add-item-row">
      <div className="item-info">
        <div className="row">
          <div className="col-1 item-icon add">
            <i>❌</i>
          </div>
          <div className="col-7 item-name add">
            <Input 
              name="itemName"
              type="text"
              placeholder="Item name"
              onChange={handleInputChange}
            />
            <br />
            <Input
              name="notes"
              type="text"
              placeholder="Add notes here"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-1 item-qty">
            x<Input
              name="qty"
              type="text"
              placeholder="1"
              onChange={handleInputChange}
              size="2"
            />
          </div>
          <div className="col-2 item-price">
            $<Input
              name="price"
              type="text"
              placeholder="1.99"
              onChange={handleInputChange}
              size="5"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-7">&nbsp;</div>
          <div className="col-4">
            <FormBtn type="button" buttonSize="btn-lg" onClick={handleFormSubmit} >+ Add Item</FormBtn>
          </div>
        </div>
      </div>
    </form>
  );
}

export default MealEditItem;
