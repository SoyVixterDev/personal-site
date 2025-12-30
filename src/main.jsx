import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './scripts/App.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
