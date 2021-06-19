import React from "react";
import Jumbotron from "../components/Jumbotron";

function Run() {

    // Grab id passed in url
    const {id} = useParams();

    return (
        <div>
            <Jumbotron>
                <h1>Run</h1>
            </Jumbotron>
        </div>
    );
}

export default Run;