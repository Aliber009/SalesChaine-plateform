import React,{useState, useEffect} from "react";
import ReactApexChart from "react-apexcharts";
   
const PieChart=({series})=>{
     const [data, setdata] = useState([])
      useEffect(()=>{
          setdata(series)
      },[series])
        
        const options = {
          chart: {
            size:200,
            type: 'donut',
          },
          labels: ['online','offline'],
          dataLabels: {
            formatter: function (val, opts) {
                return opts.w.config.series[opts.seriesIndex]
            },
          },
          responsive: [{
            breakpoint: 80,
            options: {
                chart: {
                    type: 'donut',
                  },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      return (
     <div id="chart" >
    <ReactApexChart options={options} series={data} type="donut" />
    </div>
      )}
export default PieChart;      