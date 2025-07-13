import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CssBaseline } from '@mui/material'
const App = () => (
  <>
    <CssBaseline/>
    <Navbar />
    <Outlet/>
  </>
)

export default App
