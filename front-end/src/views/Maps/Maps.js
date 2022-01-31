import React,{ useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './map.css'
import SnakeAnim from './replayAnimation';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useSelector } from 'react-redux';
import { marker } from 'leaflet';
import PosMap from './CurrentPosition';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpeedIcon from '@mui/icons-material/Speed';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import RouteIcon from '@mui/icons-material/Route';
import CircleIcon from '@mui/icons-material/Circle';
import deviceIcon from 'assets/img/cpu3.png'
import Typography from '@mui/material/Typography';




const polyline = [
  [31.505, -7.09],
  [32.11, -8.1],
  [34.21, -7.2],
]

const limeOptions = { color: '#113CFC', stroke:true }
 


const Maps=({ markers , startAnimation, routes})=>{

  const position  = useSelector(state => state.positions.items)
  const [marks,setmarks]=useState([])
  
  //the marks should also send data about vehicules to show on popup

  useEffect(() => {
    var pos=[]
    Object.entries(position).forEach(i=>{pos.push({pos:i[1].latlng,attributes:i[1].attributes,time:i[1].time})})
    setmarks(pos)
    
  }, [position])

  //check online status
  const checkStatus=(time)=>{
    var status=["Offline","#9D9D9D"]
    
      const dt = new Date(time);
      const nw = new Date()
      var diffMs = nw-dt
      const days = parseInt((diffMs ) / (1000 * 60 * 60 * 24));
      const hours = parseInt((diffMs ) / (1000 * 60 * 60));
      if(Math.abs(days)>0 || Math.abs(hours)>0){return status}
      else { 
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); 
        if(Math.abs(diffMins)<10){
        status = ["Online","#06FF00"]
       }
      }
    return status
  }
 

  var greenIcon = L.icon({
    iconUrl: deviceIcon,
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [0,0], // point of the icon which will correspond to marker's location
      // the same for the shadow
    popupAnchor:  [19,5] // point from which the popup should open relative to the iconAnchor
});


  return(
    

<MapContainer  className="MapContainer" center={[32.249921938982624, -7.968285524784768]} zoom={6} scrollWheelZoom={false}>

  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    url="https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=jab0Ntex6UOajMfdGw1Z9P4sLbfqsfBGQ6UQ6_4NKps"
  />
   <SnakeAnim startAnimation={startAnimation} routes={routes} />
   <MarkerClusterGroup showCoverageOnHover={false} >
   
  {marks.map((m)=>(
  <Marker position={m.pos} icon={greenIcon}>
  <Popup >
    <List style={{marginLeft:-10,width:190}}
    dense={true}
    subheader={<ListSubheader style={{ marginBottom:180, marginTop:-190}} >
       <Typography style={{width:200}} variant="overline" > IMEI: {m.attributes.imei}</Typography>  </ListSubheader>}
    >
      <ListItemButton style={{width:200}}>
      <ListItemIcon>
        <CircleIcon style={{fill:checkStatus(m.time)[1]}} />
      </ListItemIcon>
      <ListItemText style={{marginLeft:-20}} primary={" Status : "+checkStatus(m.time)[0]} />
    </ListItemButton >
      <ListItemButton style={{width:200}}>
      <ListItemIcon>
        <SpeedIcon />
      </ListItemIcon>
      <ListItemText style={{marginLeft:-20}} primary={" Speed : " +m.attributes.speed+" Km/h" } />
    </ListItemButton>
    <ListItemButton style={{width:200}}>
      <ListItemIcon>
        <BatteryFullIcon />
      </ListItemIcon>
      <ListItemText style={{marginLeft:-20}} primary={" Battery : "+m.attributes.battery+" mV" } />
    </ListItemButton >
    <ListItemButton style={{width:200}}>
      <ListItemIcon>
        <RouteIcon />
      </ListItemIcon>
      <ListItemText style={{marginLeft:-20}} primary={" Distance : "+m.attributes.odometre+" KM" } />
    </ListItemButton>
    <ListItemButton style={{width:200}} >
      <ListItemIcon>
        <ThermostatIcon />
      </ListItemIcon>
      <ListItemText style={{marginLeft:-20}} primary={" Temperature : "+m.attributes.temperature +" °C" }/>
    </ListItemButton>
    </List>
    
  </Popup>

  </Marker>
  
  ))}
  {position[markers] && (
   <PosMap pos={position[markers].latlng} />
  )}
  </MarkerClusterGroup>
</MapContainer>
  )

}
export default Maps

