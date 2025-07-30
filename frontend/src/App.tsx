import { Outlet } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { CssBaseline } from '@mui/material'
import { useEffect } from 'react'
import axios from 'axios';

const App = () => {
  
  useEffect(() => {
   
    axios.post('')
  }, [])

  return (
    <>
      <CssBaseline/>
      <Navbar />
      <Outlet/>
    </>
  )
}


export default App
