import React from "react";
import Jumbotron from "../components/Jumbotron";
import { useParams } from "react-router-dom";
import EditMeal from "../components/EditMeal"
import SaveMeal from "../components/SaveMeal"

function History() {

    // Grab id passed in url
    const {id} = useParams();

    return (
        <div>
            <p>This is the history page.</p>
            <EditMeal />
            <SaveMeal />
        </div>
       
    );
}

    

export default History;