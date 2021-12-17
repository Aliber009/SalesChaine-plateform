import React from 'react';
import { MapContainer, TileLayer, Marker, Popup ,Polyline} from 'react-leaflet'
import './map.css'
import SnakeAnim from './replayAnimation';
import MarkerClusterGroup from 'react-leaflet-markercluster';



const polyline = [
  [31.505, -7.09],
  [32.11, -8.1],
  [34.21, -7.2],
]

const limeOptions = { color: '#113CFC', stroke:true }
 


const Maps=({ markers , startAnimation})=>{


  return(
    

<MapContainer  className="MapContainer" center={[32.249921938982624, -7.968285524784768]} zoom={6} scrollWheelZoom={false}>

  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
   <SnakeAnim startAnimation={startAnimation}  />
   <MarkerClusterGroup>
  {markers.map((m)=>(
  <Marker position={m}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
  ))}
  </MarkerClusterGroup>
</MapContainer>
  )

}
export default Maps

