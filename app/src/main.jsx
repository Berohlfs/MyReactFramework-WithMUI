// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// App component
import App from './App.jsx'
// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'
// Theme (MUI's Custom Styling)
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

    {/* Todos os componentes do Material UI aninhados ao ThemeProvider
    respeitarão as regras de estilização estabelecidas por 'theme'. */}

    <ThemeProvider theme={theme}>

      <App/>

    </ThemeProvider>

  </React.StrictMode>

)
