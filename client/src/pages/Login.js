import React, { useState, useCallback } from "react";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";

function Login({loginCB, uidCB}) {
    // Setting our component's initial state
    const [formObject, setFormObject] = useState({});

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, request the user object from the DB to compare the 
    // input password vs the stored password
    function handleFormSubmit(event) {
        event.preventDefault();

        // Decalare variables to be used for login validation
        let email = formObject.Email;
        console.log("email: " + email);
        let password = formObject.Password;
        console.log("password: " + password);

        // API to login
        API.getUserByEmail(email)
            .then(res => {
                console.log(res);
                console.log(res.data.password);
                    if(res.data.password === password) {
                        loginCB(true);
                        uidCB(res.data._id);
                        alert("You are logged in!");
                    } else {
                        alert("Incorrect email or password!");
                    }
                })
            .catch(err => console.log(err));
        // Then switch to dashboard
    };

    return (
        <div>
            <Jumbotron>
                <h1>Login</h1>
            </Jumbotron>
            <form>
                <Input
                    onChange={handleInputChange}
                    name="Email"
                    placeholder="email (required)"
                />
                <Input
                    onChange={handleInputChange}
                    name="Password"
                    placeholder="password (required)"
                />
                <FormBtn onClick={handleFormSubmit}>
                    Login
                </FormBtn>
            </form>
        </div>
    );
}

export default Login;
