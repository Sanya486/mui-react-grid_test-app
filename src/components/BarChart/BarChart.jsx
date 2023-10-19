import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import employeeData from "data/employeeData.json";

const getAverageSalaryByCriteria = (data, category) => {
  const result = {};
  data.forEach((item) => {
    if (result[item[category]]) {
      result[item[category]].push(item.salary);
    } else {
      result[item[category]] = [];
      result[item[category]].push(item.salary);
    }
  });

  const valuesArrays = Object.values(result);
  const averages = valuesArrays.map(
    (item) => item.reduce((a, b) => a + b, 0) / item.length
  );
  return {
    labels: Object.keys(result),
    averages,
  };
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ title, category }) => {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const graphData = getAverageSalaryByCriteria(employeeData, category);

  const labels = graphData.labels;

  const data = {
    labels,
    datasets: [
      {
        label: "Salary, $",
        data: graphData.averages,
        borderColor: "#1976d2",
        backgroundColor: "#84bcf4",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
