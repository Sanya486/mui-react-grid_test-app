import { Container, Paper } from "@mui/material";
import BarChart from "components/BarChart/BarChart";
import { PieChart } from "components/PieChart/PieChart";
import React from "react";

const ChartJsPage = () => {
  return (
    <Container>
      <Paper
        square={false}
        elevation={3}
        sx={{
          width: "100%",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <BarChart title="Average Salary by Departments" category="department" />
      </Paper>
      <Paper
        square={false}
        elevation={3}
        sx={{
          width: "100%",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <BarChart title="Average Salary by Position" category="position" />
      </Paper>
      <Paper
        square={false}
        elevation={3}
        sx={{
          width: "100%",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <PieChart category="department" />
      </Paper>
      <Paper
        square={false}
        elevation={3}
        sx={{
          width: "100%",
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <PieChart category="position" />
      </Paper>
    </Container>
  );
};

export default ChartJsPage;
