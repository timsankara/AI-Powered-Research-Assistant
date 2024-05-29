import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import Instruct from "views/Instruct";

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-9vf9fcx1.eu.auth0.com"
      clientId="ZQCo3pWP6NrreDXUBCbbsJagVuCwWRbG"
      redirectUri={window.location.origin}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      <Switch>
        <Route path="/" exact component={Instruct} />
        <Redirect from="*" to="/" />
      </Switch>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
