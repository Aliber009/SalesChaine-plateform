import React from "react";
import { useMap } from "react-leaflet";
export default function PosMap({pos}){
    const map=useMap()
    

    if(pos){
    map.panTo(pos)
    }
    
    return null
}