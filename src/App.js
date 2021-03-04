import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import CaseList from "./Case/CaseList";
import Case from "./Case/Case";

const App = () => {
  let userid = "S58936";
  sessionStorage.setItem("loggeduser", userid);
  // sessionStorage.setItem("filterby", userid);
  return (
    <div className="container-fluid m-3">
      <BrowserRouter>
        <div className="container-fluid">
          <div>
            <Link to="/" type="button" className="btn btn-block btn-info">
              Home
            </Link>
            <hr></hr>
          </div>
          <Switch>
            <Route component={CaseList} path="/" exact={true} />
            <Route component={Case} path="/case" exact={true} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
