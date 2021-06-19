import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import NewRun from "./pages/NewRun";
import Run from "./pages/Run";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
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
            <Login />
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
