import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import Instruct from "views/Instruct";

ReactDOM.render(
  <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Instruct} />
        <Redirect from="*" to="/" />
      </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
