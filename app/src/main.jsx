// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// App component
import App from './App.tsx'
// MUI
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'
// Theme
import components from './theme/components'
import palette from './theme/palette'
import typography from './theme/typography'

const theme = createTheme({
  typography: typography(),
  palette: palette(),
  components: components()
}, ptBR)

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <ThemeProvider theme={responsiveFontSizes(theme)}>

      <App/>

    </ThemeProvider>

  </React.StrictMode>

)
