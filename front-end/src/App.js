import React,{ useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Auth from "layouts/Auth";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import CachingController from "./CachController"
import { useSelector } from "react-redux";
import SocketController from "SocketController";


export default  function App(){
  //const [logged,setlogged]=useState()
  const [kickout, setkickout] = useState(false)
    const logged =  useSelector(state => state.session.success );

    //kickout if not logged
    
     useEffect(()=>{
      if(logged==false){
       setTimeout(function() {
         setkickout(true)
       }, 1000);
      }
    },[logged])
   
  
    console.log("sessions :",logged)
   

return(    
<>
<SocketController />
<CachingController />
<BrowserRouter>
 
  <Switch>
    <Route  path="/auth" component={Auth} />
  </Switch>
  
    {logged && (
    <Switch>
    <Route  path="/admin" component={Admin} />
    <Route exact path="/rtl" component={RTL} />
    </Switch>
    )}
    {kickout &&
    (
      <Switch>
        <Redirect from="/" to="/auth" />
     </Switch>
     )
    }
    
    
    
</BrowserRouter>
</>
)
}