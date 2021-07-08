import React from "react";
import { Link, useRouteMatch, Router } from "react-router-dom";
import "./index.css";


function SaveMealBtn (props) {

    let match = useRouteMatch();
  
    return (
     
        <button className="savemeal">
          <a href={`/savemeal`}>
            <h1>Save Meal</h1>
            <i className="fas fa-heart"></i>
          </a>  
        </button>
    );
  }
  
  export default SaveMealBtn;