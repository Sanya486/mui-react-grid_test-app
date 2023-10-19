import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Title, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import employeeData from "data/employeeData.json";

const getChartData = (data, category) => {
  const result = {};
  data.forEach((item) => {
    if (result[item[category]]) result[item[category]] += 1;
    else result[item[category]] = 1;
  });
  return result;
};


export function PieChart({ category}) {
    const chartData = getChartData(employeeData, category);

    ChartJS.register(ArcElement, Tooltip, Legend, Title);

    const data = {
      labels: Object.keys(chartData),
      datasets: [
        {
          label: "Amount of employee",
          data: Object.values(chartData),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: category.toLocaleUpperCase(),
        },
        legend: {
          position: "right",
        },
      },

      responsive: true,
    };
  return <Pie data={data} options={options} />;
}
