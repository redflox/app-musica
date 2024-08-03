import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <Container> 
      <h1>app-musica</h1>
      <Outlet />      
    </Container>
  )
}

export default App
