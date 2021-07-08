import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Nav";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import { getFromStorage } from "../utils/storage";
import "./../styles/app.scss";

function NewRun() {
    // Get token/uid from local storage
    const obj = getFromStorage('chow-now');
    const { token } = obj;
    const runner = token;

    // Setting our component's initial state
    const [formObject, setFormObject] = useState({});

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When form is submitted, send information to backend for a login request and store the usersession token in localstorage
    function handleFormSubmit(event) {
        event.preventDefault();

        //Grab State
        const restaurantName = formObject.restaurantName;
        const restaurantAddress = formObject.restaurantAddress;
        const time = formObject.orderTime;

        // Post request to create user session
        API.createRun(
            {
                runner: runner,
                restaurantName: restaurantName,
                restaurantAddress: restaurantAddress,
                time: time
            }
            //NOTE: If this isn't working go to 1:12:13 of video for troubleshooting, may need to change header of request
        ).then(res => {
            const rid = res.data._id;
            const url = "http://" + window.location.hostname + ":" + window.location.port + "/run/" + rid;
            window.location.replace(url); // does not allow going back with back button
            // window.location.href = url; // allows going back with back button
        });
    }

    return (
        <div>
            <Jumbotron>
                <h1>New Run</h1>
            </Jumbotron>
            <form>
                <div>
                    <Input
                        onChange={handleInputChange}
                        name="restaurantName"
                        placeholder="Restaurant Name"
                        type="text"
                    />
                    <Input
                        onChange={handleInputChange}
                        name="restaurantAddress"
                        placeholder="Address"
                        type="text"
                    />
                </div>

                <div>
                    <h4>Order time: &emsp; Today at <Input onChange={handleInputChange} name="orderTime" type="time" /></h4>
                </div>

                <h5 className="new-run-created-text">Once the run is created, you will be given a link you can send to invite others!</h5>

                <FormBtn onClick={handleFormSubmit}>
                    Create Run
                </FormBtn>
            </form>
        </div>
    );
}

export default NewRun;