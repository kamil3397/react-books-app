import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from './Providers'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,

)
