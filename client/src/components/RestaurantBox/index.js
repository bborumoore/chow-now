import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function RestaurantBox(props) {
  return (
    <div className="restaurant-container">
        <Link to={"/run/:"+props.run_id}>Run #{props.run_id}</Link>
        <h1>{props.restaurant_name}</h1>
        <h3>{props.address}</h3>
    </div>
  );
}

export default RestaurantBox;
