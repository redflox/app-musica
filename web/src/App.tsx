import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
