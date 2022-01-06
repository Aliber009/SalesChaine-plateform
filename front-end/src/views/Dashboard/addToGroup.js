import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { useState,useEffect } from 'react';
import config from 'config';
import { useDispatch, useSelector } from 'react-redux';
import { groupsActions,  } from 'store';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import Snack from 'views/Dialog/FeedSnack';




const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
    },
  };
  const useStyles = makeStyles(styles);

const AddDeviceToGroup=({open,setOpen,mode,row})=> {
  const classes=useStyles()
  const dispatch=useDispatch()
  const [groups,setgroups]=useState([])
  const [snackinfo,setsnackinfo]=useState({open:false})
  const apiUrl=config.WS_BASE_URL

  //state of added Item
  useEffect(async ()=>{
      const res=await fetch('http://localhost:5100/api/groups/allgroups',{
        method:'GET',
        headers:{
          "Content-Type":"Application/json",
          'authorization':localStorage.getItem('token')
         }})
      if(res.ok){ 
          const {groups}=await res.json()

          setgroups(()=>{var list=[];groups.map(i=>list.push({id:i.id,label:i.name})); return list } )
        }
      else{console.log(error)}

  },[])
   const [item,setItem]=useState({})
   useEffect(() => {
    setItem(row)
  }, [row])
 
 

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  //Creating and Editing items from Server
   const addtoGroup=async()=>{

       const query={groupeId:item.groupId,deviceIds:row};
       const response=await fetch(apiUrl+"groups/adddevices",{
         method:'POST',
         headers:{
           "Content-Type":"Application/json",
           
          },
         body:JSON.stringify(query)
        
       })
       if(response.ok){
         const {success,groupeDevice} = await response.json() 
         if(success==true){
         setsnackinfo({open:true,severity:"success",message:"Devices added to groupe"})
         dispatch(groupsActions.update(groupeDevice))
         }
         else{
          setsnackinfo({open:true,severity:"error",message:"Error occuried"})
         }
       }
     }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          
          <Card style={{outerHeight:"auto" }}>
            <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>Add Selected Devices to Group</h4>
              </CardHeader>
            </Card>
            <DialogContent >
                <Autocomplete
                style={{height:100}}
                disableClearable
                disablePortal
                id="combo-box-demo"
                options={groups}
                renderInput={(params) => 
                <TextField 
                {...params} label="Choose Group"  variant="standard"/>}
                onChange={(e,val)=>{setItem({groupId:val.id})}}
                 />    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{  addtoGroup();handleClose()}} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snack opensnack={snackinfo.open} setopensnack={setsnackinfo} severity={snackinfo.severity} message={snackinfo.message} />
    </div>
  );
}
export default AddDeviceToGroup