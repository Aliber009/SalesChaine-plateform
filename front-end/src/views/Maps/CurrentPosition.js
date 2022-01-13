import React from "react";
import { useMap } from "react-leaflet";
export default function PosMap({pos}){
    const map=useMap()
    

    if(pos){
    map.setZoom(17)
    map.panTo(pos)
    }
    
    return null
}