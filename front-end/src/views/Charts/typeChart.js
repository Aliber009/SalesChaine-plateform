import React,{useState, useEffect} from "react";
import ReactApexChart from "react-apexcharts";

const TypeChart=({seriesData})=>{
      
        const series= [{
          data: seriesData
        }];
        const options= {
          chart: {
            height: 250,
            type: 'bar',
            events: {
              click: function(chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: [
              ['humidity sensor'],
              ['Temperature'],
              ['Oxymetre'], 
              ['QR pass'],
              ['Gps'],
            ],
            labels: {
              style: {
                fontSize: '11px',
                colors:["#000"],
                
              }
            }
          }
        };
    
    
      return (
        

  <div id="chart">
<ReactApexChart options={options} series={series} type="bar" height={280} />
</div>
      )
    }
export default TypeChart;