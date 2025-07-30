import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CssBaseline } from '@mui/material'

const App = () => {
  
  return (
    <>
      <CssBaseline/>
      <Navbar />
      <Outlet/>
    </>
  )
}


export default App
