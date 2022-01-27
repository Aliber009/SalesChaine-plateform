import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import ClearIcon from '@mui/icons-material/Clear';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
//import TableList from "../TableList/TableList";
import { DataGrid, GridToolbar,GridToolbarContainer, } from "@mui/x-data-grid";
import { CardContent } from '@mui/material';
import Maps from "views/Maps/Maps";
import { useState , useEffect} from "react";
import {  website, server } from "variables/general.js";
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { Typography } from "@material-ui/core";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Button, IconButton } from "@material-ui/core";
import ReplayIcon from '@mui/icons-material/Replay';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useSelector,useDispatch } from "react-redux";
import EditCreateItem from "../Dialog/CreateAndEditItems";
//DATE Time Picker
import { RangePicker} from 'react-minimal-datetime-range';
import 'react-minimal-datetime-range/lib/react-minimal-datetime-range.min.css';
import { Dialog, DialogContent } from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { useRef } from "react";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Tooltip } from "@mui/material";
import Associate from "./Associate";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddDeviceToGroup from "./addToGroup"
import Snack from "views/Dialog/FeedSnack";
import CircleIcon from '@mui/icons-material/Circle';
import PieChart from "views/Charts/piechart";
import TypeChart from "views/Charts/typeChart";


const useStyles = makeStyles(styles);

  export default function Dashboard() {
  //devices from redux Store
  const devices= useSelector(state=>state.devices.items)
  const currentpositions = useSelector(state=>state.positions.items)
  const dataParents=useSelector(state=>state.associations.parents)
  const dataChildren=useSelector(state=>state.associations.children)
  const classes = useStyles();
  const [selectionModel,setSelectionModel]=useState([])
  const [open,setOpen]=useState()
  const [startreplay,setStartReplay]=useState(false)
  const [mode,setmode]=useState("")
  const [opendate,setOpendate]=useState(false)
  const [replayRow,setreplayRow]=useState("") 
  const [lastpos,setlastpos]=useState()
  const [openassociate,setopenAssociate] = useState(false)
  const myRef = useRef()
  const [opengroupDial,setopengroupDial]=useState(false)
  const [snackinfo,setsnackinfo]=useState({open:false})
  const [actualuserRole,setactualUserRole]=useState("")

  //GET USER PERMISSIONS
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'))
    setactualUserRole(user.role)
 },[])
 
  //CRUD table devices
  const columns = [
    { flex: 1 ,field: "id", headerName: "ID", width: 90, headerAlign:"left",align: "left",hide:true },
    {
      field: "pos",
      headerName: "",
      headerAlign:"center",
      align:'center',
      minWidth:10,
      sortable:false,
      disableColumnMenu:true,
      flex: 1 ,
      renderCell:(e)=>{return(<IconButton onClick={()=>{showpos(e)}}>< MyLocationIcon style={{fill:"#1C6DD0"}} /> </IconButton>)}
    },
    {
      field: "name",
      headerName: "Device Name",
      headerAlign:"center",
      align:'center',
      minWidth: 90,
      flex: 1 ,
      editable: true,
    },
    {
      field: "imei",
      headerName: "Imei",
      headerAlign:"center",
      align:'center',
      minWidth: 110,
      flex: 1 ,
      editable: true,
    },
    {
      field: "organization",
      headerName: "Organization",
      headerAlign:"center",
      align:'center',
      align: "left",
      type: "number",
      minWidth: 90,
      flex: 1 ,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Connecté",
      headerAlign:"center",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 100,
      flex: 1 ,
      renderCell:(e)=>{return(<><Tooltip title={"connection"}><Button size="small" startIcon={<CircleIcon  style={{fill:checkStatus(e.row.id)[1]}} />}> {checkStatus(e.row.id)[0]} </Button></Tooltip></>)}
      
    },
    {
      field: "shared",
      headerName: "Client owner",
      headerAlign:"center",
      align:'center',
      sortable: false,
      minWidth: 130,
      flex: 1 ,
    },
    {
      field: "Replay",
      headerName: "",
      align:'center',
      minWidth:10,
      sortable:false,
      disableColumnMenu:true,
      flex: 1 ,
      renderCell:(e)=>{return(<><Tooltip title="Replay"><IconButton onClick={()=>replayRows(e)}>< ReplayIcon  style={{fill:'#1597E5'}} /> </IconButton></Tooltip></>)}
    },
    {
      field: "Edit",
      headerName: "",
      minWidth: 10,
      align:'center',
      sortable:false,
      disableColumnMenu:true,
      flex: 1 ,
      renderCell:(e)=>{return(<><Tooltip title="Edit"><IconButton onClick={()=>editRows(e)}>< ModeEditOutlinedIcon /> </IconButton></Tooltip></>)}
    },
    {
      field: "remove",
      headerName: "",
      minWidth: 10,
      align:'center',
      sortable:false,
      disableColumnMenu:true,
      flex: 1 ,
      renderCell:(e)=>{  return(<><Tooltip title="Remove"><IconButton onClick={()=>removeRows(e)}>< ClearIcon  style={{fill:'red'}} /></IconButton></Tooltip></>)}
    },
  ];
  const [sendRow,setSendRow]=useState({})
  const removeRows=(e)=>{
    setSendRow(e.row)
    setmode("delete")
    setOpen(true);
  }
  const editRows=(e)=>{
    setSendRow(e.row)
    setmode("edit")
    setOpen(true);
   
 }
 const replayRows=(e)=>{
  setreplayRow(e.row.id)
  setOpendate(true);
 }
 const showpos=(e)=>{
   setlastpos(e.row.id.toString())
   myRef.current.scrollIntoView({ behavior: 'smooth',  block: 'center' , inline: "start"})
   setTimeout(()=>{setlastpos(null)},1000)
   
  }
 const openAssociate=()=>{
   setopenAssociate(true)
 }
 //check global status and individual status for devices
const [online,setonline]=useState(0)
const checkStatus=(id)=>{
  var status=["Offline","#9D9D9D"]
  if(currentpositions[id]){
    const dt = new Date(currentpositions[id].time);
    const nw = new Date()
    var diffMs = nw-dt
    const days = parseInt((diffMs ) / (1000 * 60 * 60 * 24));
    if(Math.abs(days)>0){return status}
    else { 
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); 
      if(diffMins<10){
      status = ["Online","#06FF00"]
     }
    }
    
  }
  return status
}

const [Rows,setRows]=useState({})
useEffect(()=>{
   const user=JSON.parse(localStorage.getItem('user'))
   setactualUserRole(user.role)
   setRows(devices)

},[devices])

//find nulber of device Associations
const findnumberOfdevices=(data)=>{
 var x=0;
 for(var i=0;i<data.length;i++){
   x+=data[i].Devices.length
 }
 return x
}

//Replay function
const [marks, setMarks]=useState([])
const replaypositions=async(deviceId,from,to)=>{
  try{
  const res=await fetch(process.env.REACT_APP_SOCKET_URL+'/socket/positions/replay?deviceId='+deviceId+'&from='+from+'&to='+to)
  if(res.ok){
    const {positions} = await res.json()
    //format array of positions for the map replay path 
    var markss=[]
    if(positions.length>0)
    {
    const pos=positions.map(p=>markss.push([parseFloat(p.lat),parseFloat(p.lon)]))
    setMarks(markss)
    setStartReplay(true)
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    else{
      setsnackinfo({open:true,severity:"info",message:"No positions were found during selected period"})
    } 
  }
  else{setsnackinfo({open:true,severity:"error",message:"Error occuried"})}
  }
  catch{
    setsnackinfo({open:true,severity:"warning",message:"Localisation server not running"})
  }
}
 //custom toolbar 
 function CustomToolbar() {
  return (
    <div style={{display:"inline-flex"}}>
      <GridToolbar />
      <Button  style={{color:"#1976d2", marginTop:3 }} startIcon={<AddCircleOutlineIcon />} 
        onClick={()=>{
        if(selectionModel.length==0){
          setsnackinfo({open:true,severity:"warning",message:"Please select devices before grouping"})
        }
        else{
        setopengroupDial(true)}
      }} size="small">Add to group</Button>
      <Button  style={{color:"#1976d2", marginTop:3 }} startIcon={<PersonAddAltIcon />} 
        onClick={()=>{
        if(selectionModel.length==0){
          setsnackinfo({open:true,severity:"warning",message:"Please select devices before associating"})
        }
        else{
        setopenAssociate(true)}
      }} size="small">Associate to Account</Button>
    </div>
  );
}



const DateTimeReplay=(deviceId) => {

  
  return (
    <Dialog
    open={opendate}
    onClose={()=>{setOpendate(false)}}
    aria-labelledby="Range picker"
    aria-describedby="Rg" 
  > 
  <RangePicker
  locale="en-us" // default is en-us
  show={false} // default is false
  disabled={false} // default is false
  allowPageClickToClose={false} // default is true
  onConfirm={res => {

    var rs=res.map(date=>new Date(date).toISOString());
    replaypositions(deviceId,rs[0],rs[1])
    setOpendate(false)
  
  }}
  onClear={() => console.log('onClear')}
  style={{ width: 520, height: 405, }}
  placeholder={['Start Time', 'End Time']}
  showOnlyTime={false} // default is false, only select time
  />
    </Dialog>
  );
}
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,fullName:"Connecté",lat:32.249921938982624,lon:-7.968 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 ,fullName:"Connecté",lat:31.249921938982624,lon:-7.92},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,fullName:"Connecté",lat:33.249921938982624,lon:-7.368 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 ,fullName:"Connecté",lat:34.249921938982624,lon:-7.965},
    
  ];
  
  


  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={4}>
          <Card >
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Number of devices</p>
              <h3 className={classes.cardTitle}>
                {devices.length || "0"} <Typography style={{display:"inline-block" ,color:"#2C272E"}} className={classes.cardTitle} >Device</Typography>
              </h3>
              </CardHeader>
            <CardHeader color="info" style={{marginTop:20}}>
              <div style={{minHeight:150,paddingTop:13 }}>
              <PieChart total={devices.length} /> 
              </div>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  devices are added by unique serial
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <DevicesOtherIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Device associations</p>
              <Typography  className={classes.cardTitle} variant="body1" style={{display:"inline-block" ,color:"#2C272E"}} >Associates: {findnumberOfdevices(dataParents) || '0'} </Typography >
              <Typography className={classes.cardTitle} variant="body1"style={{color:"#2C272E"}} >Associated: {findnumberOfdevices(dataChildren)  || '0'} </Typography >
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Shared devices
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Account associations</p>
              <Typography className={classes.cardTitle} variant="body1" style={{display:"inline-block" ,color:"#2C272E"}} >Associates: {dataParents.length || '0'} </Typography >
              <Typography className={classes.cardTitle} variant="body1"style={{color:"#2C272E"}} >Associated: {dataChildren.length || '0'} </Typography >
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Shared accounts
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4} >
          <Card chart  >
            <CardHeader style={{marginBottom:-40}} >
              <TypeChart />
            </CardHeader>
            <CardBody>
              <p className={classes.cardCategory}>Device Types</p>
            </CardBody>
            
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}  >
          <div ref={myRef} >
          <CustomTabs
            title="Maps:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Main Map",
                tabIcon: MapOutlinedIcon,
                tabContent: (
                  <Maps markers={lastpos} startAnimation={startreplay} routes={marks} />
                ),
              },
              {
                tabName: "Additional Map",
                tabIcon: Code,
                tabContent: (
                  <div>Here will be additional Maps according to any new specification</div>
                ),
              },
              {
                tabName: "Additional Map 2",
                tabIcon: Cloud,
                tabContent: (
                  <div>Here will be additional Maps according to any new specification</div>
                ),
              },
            ]}
          />
          </div>
        </GridItem>
        
        <GridItem xs={12} >
        <Card style={{outerHeight:"auto"}}>
            <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Device List</h4>
              <p className={classes.cardCategoryWhite}>
               Global list of Nextronic devices
              </p>
              </CardHeader>
              <CardContent>
                <div style={{height:600, width:'100%',backgroundColor:"#FFF"}}>
                <DataGrid
            style={{width:'100%'}}    
            components={{
            Toolbar: CustomToolbar}}
            rows={Rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            disableSelectionOnClick
            checkboxSelection
             /> 
                </div>
               
            </CardContent>
              </Card>
        </GridItem>
      </GridContainer>
      {actualuserRole!="USER" &&
      <>
      <Fab style={{ marginLeft:-20,marginTop:-100}}  onClick={()=>{setmode("create");setSendRow({});setOpen(true)} } color="primary" aria-label="add">
        <AddIcon />
      </Fab>
     <EditCreateItem mode={mode}  source={"devices"} open={open} setOpen={setOpen} row={sendRow}  /> 
     <Associate open={openassociate} setopen={setopenAssociate} ids={selectionModel} />
     </>
     }
     <AddDeviceToGroup open={opengroupDial} setOpen={setopengroupDial} row={selectionModel} />
     <Snack opensnack={snackinfo.open} setopensnack={setsnackinfo} severity={snackinfo.severity} message={snackinfo.message} />
     {DateTimeReplay(replayRow)}
    </div>
  );
}
