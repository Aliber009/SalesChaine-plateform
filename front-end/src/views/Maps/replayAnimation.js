import { useEffect } from "react";
import PropTypes from "prop-types";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.polyline.snakeanim/L.Polyline.SnakeAnim.js";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';



const SnakeAnim = ({ startAnimation }) => {
  const  map  = useMap();
  

  useEffect(() => {
    if (!startAnimation) return;
    const trd = [63.5, 11];
    const mad = [40.5, -3.5];
    const lnd = [51.5, -0.5];
    const ams = [52.3, 4.75];
    const vlc = [39.5, -0.5];

    const route = L.featureGroup([
      L.marker(trd, { ModeEditOutlinedIcon }),
      L.polyline([trd, ams]),
      L.marker(ams, { ModeEditOutlinedIcon }),
      L.polyline([ams, lnd]),
      L.marker(lnd, { ModeEditOutlinedIcon }),
      L.polyline([lnd, mad]),
      L.marker(mad, { ModeEditOutlinedIcon }),
      L.polyline([mad, vlc]),
      L.marker(vlc, { ModeEditOutlinedIcon })
    ]);

    map.fitBounds(route.getBounds());

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
