import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { Input, FormBtn } from "../components/Form";

function SignUp() {
    // Setting our component's initial state
    const [formObject, setFormObject] = useState({});

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        // API to create user (& login?)
        // API to login
        // Then switch to dashboard
    };

    return (
        <div>
            <Jumbotron>
                <h1>Sign Up</h1>
            </Jumbotron>
            <form>
                <Input 
                    onChange={handleInputChange}
                    name="Username"
                    placeholder="username (required)"
                />
                <Input
                    onChange={handleInputChange}
                    name="First Name"
                    placeholder="First Name (required)"
                />
                <Input
                    onChange={handleInputChange}
                    name="Last Name"
                    placeholder="Last Name (required)"
                />
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
                <Input
                    onChange={handleInputChange}
                    name="Confirm Password"
                    placeholder="password (required)"
                />
                <FormBtn onClick={handleFormSubmit}>
                    Login
                </FormBtn>
            </form>
        </div>
    );
}

export default SignUp;
