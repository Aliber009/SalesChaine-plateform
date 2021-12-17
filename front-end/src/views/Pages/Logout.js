import React from "react";
import { logout } from "network/ApiAxios";
import Login from "./Login";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";



export default async function Logout(props){ 
   
    
    const token = localStorage.getItem(token)
    const logoutdata = await logout(token)
    const {data} = logoutdata 
    console.log("data: ",data)
    if(data.success){
        console.log('nice')
        }
    else{
        console.log("err")
    }
 
 
}
