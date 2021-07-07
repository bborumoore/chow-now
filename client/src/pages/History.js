import React from "react";
import Jumbotron from "../components/Jumbotron";
import { useParams } from "react-router-dom";
import EditMeal from "../components/Button/EditMeal"
import SaveMeal from "../components/Button/SaveMeal"

function History() {

    // Grab id passed in url
    const { id } = useParams();

    return (
        <div>
            <Jumbotron>
                <h1>History Page</h1>
            </Jumbotron>
            <EditMeal />
            <SaveMeal />
        </div>

    );
}



export default History;