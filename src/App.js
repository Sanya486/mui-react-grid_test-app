import Container from "@mui/material/Container";
import GridTable from "./components/GridTable/GridTable";
import DrawerAppBar from "./components/AppBar/AppBar";

function App() {
  return (
    <>
      <DrawerAppBar/>
      <Container sx={{paddingTop: "20px"}}><GridTable /></Container>
    </>
  );
}

export default App;
