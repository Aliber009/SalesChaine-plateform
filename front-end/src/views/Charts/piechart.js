import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import CircleIcon from '@mui/icons-material/Circle';
import { useSelector } from "react-redux";

const PieChart = ({ total }) => {
  const pos = useSelector(state => state.positions.items);
  const checkStatus = (time) => {
    var status = false

    const dt = new Date(time);
    const nw = new Date()
    var diffMs = nw - dt
    const days = parseInt((diffMs) / (1000 * 60 * 60 * 24));
    if (Math.abs(days) > 0) { return status }
    else {
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      if (diffMins < 10) {
        status = true
      }
    }
    return status
  }

  const [data, setdata] = useState([])
  useEffect(() => {
    var online = 0
    for (var i = 0; i < Object.entries(pos); i++) {
      if (checkStatus(pos[i][1].time)) { online += 1 }
    }
    console.log('onn', online)
    setdata([online, total - online])
  }, [pos])
  var daata = {
    labels: ['Online', 'Offline'],
    series: data
  };

  var options = {
    donut: true,
    donutSolid: true,
    startAngle: 270,
    showLabel: true,
    
    
  };

  var responsiveOptions = [
    ['screen and (min-width: 640px)', {
      chartPadding: 30,
      labelOffset: 100,
      labelDirection: 'explode',
      
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 80,
      chartPadding: 20
    }]
  ];
  return (
    <div>
       <div>
      <ChartistGraph data={daata} options={options} type="Pie" />
      </div>
    <div>    
    <CircleIcon style={{fill:"#f05b4f"}} /> Offline
    </div>
    </div>
  )
}
export default PieChart;      