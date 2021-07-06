import React from "react";
import "./style.css";

function UserOrder(props) {
  return (
    <div className="incomplete-run">
        <h1>{props.name} ${props.total}</h1>
        <h3>{props.status}</h3>
    </div>
  );
}

export default UserOrder;