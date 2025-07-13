import { ThemeProvider } from '@mui/material'
import { AuthProvider } from './context/AuthContext'
import { theme } from './theme/theme'
import type { PropsWithChildren } from 'react'
import { FavoritesProvider } from './context/FavoritesContext'


export const Providers = ({ children }: PropsWithChildren) => {
  return (
      <AuthProvider>
        <FavoritesProvider>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
        </FavoritesProvider>
      </AuthProvider>
  )
}
