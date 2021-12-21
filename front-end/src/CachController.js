import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { sessionActions,usersActions,organizationsActions,devicesActions } from "store"
import { connect } from "react-redux"
import config from "./config";


const CachingController = () => {
const backUrl=config.WS_BASE_URL
const dispatch=useDispatch();
const initialized = useSelector(state => state.session.success );
const [logged,setlogged]=useState(false)
useEffect(()=>{
  setlogged(initialized)
},[initialized])


// check auth
    useEffect(async () => {
        const response = await fetch(backUrl+'users/checkSession',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('token')
                     },     
        });
        if(response.ok){
            const session=await response.json()
            dispatch(sessionActions.updateSession(session.success))
           
        }

    },[])
 // Get all users
    useEffect(async () => {
     if(logged){
          const response = await fetch(backUrl+'users/all',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
                     },     
        });
          if (response.ok) {
            const users=await response.json()
            dispatch(usersActions.update(users.users));
          }
     }
      }, [logged]);
  // Get all devices
  useEffect(async () => {
    if(logged){
    const response = await fetch(backUrl+'devices/all',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
               },     
  });
    if (response.ok) {
      const devices=await response.json()
      dispatch(devicesActions.update(devices.devices));
       }
    }
}, [logged]);
 // get all organizations
 useEffect(async () => {
  if(logged){
  const response = await fetch(backUrl+'organizations/all',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
             },     
});
  if (response.ok) {
    const organizations=await response.json()
    dispatch(organizationsActions.update(organizations.organizations));
  }
  }
}, [logged]);


    return null
}
export default connect()(CachingController);