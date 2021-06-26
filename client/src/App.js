import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import NewRun from "./pages/NewRun";
import Run from "./pages/Run";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { apiRequest } from "./utils/API";
import { LOGIN } from "./utils/auth";

export const appMiddleware = () => next => action => {
  next(action);
  switch (action.type) {
    case LOGIN: {
      next(
        apiRequest({
          url: `${SERVER_URL}/login`,
          method: "POST",
          data: action.payload
        })
      );
      break;
    }
    default:
      break;
  }
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [uid, setUID] = useState(-1);

  console.log(loggedIn);
  console.log(uid);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/dashboard/:id">
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
        <Nav />
      </div>
    </Router>
  );
}

export default App;
