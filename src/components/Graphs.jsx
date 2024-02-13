import { PolarArea , Bar} from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement);

ChartJS.register(ArcElement, Tooltip, Legend);
const yajas = {
  labels: ["Compliant", "Non-Compliant"],
  datasets: [
    {
      label: "Compliant and Non-compliant",
      data: [30,70],
      backgroundColor: ["rgb(0, 0, 139)", "rgb(255,0,0)"],
      hoverOffset: 4,
    },
  ],
};
const yajas2 = { cutout: 135 };

const yajas3 = {
  labels: ["Ongoing", "Pending"],
  datasets: [
    {
      label: "Ongoing and Pending",
      data: [6,24],
      backgroundColor: ["rgb(0, 0, 139)", "rgb(255, 191, 0)"],
      hoverOffset: 4,
    },
  ],
};
const yajas4 = {
  cutout: 135,
};

function Graphs() {
  const labels = ['Jan' , 'Feb' , 'Mar' , 'April' , 'May' , 'June' , 'July']
const chartData = {
  labels: labels,
  datasets: [{
    label: 'Active and Non Avtive vendors',
    data: [10,12,14,8,11,13,6],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

  const options = {};
  return (
    <div>
      
      
      <div className="flex mt-5 ">
        <div className="my-5 mx-10  max-w-sm flex md:flex md:flex-grow flex-row justify-end space-x-1 ">
          <Bar data={yajas} options={yajas2}></Bar>
        </div>
        <div className="my-5 mx-10 max-w-sm flex md:flex md:flex-grow flex-row justify-end space-x-1 ">
          <Bar data={yajas3} options={yajas4}></Bar>
        </div>

        <div className="my-5 mx-9  max-w-sm  flex md:flex md:flex-grow flex-row justify-end space-x-1 ">
          <Bar data={chartData} options={options}></Bar>
        </div>
      </div>
      
    </div>
  );
}

export default Graphs;
