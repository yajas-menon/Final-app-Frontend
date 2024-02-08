import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Button from "./Button";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

ChartJS.register(ArcElement, Tooltip, Legend);
const yajas = {
  labels: ["Compliant", "Non-Compliant"],
  datasets: [
    {
      label: "My First Dataset",
      data: [50, 50],
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
      label: "My First Dataset",
      data: [50, 200],
      backgroundColor: ["rgb(0, 0, 139)", "rgb(255, 191, 0)"],
      hoverOffset: 4,
    },
  ],
};
const yajas4 = {
  cutout: 135,
};

function Graphs() {
  const labels = ["Apr 13", "Apr 21", "May 13 ", "May 21", "May 25"];
  const dataset1 = {
    label: "Line 1",
    data: [2, 1, 1, 1, 2.2], // replace with your actual data points
    borderColor: "#ff6384",
    fill: false,
  };

  const dataset2 = {
    label: "Line 2",
    data: [0.5, 1, 1.5, 2, 2.5], // replace with your actual data points
    borderColor: "#36a2eb",
    fill: false,
  };

  const chartData = {
    labels,
    datasets: [dataset1, dataset2],
  };

  const options = {};
  return (
    <div>
      <h1 className="text-3xl font-bold mt-5 ml-10">Overall Status</h1>
      <Button />
      <div className="flex">
        <div className="my-5 mx-10 max-w-xs flex md:flex md:flex-grow flex-row justify-end space-x-1">
          <Doughnut data={yajas} options={yajas2}></Doughnut>
        </div>
        <div className="my-5 mx-10 max-w-xs flex md:flex md:flex-grow flex-row justify-end space-x-1">
          <Doughnut data={yajas3} options={yajas4}></Doughnut>
        </div>

        <div className="my-5 mx-9 max-w-sm max-h-max flex md:flex md:flex-grow flex-row justify-end space-x-1">
          <Line data={chartData} options={options}></Line>
        </div>
      </div>
      <hr className="divide-y divide-transparent mt-18"></hr>
    </div>
  );
}

export default Graphs;
