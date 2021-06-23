import React from "react";
import Jumbotron from "../components/Jumbotron";
import { useParams } from "react-router-dom";

function Dashboard() {

    // Grab id passed in url
    const {id} = useParams();

    //arrays to hold associated componenets.
    const runInvites = [];
    const activeRuns = [];
    const incompleteRuns = [];
    const ious = [];

    return (
        <div>
            <Jumbotron>
                <h1>My Dashboard</h1>
            </Jumbotron>
            
            {runInvites.length > 0 &&
                <div>
                    <h3>Run Invites:</h3>
                    {runInvites}
                </div>
            }

            <h3>Active Runs:</h3>
            {activeRuns}

            <h3>Incomplete Runs:</h3>
            {incompleteRuns}

            <h3>IOUs:</h3>
            {ious}

        </div>
    );
}

export default Dashboard;
