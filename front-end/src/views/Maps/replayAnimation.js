import { useEffect } from "react";
import PropTypes from "prop-types";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { styled } from "@material-ui/core";
import FlagIcon from '@mui/icons-material/Flag';



const SnakeAnim = ({ startAnimation, routes }) => {
  const  map  = useMap();
  

  useEffect(() => {
    if (!startAnimation) return;

    var styledPath=[]
    var markers=[]
    for(var i = 1;i<routes.length;i++){
      if(i%10!=0 ){ 
        markers.push(routes[i]) 
      }
      else{
        markers.push(routes[i])
        styledPath.push(L.polyline(markers))
        styledPath.push(L.marker(routes[i],{ ModeEditOutlinedIcon }))
        markers=[routes[i]]
      }   
    }
    
    const route = L.featureGroup(
      styledPath
    );
    try{
    map.fitBounds(route.getBounds())
    }
    catch{
      console.log("No path was saved for this Period ")
    }
    map.addLayer(route);
  

    route.snakeIn();

    route.on("snakestart snake snakeend", ev => {
      console.log(ev.type);
    });
  
   
  }, [startAnimation]);

  return null;
};

SnakeAnim.propTypes = {
  startAnimation: PropTypes.bool.isRequired
};

export default SnakeAnim;
