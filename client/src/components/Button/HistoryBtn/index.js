import React from "react";
import { Link, useRouteMatch, Router } from "react-router-dom";
import "./index.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function HistoryBtn (props) {

  let match = useRouteMatch();

  return (
   
      <button className="history-btn">
        <a href={`/history`}>
          <h1>History</h1>
          <i className="fas fa-history"></i>
        </a>  
      </button>
   
    
  );
}

export default HistoryBtn;