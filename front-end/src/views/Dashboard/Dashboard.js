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
import AccessTime from "@material-ui/icons/AccessTime";
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
import { position } from "stylis";


const useStyles = makeStyles(styles);

  export default function Dashboard() {
  //devices from redux Store
  const devices= useSelector(state=>state.devices.items)
  const currentpositions = useSelector(state=>state.positions.items)
  const classes = useStyles();
  const [selectionModel,setSelectionModel]=useState([])
  const [open,setOpen]=useState()
  const [startreplay,setStartReplay]=useState(false)
  const [mode,setmode]=useState("")
  const [opendate,setOpendate]=useState(false)
  const [replayRow,setreplayRow]=useState("") 
  const [lastpos,setlastpos]=useState()
  const [openassociate,setopenAssociate]=useState(false)
  const myRef = useRef()
  const [opengroupDial,setopengroupDial]=useState(false)
  const [snackinfo,setsnackinfo]=useState({open:false})
  

  //CRUD table devices
  const columns = [
    { field: "id", headerName: "ID", width: 90, headerAlign:"left",align: "left",hide:true },
    {
      field: "pos",
      headerName: "",
      headerAlign:"center",
      align:'center',
      width:20,
      sortable:false,
      disableColumnMenu:true,
      renderCell:(e)=>{return(<IconButton onClick={()=>{showpos(e)}}>< MyLocationIcon style={{fill:"#1C6DD0"}} /> </IconButton>)}
    },
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
      headerName: "Organization",
      headerAlign:"center",
      align: "left",
      type: "number",
      width: 10,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Connecté",
      headerAlign:"center",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 30,
      
    },
    {
      field: "shared",
      headerName: "Client owner",
      headerAlign:"center",
      sortable: false,
      width: 120,
    },
    /* {
      field: "share",
      headerName: "",
      width: 20,
      align:'center',
      sortable:false,
      disableColumnMenu:true,
      renderCell:(e)=>{return( <><Tooltip title="Associate"><IconButton onClick={()=>{openAssociate()}}> <PersonAddAltIcon /></IconButton></Tooltip></> )}
    }, */
    {
      field: "Replay",
      headerName: "",
      align:'center',
      width:20,
      sortable:false,
      disableColumnMenu:true,
      renderCell:(e)=>{return(<><Tooltip title="Replay"><IconButton onClick={()=>replayRows(e)}>< ReplayIcon  style={{fill:'#1597E5'}} /> </IconButton></Tooltip></>)}
    },
    {
      field: "Edit",
      headerName: "",
      width: 20,
      align:'center',
      sortable:false,
      disableColumnMenu:true,
      renderCell:(e)=>{return(<><Tooltip title="Edit"><IconButton onClick={()=>editRows(e)}>< ModeEditOutlinedIcon /> </IconButton></Tooltip></>)}
    },
    {
      field: "remove",
      headerName: "",
      width: 20,
      align:'center',
      sortable:false,
      disableColumnMenu:true,
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
 }
 const openAssociate=()=>{
   
   setopenAssociate(true)
 }


const [Rows,setRows]=useState({})

useEffect(()=>{

   setRows(devices)

},[devices])


//Replay function
const [marks, setMarks]=useState([])
const replaypositions=async(deviceId,from,to)=>{
  try{
  const res=await fetch('http://localhost:5000/api/positions/replay?deviceId='+deviceId+'&from='+from+'&to='+to)
  if(res.ok){
    const {positions} =await res.json()
    //format array of positions for the map replay path 
    var markss=[]
    if(position.length>0)
    {
    const pos=positions.map(p=>markss.push([p.lat,p.lon]))
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
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}  >
          <div ref={myRef} >
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Map",
                tabIcon: BugReport,
                tabContent: (
                  <Maps markers={lastpos} startAnimation={startreplay} routes={marks} />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
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
                <div style={{height:600,backgroundColor:"#FFF"}}>
                <DataGrid
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
      <Fab style={{ marginLeft:-20,marginTop:-100}}  onClick={()=>{setmode("create");setSendRow({});setOpen(true)} } color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      <div style={{display:"none"}}>
      <EditCreateItem mode={mode}  source={"devices"} open={open} setOpen={setOpen} row={sendRow}  /> 
     </div>
     <Associate open={openassociate} setopen={setopenAssociate} ids={selectionModel} />
     <AddDeviceToGroup open={opengroupDial} setOpen={setopengroupDial} row={selectionModel} />
     <Snack opensnack={snackinfo.open} setopensnack={setsnackinfo} severity={snackinfo.severity} message={snackinfo.message} />
     {DateTimeReplay(replayRow)}
    </div>
  );
}
