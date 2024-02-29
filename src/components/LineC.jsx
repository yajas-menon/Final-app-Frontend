import React from 'react';
import { Line , PolarArea} from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Title,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
ChartJS.register(RadialLinearScale,ArcElement,Tooltip,Title);

const data = {
  labels: ['Low', 'Medium', 'High'],
  datasets: [
    {
      label: 'Vendor Risk Distribution',
      data: [20, 40, 30], // Sample data, replace with your data
      fill: false,
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgba(0,80,115)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const data1 = {
  labels: [
    'January',
    'February',
    'March',
    'April'
  ],
  datasets: [{
    type: 'bar',
    label: 'Bar Dataset',
    data: [10, 20, 30, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: 
      'rgb(54, 162, 235)'
  }, {
    type: 'line',
    label: 'Line Dataset',
    data: [12,22,32,42],
    fill: false,
    borderColor: 'rgb(54, 162, 235)'
  }]
};




const LineC = () => (
  <div>

  <div className="w-full h-64 bg-white p-4  rounded shadow flex gap-x-64 inline mr-14">
    <Line data={data} options={options} />
    <Line data={data1} options={options} />
    
 </div>
 
  </div>
);

export default LineC;