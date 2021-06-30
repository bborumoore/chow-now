import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import NewRun from "./pages/NewRun";
import Run from "./pages/Run";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Nav";
import { getFromStorage } from "./utils/storage";


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [uid, setUID] = useState(-1);
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const obj = getFromStorage('chow-now');

        // Validate token **FIND A WAY TO ENSURE THIS HAPPENS AFTER RETRIEVING TOKEN**
        // I think I did that successfully, leaving note just in case
        if (obj && obj.token) {
            const { token } = obj;
            console.log(token);
            fetch('/api/auth/verify?token=' + token)
                .then(res => {
                    setToken(res.token),
                        setIsLoading(false),
                        setIsLoggedIn(true)
                })
        } else {
            setIsLoading(false);
        }
    }, []);



    console.log(loggedIn);
    console.log(uid);

    return (
        <Router>
            <div>

                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route exact path="/dashboard/:uid">
                        <Dashboard />
                    </Route>
                    <Route exact path="/newrun">
                        <NewRun />
                    </Route>
                    <Route exact path="/run/:id">
                        <Run />
                    </Route>
                    <Route exact path="/login">
                        {loggedIn ? <Redirect to="/" /> : <Login loginCB={setLoggedIn} uidCB={setUID} />}
                    </Route>
                    <Route exact path="/signup">
                        <SignUp />
                    </Route>
                    <Route>
                        <NoMatch />
                    </Route>
                </Switch>
                <Navbar />
            </div>
        </Router>
    );
}

export default App;