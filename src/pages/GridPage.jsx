import React from 'react'
import Container from "@mui/material/Container";
import GridTable from "components/GridTable/GridTable";

const GridPage = () => {
  return (
    <>
      <Container sx={{ paddingTop: "20px" }}>
        <GridTable />
      </Container>
    </>
  );
}

export default GridPage
