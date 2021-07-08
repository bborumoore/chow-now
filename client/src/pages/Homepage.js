import React from "react";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Nav";

function Homepage() {
    return (
        <div>
            <Navbar />
            <Jumbotron>
                <h1>Welcome To Chow Now</h1>
            </Jumbotron>
        </div>
    );
}

export default Homepage;
