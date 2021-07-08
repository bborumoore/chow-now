import React, { useState, useCallback } from "react";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";
import { setInStorage } from "../utils/storage";
import './AuthPage.css';

function Auth() {
    // Setting our component's initial state
    const [formObject, setFormObject] = useState({});
    const [err, setErr] = useState("");

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When form is submitted, send information to backend for a login request and store the usersession token in localstorage
    function handleFormSubmitLogin(event) {
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
                const url = "http://" + window.location.hostname + ":" + window.location.port + "/dashboard";
                // window.location.replace(url); // does not allow going back with back button
                window.location.href = url; // allows going back with back button
            }
        })

    }

    // When form is submitted, first check to ensure intended passwords match, then create the user in the DB
    function handleFormSubmitSignUp(event) {
        event.preventDefault();

        //Grab State
        const email = formObject.email;
        console.log(email);
        const password = formObject.password;
        console.log(password);
        const confirmPassword = formObject.confirmPassword;
        console.log(confirmPassword);
        const firstName = formObject.firstName;
        console.log(firstName);
        const lastName = formObject.lastName;
        console.log(lastName);

        // Confirm that passwords match
        if (password === confirmPassword) {

            // Post request to backend to create user
            API.signup(
                {
                    firstName,
                    lastName,
                    password,
                    email
                }
                //NOTE: If this isn't working go to 1:12:13 of video for troubleshooting, may need to change header of request
            ).then(res => {
                setErr({
                    err: res.message
                });
                console.log(err);
                if (res.sucess) {
                    setFormObject({
                        firstName: '',
                        lastName: '',
                        password: '',
                        email: '',
                        confirmPassword: ''
                    })
                }
            })

        } else {
            return res.send("Passwords must match.")
        }
    }



        return (
            <div class="wrapper">
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
                        <FormBtn onClick={handleFormSubmitLogin}>
                            Login
                        </FormBtn>
                    </form>
                </div>

                <div>
                    <Jumbotron>
                        <h1>Sign Up</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="firstName"
                            placeholder="First Name (required)"
                        />
                        <Input
                            onChange={handleInputChange}
                            name="lastName"
                            placeholder="Last Name"
                        />
                        <Input
                            onChange={handleInputChange}
                            name="email"
                            placeholder="Email (required)"
                        />
                        <Input
                            onChange={handleInputChange}
                            name="password"
                            placeholder="Password (required)"
                        />
                        <Input
                            onChange={handleInputChange}
                            name="confirmPassword"
                            placeholder="Confirm Password (required)"
                        />
                        <FormBtn onClick={handleFormSubmitSignUp}>
                            Sign Up
                        </FormBtn>
                    </form>
                </div >
            </div>

        );
    }

    export default Auth;
