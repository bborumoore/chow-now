import React, { useState, useCallback } from "react";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import { setInStorage } from "../utils/storage";

function Login() {
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
        const email = formObject.email;
        console.log(email);
        const password = formObject.password;
        console.log(password);

        // Post request to create user session
        API.login(

            {
                password,
                email
            }

            //NOTE: If this isn't working go to 1:12:13 of video for troubleshooting, may need to change header of request
        ).then(res => {
            console.log(res);
            console.log(res.data.success);
            if (res.data.success) {
                setInStorage('chow-now', { token: res.data.token });
            }
        })

    }



    return (
        <div>
            <Jumbotron>
                <h1>Login</h1>
            </Jumbotron>
            <form>
                <Input
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Email (required)"
                    type="email"
                />
                <Input
                    onChange={handleInputChange}
                    name="password"
                    placeholder="Password (required)"
                    type="password"
                />
                <FormBtn onClick={handleFormSubmit}>
                    Login
                </FormBtn>
            </form>
        </div>
    );
}

export default Login;
