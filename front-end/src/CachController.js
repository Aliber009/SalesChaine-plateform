import React from "react"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { sessionActions,usersActions,organizationsActions,devicesActions } from "store"
import { connect } from "react-redux"
import config from "./config";


const CachingController = () => {
const backUrl=config.WS_BASE_URL
const dispatch=useDispatch();


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
            console.log("cach",session)
            dispatch(sessionActions.updateSession(session.success))
        }

    },[])
 // Get all users
    useEffect(async () => {
          const response = await fetch(backUrl+'users/all',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('token')
                     },     
        });
          if (response.ok) {
            const users=await response.json()
            dispatch(usersActions.update(users.users));
          }
      }, []);
  // Get all devices
  useEffect(async () => {
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
}, []);
 // get all organizations
 useEffect(async () => {
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
}, []);


    return null
}
export default connect()(CachingController);