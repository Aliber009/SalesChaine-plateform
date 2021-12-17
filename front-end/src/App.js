import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Auth from "layouts/Auth";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import Logout from "views/Pages/Logout";
import CachingController from "./CachController"
import { useSelector } from "react-redux";

export default function App(){
    const initialized = useSelector(state => state.session.success );
    console.log("sessions :",initialized)

return(    
<>
<CachingController />
<BrowserRouter>
 
  <Switch>
    <Route  path="/auth" component={Auth} />
  </Switch>
  
    {initialized && (
    <Switch>
    <Route  path="/admin" component={Admin} />
    <Route exact path="/rtl" component={RTL} />
    </Switch>
    )}
    
</BrowserRouter>
</>
)
}