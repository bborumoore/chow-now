import React from "react";
import Jumbotron from "../components/Jumbotron";

function Dashboard() {

    // Grab id passed in url
    const {id} = useParams();

    return (
        <div>
            <Jumbotron>
                <h1>My Dashboard</h1>
            </Jumbotron>
        </div>
    );
}

export default Dashboard;
