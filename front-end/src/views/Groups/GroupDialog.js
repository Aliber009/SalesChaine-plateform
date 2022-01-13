import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { useState,useEffect } from 'react';
import config from 'config';
import { useDispatch, useSelector } from 'react-redux';
import { groupsActions,  } from 'store';




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

const EditCreateGroup=({open,setOpen,mode,row})=> {
  const classes=useStyles()
  const dispatch=useDispatch()

  //state of added Item
   const [item,setItem]=useState({})
   useEffect(() => {
    setItem(row)
  }, [row])
 
 

  const apiUrl=process.env.REACT_APP_SERVER_URL+'/'
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  //Creating and Editing items from Server
   const deleteCreate=async()=>{

         var query={} 
      
         if (mode=="create")
         {
           query={name:item.name}

         }
         else if(mode=="delete")
         {
           query={id:row.id}
         }
      
      
       const response=await fetch(apiUrl+"groups/"+mode,{
         method:'POST',
         headers:{
          'Content-Type': 'application/json',
          'authorization':localStorage.getItem('token')
          },
         body:JSON.stringify(query)
        
       })
       if(response.ok){
         const res=await response.json()
         const newQuery={...query,id:res.groupeId,Devices:[]}
         if(mode=="create"){dispatch(groupsActions.AddOrUpdateOne(newQuery))}
         else{dispatch(groupsActions.deleteOne(query))}
       }
   }

   // state of edited Item
   const [editItem,setEditItem]=useState(row)

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
            <h4 className={classes.cardTitleWhite}>{mode + " Groups"}</h4>
              </CardHeader>
            </Card>
        <DialogContent>
        <GridContainer>
                {mode=="create" && (<>
                <GridItem xs={12} >
                  <CustomInput
                    labelText="Group Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,name:e.target.value})}}
                      
                  />
                </GridItem>
                </>)}
              </GridContainer>
              
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{ deleteCreate();handleClose()}} autoFocus>
            {mode=="delete"?"Confirm delete":"Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditCreateGroup