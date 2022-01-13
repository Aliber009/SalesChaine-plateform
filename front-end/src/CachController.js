import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { sessionActions,usersActions,organizationsActions,devicesActions, groupsActions } from "store"
import { connect } from "react-redux"
import config from "./config";
import { associationsActions } from "store"


const CachingController = () => {
const backUrl=process.env.REACT_APP_SERVER_URL+'/'
const dispatch=useDispatch();
const logged = useSelector(state => state.session.success );
const Role = useSelector(state => state.session.userRole );

  //GET USER PERMISSIONS
   useEffect(  ()=>{
    const user=JSON.parse(localStorage.getItem('user')) || {}
    dispatch(sessionActions.updateUserRole(user.role))
  },[Role]) 


// check auth
    useEffect(async () => {
      try{
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
      }
      catch{
        return null
      }
    },[])
 // Get all users
    useEffect(async () => {
     if( logged && Role == "ADMIN" ){
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
     }
      }, [logged,Role]);
  // Get all devices
  useEffect(async () => {
    if(logged ){
    const response = await fetch(backUrl+'devices/all',{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'authorization':localStorage.getItem('token')
               },
      //body:JSON.stringify({userId:JSON.parse(localStorage.getItem('user')).id})              
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
        'authorization':localStorage.getItem('token')
             },     
});
  if (response.ok) {
    const organizations=await response.json()
    dispatch(organizationsActions.update(organizations.organizations));
  }
  }
}, [logged]);
//get all groups 
useEffect(async () => {
  if(logged){
  const response = await fetch(backUrl+'groups/all',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'authorization':localStorage.getItem('token')
             },     
});
  if (response.ok) {
    const groups=await response.json()
    dispatch(groupsActions.update(groups.groups));
  }
  }
}, [logged]);

//get all associations
useEffect(async () => {
  if(logged){
  const response = await fetch(backUrl+'users/findassociations',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'authorization':localStorage.getItem('token')
             },
       
});
  if (response.ok) {
    const {associationsParent,associationsChildren}=await response.json()
    dispatch(associationsActions.updateChildren(associationsChildren));
    dispatch(associationsActions.updateParents(associationsParent));
    dispatch(devicesActions.displayShared(associationsParent));
  }
}
}, [logged]);


    return null
}
export default connect()(CachingController);