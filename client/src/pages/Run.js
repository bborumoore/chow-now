import React from "react";
import { useParams } from "react-router-dom";
import RestaurantBox from "../components/RestaurantBox";
import StatusBar from '../components/StatusBar';

function Run() {

    // Grab id passed in url
    const {id} = useParams();

    // Create a list of components with the users (invitees) and their orders.
    let invitees = [<div>Bryce</div>,
                    <div>Thomas</div>]; // Placeholder info for now

    return (
        <div>
            <p>This is all placeholder info for now</p>
            <RestaurantBox restaurant_name="Imaginary Restaurant" address="1234 5th st."/>
            <StatusBar status="started" time="12:30 PM"/>
            <h3>Group:</h3>
            {invitees}
        </div>
    );
}

export default Run;