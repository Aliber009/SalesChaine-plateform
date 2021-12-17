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
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { devicesActions, usersActions, organizationsActions  } from 'store';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



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

const EditCreateItem=({open,setOpen,mode,source,row})=> {
  const classes=useStyles()
  const dispatch=useDispatch()

  //state of added Item
   const [item,setItem]=useState({})
   useEffect(() => {
    setItem(row)
  }, [row])
 // get organizations 
  const orgs=useSelector(state=>state.organizations.items)
  const[orgsArray,setorgsArray]=useState([])
  useEffect(() => {
    const list=orgs.map(o=>{ return {"label":o.lastName,"id":o.id}})
    setorgsArray(list)
  }, [orgs])
  
 //find orgLabel
 const findorgLabel=(id)=>{
    for(var i=0;i<orgsArray.length;i++)
    {
      if(id==orgsArray[i].id)
      {
        return orgsArray[i].label
      }
    }
    return ""
 }
  
  const apiUrl=config.WS_BASE_URL
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  //Creating and Editing items from Server
   const EditCreate=async()=>{

       var query={} 
       if(source=="organizations"){
         if(mode=="edit")
         {
            query={organizationId:row.id,name:item.name,description:item.description}
         }
         else if (mode=="create")
         {
           query={name:item.name,description:item.description}
         }
         else if(mode=="delete")
         {
           query={organizationId:row.id}
         }
       }
       if(source=="devices"){
        if(mode=="edit")
        {
           query={deviceId:row.id,name:item.name,imei:item.imei,organization:item.organization}
        }
        else if (mode=="create")
        {
          query={name:item.name,imei:item.imei,organization:item.organization}
        }
        else if(mode=="delete")
        {
          query={deviceId:row.id}
        }
      }
      if(source=="users"){
        if(mode=="edit")
        {
           query={userID:row.id,name:item.name,email:item.email,role:item.role, company:item.company, company:item.company, accountConfirmation:item.accountConfirmation}
        }
        else if (mode=="create")
        {
          query={name:item.name,password:item.password, email:item.email,role:item.role, company:item.company, company:item.company, accountConfirmation:item.accountConfirmation}
        }
        else if(mode=="delete")
        {
          query={userID:row.id}
        }
      }
      
       const response=await fetch(apiUrl+source+"/"+mode,{
         method:'POST',
         headers:{
           "Content-Type":"Application/json",
           "authorization":localStorage.getItem('token')
          },
         body:JSON.stringify(query)
        
       })
       if(response.ok){
         const res=await response.json()
         if(source=="organizations")
         {
            const newQuery={...query,organizationId:res.organizationId}
            if(mode!="delete"){ dispatch(organizationsActions.AddOrUpdateOne(newQuery)) }
            else{ dispatch(organizationsActions.deleteOne(newQuery)) }
         }
         else if (source=="devices")
         {
          const newQuery={...query,deviceId:res.deviceId}
          if(mode!="delete"){dispatch(devicesActions.AddOrUpdateOne(newQuery))}
          else{dispatch(devicesActions.deleteOne(newQuery))}
         }
         else if (source=="users")
         {
          const newQuery={...query,userId:res.userID}
          if(mode!="delete"){dispatch(usersActions.AddOrUpdateOne(newQuery))}
          else{dispatch(usersActions.deleteOne(newQuery))}
         }
       }
   }

   // state of edited Item
   const [editItem,setEditItem]=useState(row)

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Device
      </Button>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          
          <Card style={{outerHeight:"auto" }}>
            <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>{mode +" "+ source}</h4>
              </CardHeader>
            </Card>
        <DialogContent>
        <GridContainer>
            {source=="devices" && mode=="edit" && (<>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Device Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,name:e.target.value})}}
                    value={item.name }   
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Imei"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,imei:e.target.value})}}
                    value={item.imei }  
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={orgsArray}
                sx={{ width: 300 }}
                renderInput={(params) => 
                <TextField 
                {...params} label="Client owner"  variant="standard"/>} 
                onChange={(e,val)=>{setItem({...item,organization:val.id})}}
                value={findorgLabel(item.organization)}  
                 />
                </GridItem>
                </>)}
                {source=="devices" && mode=="create" && (<>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Device Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,name:e.target.value})}}
                      
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Imei"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,imei:e.target.value})}}
                    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={orgsArray}
                sx={{ width: 300 }}
                renderInput={(params) => 
                <TextField 
                {...params} label="Client owner"  variant="standard"/>} 
                onChange={(e,val)=>{setItem({...item,organization:val.id})}}
                 
                 />
                </GridItem>
                </>)}
            {source=="users" && mode=="edit" && 
            (<>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,name:e.target.value})}}
                    value={item.name }      
                  />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Password"
                    id="pass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,password:e.target.value})}}
                    value={item.password }    
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Email"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }} 
                    onChange={(e)=>{setItem({...item,email:e.target.value})}}
                    value={item.email}      
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Company"
                    id="eclient"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,company:e.target.value})}}
                    value={item.company}      
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <Autocomplete
                style={{marginTop:27}}
                disablePortal
                id="combo-box-demo"
                options={[{id:1,label:"SYSADMIN"},{id:2,label:"OWNER"},{id:3,label:"ADMIN"},{id:4,label:"USER"}]}
                sx={{ width: 200 }}
                renderInput={(params) => 
                <TextField 
                {...params} label="Role"  variant="standard"/>} 
                onChange={e=>setItem({...item,role:e.target.value})}
                value={item.role}  
                 />
                </GridItem>
                <GridItem  style={{marginTop:38,marginLeft:7}}>
                  <FormControlLabel control={
                  <Checkbox style={{marginRight:10}} 
                   onChange={(e)=>{setItem({...item,accountConfirmation:e.target.checked})}}
                   checked={item.accountConfirmation} 
                  />
                  
                  } label="Account Comfirmed" labelPlacement="end"/>
                </GridItem>
                </>)}
                {source=="users" && mode=="create" && 
            (<>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,name:e.target.value})}}   
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                    labelText="Password"
                    id="pass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,password:e.target.value})}}
                  
                  />
                  </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Email"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,email:e.target.value})}}      
                  />
                </GridItem>
                
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Company"
                    id="eclient"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,company:e.target.value})}}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                <Autocomplete
                style={{marginTop:27}}
                disablePortal
                id="combo-box-demo"
                options={[{id:1,label:"SYSADMIN"},{id:2,label:"OWNER"},{id:3,label:"ADMIN"},{id:4,label:"USER"}]}
                sx={{ width: 200 }}
                renderInput={(params) => 
                <TextField 
                {...params} label="Role"  variant="standard"/>} 
                onChange={e=>setItem({...item,role:e.target.value})}
                  
                 />
                </GridItem>
                <GridItem  style={{marginTop:38,marginLeft:7}}>
                  <FormControlLabel control={
                  <Checkbox style={{marginRight:10}} 
                   onChange={(e)=>{setItem({...item,accountConfirmation:e.target.checked})}}
                  />
                  
                  } label="Account Comfirmed" labelPlacement="end"/>
                </GridItem>
                </>)}
                {source=="organizations" && mode=="edit" && (<>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,name:e.target.value})}}
                    value={item.name}   
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Description"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }} 
                    onChange={(e)=>{setItem({...item,description:e.target.value})}} 
                    value={item.description}   
                  />
                </GridItem>
                </>)}
                {source=="organizations" && mode=="create" && (<>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onChange={(e)=>{setItem({...item,name:e.target.value})}}
                     
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Description"
                    id="username"
                    formControlProps={{
                      fullWidth: true,
                    }} 
                    onChange={(e)=>{setItem({...item,description:e.target.value})}} 
                   
                  />
                </GridItem>
                </>)}
              </GridContainer>
              
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{ EditCreate();handleClose()}} autoFocus>
            {mode=="delete"?"Confirm delete":"Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditCreateItem