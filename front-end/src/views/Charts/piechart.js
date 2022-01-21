import React,{useState, useEffect} from "react";
import ReactApexChart from "react-apexcharts";
   
const PieChart=({series})=>{
     const [data, setdata] = useState([])
      useEffect(()=>{
          setdata(series)
      },[])
        
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
     <div id="chart"  style={{marginTop:200}}>
    <ReactApexChart  options={options} series={data} type="donut" />
    </div>
      )}
export default PieChart;      