import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { theme } from './theme/theme'
import type { PropsWithChildren } from 'react'


export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
