import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Fab } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@material-ui/core";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ClearIcon from '@mui/icons-material/Clear';

import { useSelector } from "react-redux";
import EditCreateItem from "views/Dialog/CreateAndEditItems";



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};


const useStyles = makeStyles(styles);

export default function UsersPage() {

  const users=useSelector(state=>state.users.items);
  
  const classes = useStyles();

   const [open,setOpen]=useState(false)
   const [mode,setmode]=useState("")
   const [actualuserRole,setactualUserRole]=useState("")

  //GET USER PERMISSIONS
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    setactualUserRole(user.role)
 },[])

  //CRUD table devices
  
  const columns = [
    { field: "id", headerName: "ID", width: 90, headerAlign:"left",align: "left",hide:true },
  {
    field: "name",
    headerName: "Username",
    headerAlign:"left",
    align: "left",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "email",
    width: 150,
    editable: true,
  },
  {
    field: "company",
    headerName: "Company memeber",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    
  },
  {
    field: "accountConfirmation",
    headerName: "Account Comfirmed",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
    {
      field: "Edit",
      headerName: "",
      width: 20,
      align:'center',
      sortable:false,
      disableColumnMenu:true,
      renderCell:(e)=>{return(<IconButton onClick={()=>editRows(e)}>< ModeEditOutlinedIcon /> </IconButton>)}
    },
    {
      field: "remove",
      headerName: "",
      width: 20,
      align:'center',
      sortable:false,
      disableColumnMenu:true,
      renderCell:(e)=>{  return(<IconButton onClick={()=>removeRows(e)}>< ClearIcon  style={{fill:'red'}} /></IconButton>)}
      
    },
  ];
  const [sendRow,setSendRow]=useState({})

  const removeRows=(e)=>{
    setSendRow(e.row)
    setmode("delete")
    setOpen(true)
  }
  const editRows=(e)=>{
    setSendRow(e.row)
    setmode("edit")
    setOpen(true);
   
 }
 const createRows=()=>{
  setmode("create")
  setOpen(true);
  
}
  
const [rows,setRows]=useState([])
//Rows to send for edit 
 useEffect(() => {

  setRows(users)
  
  return null
}, [users]) 
  

  return (
      <>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card >
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>List of Users</h4>
            <p className={classes.cardCategoryWhite}>
              Here is the global list of all the plateform users
            </p>
          </CardHeader>
          <CardBody style={{height:800}}>
            
              
          <DataGrid
           components={{
            Toolbar: GridToolbar}}
            rows={users}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection 
            disableSelectionOnClick
       
            />
          </CardBody>
        </Card>
      </GridItem>
     
    </GridContainer>
    {actualuserRole!="USER" && 
    <> 
     <Fab style={{ marginLeft:-20,marginTop:-100}} onClick={()=>{setSendRow({});createRows()}}  color="primary" aria-label="add">
     <AddIcon />
     </Fab>
    <EditCreateItem mode={mode}  source={"users"} open={open} setOpen={setOpen} row={sendRow} />
    </> 
    }
   </>
  );
}
