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




const LineC = () => (
  <div>

  <div className="w-full h-64 bg-white p-4 rounded shadow flex inline mr-14">
    <Line data={data} options={options} />
 </div>
 
  </div>
);

export default LineC;