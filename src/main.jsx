import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import StateContext from './context/StateContext.jsx'

createRoot(document.getElementById('root')).render(
  <StateContext>
 <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
  </StateContext>
 
)
