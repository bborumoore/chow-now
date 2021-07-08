import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import Navbar from "../components/Nav";
import { Input, FormBtn } from "../components/Form";
import API from "../utils/API";

function SignUp() {
    // Setting our component's initial state
    const [formObject, setFormObject] = useState({});
    const [err, setErr] = useState("");

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When form is submitted, first check to ensure intended passwords match, then create the user in the DB
    function handleFormSubmit(event) {
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


    };

    return (
        <div>
            <Navbar />
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
                <FormBtn onClick={handleFormSubmit}>
                    Sign Up
                </FormBtn>
            </form>
        </div >
    );
}

export default SignUp;
