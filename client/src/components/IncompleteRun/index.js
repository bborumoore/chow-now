import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function IncompleteRun(props) {
  return (
    <div className="incomplete-run">
        <h1>{props.name}</h1>
        <h3>owes me ${props.owed_ammount}</h3>
        <Link to={"/run/:"+props.run_id}>Run #{props.run_id}</Link>
    </div>
  );
}

export default IncompleteRun;