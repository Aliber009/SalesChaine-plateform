import React,{ useState , useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Fab } from "@material-ui/core";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EditCreateGroup from "./GroupDialog";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Associate from "views/Dashboard/Associate";




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
const columns = [
  { field: "id", headerName: "ID", width: 90, headerAlign:"left",align: "left",hide:true },
  {
    field: "name",
    headerName: "Device Name",
    headerAlign:"center",
    align: "left",
    width: 200,
    editable: true,
  },
  {
    field: "imei",
    headerName: "Imei",
    headerAlign:"center",
    width: 100,
    editable: true,
  },
  {
    field: "organization",
    headerName: "Client Owner",
    headerAlign:"center",
    align: "left",
    type: "number",
    width: 120,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Connecté",
    headerAlign:"center",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 100,
    
  },
];
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,fullName:"Connecté" },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 ,fullName:"Connecté"},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,fullName:"Connecté" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,fullName:"Connecté"},

];


const useStyles = makeStyles(styles);

export default function TypographyPage() {
  const classes = useStyles();
  const [open, setOpen] = useState({});
  const [data,setData] = useState([]);
  const [mode,setmode]=useState("");
  const [row,setRow]=useState("");
  const [openDial, setOpenDial] = useState(false);
  const [openassociate,setopenAssociate]=useState(false)
  const [deviceIds,setdeviceIds]=useState()
  const role = useSelector(state => state.session.userRole)

  //open items separately with id 
  const handleClick = (id) => {
    setOpen({...open,  [id]:!open[id]});
  };
  const groups= useSelector(state => state.groups.items)
 
  useEffect(()=>{
    setData(groups)
  },[groups])

  const getDeviceIds=(devices)=>{
   const ids=devices.map(i=>i.id)
   return ids
  } 
  const formateDataToTables=(d)=>{
    
    if(d){
    return(
      d.map(gr=>
      (
       <>
        <ListItemButton onClick={()=>{handleClick(gr.id)}}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={gr.name} />
        
        { gr.Devices.length>0? open[gr.id] ? <ExpandLess /> : <ExpandMore />:null}
        {role=="ADMIN" && <>
        <Tooltip title="Associate">
        <IconButton style={{marginLeft:20}} onClick={()=>{setdeviceIds(getDeviceIds(gr.Devices));setopenAssociate(true)}}>
        <PersonAddAltIcon  style={{fill:"#1976d2"}}/>
        </IconButton>
        </Tooltip>
        <IconButton onClick={()=>{setmode('delete');setOpenDial(true); setRow(gr)}} style={{marginLeft:20}}>
        <ClearIcon style={{fill:"red"}}/>
        </IconButton>
        </>
         }
        </ListItemButton>
        {gr.Devices.length>0 && 
        <>
        <Collapse in={open[gr.id]} timeout="auto" unmountOnExit>
        <div style={{height:400}}>
        <DataGrid
          components={{
          Toolbar: GridToolbar}}
          rows={gr.Devices}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          />
          </div>
        </Collapse>
        </>
        }
        
        </>
       )
      )
    )
      }
      else{return null}
  }

  return (
    <>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card >
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Groups</h4>
            <p className={classes.cardCategoryWhite}>
              Here are the devices groups
            </p>
          </CardHeader>
          <CardBody style={{maxHeight: 800}}>  
          <List
         sx={{ width: '100%', bgcolor: 'background.paper' }}
         component="nav"
         aria-labelledby="nested-list-subheader"
         >
          {formateDataToTables(data)}
        </List>
        </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
       <Fab onClick={()=>{setmode("create");setOpenDial(true)}} style={{ marginLeft:-20,marginTop:-100}}   color="primary" aria-label="add">
       <AddIcon />
     </Fab>
     <EditCreateGroup mode={mode} open={openDial} setOpen={setOpenDial} row={row}/>
     <Associate open={openassociate} setopen={setopenAssociate} ids={deviceIds} />
     </>
  );
}
