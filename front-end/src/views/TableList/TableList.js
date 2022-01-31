import React,{ useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import EditCreateItem from "views/Dialog/CreateAndEditItems";
import { IconButton } from "@material-ui/core";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ClearIcon from '@mui/icons-material/Clear';

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

//columns and rows


const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,fullName:"Connecté" },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 ,fullName:"Connecté"},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,fullName:"Connecté" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,fullName:"Connecté"},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,fullName:"Connecté" },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 ,fullName:"Connecté"},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44,fullName:"Connecté" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 ,fullName:"Connecté"},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,fullName:"Connecté" },
];


const useStyles = makeStyles(styles);

export default  function TableList() {

   
  const organizations= useSelector(state=>state.organizations.items)

  const [open,setOpen]=useState(false)
  const [mode,setmode]=useState("")

  const columns = [
    { field: "id", headerName: "ID",  minWidth:10, headerAlign:"left",align: "left",hide:true,flex:1 },
    {
      field: "name",
      headerName: "Company Name",
      headerAlign:"left",
      align: "left",
      minWidth:100,
      editable: true,
      flex:1
    },
    {
      field: "description",
      headerName: "Type",
      minWidth:200,
      editable: true,
      flex:1

    },
    {
      field: "Edit",
      headerName: "",
      align:'center',
      sortable:false,
      disableColumnMenu:true,
      
      minWidth:10,
      flex:1,
      renderCell:(e)=>{return(<IconButton onClick={()=>editRows(e)}>< ModeEditOutlinedIcon /> </IconButton>)}
    },
    {
      field: "remove",
      headerName: "",
      align:'center',
      sortable:false,
      disableColumnMenu:true,
      minWidth:20,
      flex:1,
      renderCell:(e)=>{  return(<IconButton onClick={()=>removeRows(e)}>< ClearIcon  style={{fill:'red'}} /></IconButton>)}
      
    },
  ];
  const removeRows=(e)=>{
    setSendRow(e.row)
    setmode("delete")
    setOpen(true);
  }
  const editRows=(e)=>{
    //console.log(e.row)
    setSendRow(e.row)
    setmode("edit")
    setOpen(true);
   
 }

  const [rows,setRows]=useState([])
  //Rows to send for edit 
  const [sendRow,setSendRow]=useState({})
   useEffect(() => {

    setRows(organizations)
    
    return null
  }, [organizations]) 
  
  
  const classes = useStyles();
  return (
    <>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card >
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Companies List </h4>
            <p className={classes.cardCategoryWhite}>
              Here is the list of all teh subscribed companies 
            </p>
          </CardHeader>
          <CardBody style={{height:'800px'}}>
            
              
          <DataGrid
           components={{
            Toolbar: GridToolbar}}
            rows={rows}
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
    <Fab style={{ marginLeft:-20,marginTop:-100}} onClick={()=>{setmode("create");setSendRow({});setOpen(true)}}  color="primary" aria-label="add">
     <AddIcon />
   </Fab>
   <div style={{display:"none"}}>
    <EditCreateItem mode={mode}  source={"organizations"} open={open} setOpen={setOpen} row={sendRow} /> 
   </div>
    </>
  );
}
