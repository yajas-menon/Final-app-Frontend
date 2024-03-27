import { Bar } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Number of Assessments",
      backgroundColor: [
        "rgba(18,55,64)",
        "rgba(84,154,171)",
        "rgba(176,215,225))",
        // 'rgba	(118,123,141)',
        "rgba(241,128,45)",
        "rgba(30,187,215)",
      ],
      borderColor: "#4caf50",
      data: [23, 35, 46, 12, 41, 53], // replace with your actual assessment counts
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          suggestedMax: 100, // adjust as needed based on your max value
        },
        gridLines: {
          display: false,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
        },
      },
    ],
  },
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
};

let monthsMapping = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
};

function LineGraph(props) {
  console.log(props);
  let months = [];
  props?.months?.forEach((item) => {
    months.push(monthsMapping[item]);
  });
  console.log(months);
  data.datasets[0].data = props?.monthsData;
  data.labels = months;
  return (
    <div className="w-full h-64 bg-white p-4 rounded shadow">
      <Bar data={data} options={options} />
    </div>
  );
}

export default LineGraph;
