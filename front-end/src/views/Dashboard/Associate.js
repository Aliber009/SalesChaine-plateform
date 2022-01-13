import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { associate } from 'network/ApiAxios';
import Snack from 'views/Dialog/FeedSnack';
import { associationsActions } from 'store';
import { useDispatch } from 'react-redux';

export default function Associate({open,setopen,ids}) {
  const dispatch=useDispatch() 
  const [data, setData] = useState({});
  const [validmail,setvalidmail]=useState(true);
  const [snackinfo,setsnackinfo]=useState({open:false})
 
  const ValidateEmail=(email)=>
  { 
    /* const currentmail=localStorage.getItem("user");
   const mail = JSON.parse(currentmail).email
   if(email==mail){return false}   */
   const re=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
  }
  const updateAssociation = async ()=>{
    const response = await fetch(process.env.REACT_APP_SERVER_URL+'/users/findassociations',{
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
    }
  }

  const handleClickOpen = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
    setvalidmail(true)
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Associate Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
             Please enter your associate email address here. We
             will send them notification to join .
          </DialogContentText>
          <TextField
            error ={ !validmail }
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            helperText={!validmail?"Invalid email":""}
            onChange={e=>setData({email:e.target.value,deviceId:ids})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={async ()=>{ 
            if(ValidateEmail(data.email)){
              const res = await associate(data.email,data.deviceId);
            
              if(res.statusText=="OK"){
              const respo = await res.data;
              updateAssociation();
              setsnackinfo({open:true,severity:"success",message:respo.msg})
              }
              else{
                setsnackinfo({open:true,severity:"warning",message:"Error occuried"})
              }
              handleClose();

              }
              else{
                setvalidmail(false)
              }}}>Send</Button>
        </DialogActions>
      </Dialog>

      <Snack opensnack={snackinfo.open} setopensnack={setsnackinfo} severity={snackinfo.severity} message={snackinfo.message} />

    </div>
  );
}
