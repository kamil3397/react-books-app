import { Outlet } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { Navbar } from './components/Navbar/Navbar'
const App = () => (
  <>
    <CssBaseline/>
    <Navbar />
    <Outlet/>
  </>
)

export default App
