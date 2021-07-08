import React from "react";
import { Link, useRouteMatch, Router } from "react-router-dom";
import "./index.css";


function EditMealBtn (props) {

    let match = useRouteMatch();
  
    return (
   
        <button className="editmeal">
          <a href={`/editmeal`}>
            <h1>Edit Meal</h1>
            <i className="fas fa-edit"></i>
          </a>  
        </button>
    );
  }
  
  export default EditMealBtn;