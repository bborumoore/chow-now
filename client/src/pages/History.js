import React from "react";
import Jumbotron from "../components/Jumbotron";
import { useParams } from "react-router-dom";

function History() {

    // Grab id passed in url
    const {id} = useParams();

    return (
        <div>
            <Jumbotron>
                <h1>History</h1>
            </Jumbotron>
        </div>
    );
}

export default History;