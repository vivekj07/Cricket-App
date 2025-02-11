import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "../src/redux/store.js"
import { CssBaseline } from '@mui/material'
import { HelmetProvider } from 'react-helmet-async'
import { SocketProvider } from './socket.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <HelmetProvider>
      <CssBaseline>
        <SocketProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </SocketProvider>
      </CssBaseline>
    </HelmetProvider>
  // </StrictMode>,
)
