// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// App
import App from './App.jsx'
// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'
// Theme
import components from './theme/components.js'
import palette from './theme/palette.js'
import typography from './theme/typography.js'

const theme = createTheme({
  ptBR,
  typography: typography(),
  palette: palette(),
  components: components()
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <App/>

    </ThemeProvider>

  </React.StrictMode>

)
