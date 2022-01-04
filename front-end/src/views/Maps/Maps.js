import React,{ useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup ,Polyline, useMap, MapConsumer} from 'react-leaflet'
import './map.css'
import SnakeAnim from './replayAnimation';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useSelector } from 'react-redux';
import { marker } from 'leaflet';
import PosMap from './CurrentPosition';



const polyline = [
  [31.505, -7.09],
  [32.11, -8.1],
  [34.21, -7.2],
]

const limeOptions = { color: '#113CFC', stroke:true }
 


const Maps=({ markers , startAnimation, routes})=>{

  const position  = useSelector(state => state.positions.items)
  const [marks,setmarks]=useState([])
  

  useEffect(() => {
    var pos=[]
    Object.entries(position).forEach(i=>{pos.push(i[1])})
    setmarks(pos)
    return () => {
      null
    }
  }, [position])

/*   useEffect(()=>{
    findCurrentPos(markers)
  },[markers])

  const findCurrentPos=(id)=>{
    if(position.id){
      map.panTo(position.id)
    }
  } */




  return(
    

<MapContainer  className="MapContainer" center={[32.249921938982624, -7.968285524784768]} zoom={6} scrollWheelZoom={false}>

  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
   <SnakeAnim startAnimation={startAnimation} routes={routes} />
   <MarkerClusterGroup>
  {marks.map((m)=>(
  <Marker position={m}>
    <Popup>
      Nextronic Device. <br /> Websocket works fine :)
    </Popup>
  </Marker>
  
  ))}
  {position[markers] && (
   <PosMap pos={position[markers]} />
  )}
  </MarkerClusterGroup>
</MapContainer>
  )

}
export default Maps

