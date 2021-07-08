import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import NewRun from "./pages/NewRun";
import AddMeal from "./pages/AddMeal";
import Run from "./pages/Run";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";
import Auth from "./pages/AuthPage";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Nav";
import HistoryBtn from "./components/Button/HistoryBtn";
//import { apiRequest } from "./utils/API";
//import { LOGIN } from "./utils/auth";
import { getFromStorage } from "./utils/storage";
import "./App.css";
import Contact from "./pages/Contact";

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
      //     fetch('/api/auth/verify?token=' + token)
      //         .then(res => res.json())
      //         .then(res => {
      //             console.log(res);
      //             setIsLoading(false);
      //             setLoggedIn(res.success);

      //         })
      // } else {
      //     setIsLoading(false);
    }
  }, []);

  console.log("Logged In: " + loggedIn);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/newrun">
            <NewRun />
          </Route>
          <Route exact path="/addmeal">
            <AddMeal />
          </Route>
          <Route exact path="/run/:id">
            <Run />
          </Route>
          <Route exact path="/auth">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Auth loginCB={setLoggedIn} uidCB={setUID} />
            )}
          </Route>
          <Route exact path="/history">
            <History />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        <HistoryBtn />
        <Navbar />
      </div>
    </Router>
  );
}

export default App;