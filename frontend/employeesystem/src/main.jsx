import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import App from './App.jsx'
import {AuthProvider} from "./authContext.jsx";




createRoot(document.getElementById('root')).render(
  <StrictMode>

      <AuthProvider>
          <App />
      </AuthProvider>

  </StrictMode>,
)
