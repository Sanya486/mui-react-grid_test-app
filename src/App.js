import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GridPage from "./pages/GridPage";
import ChartJsPage from "./pages/ChartJsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<GridPage />} />
        <Route path="/chartjs" element={<ChartJsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
