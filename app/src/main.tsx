// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// App component
import App from './App'
// Libs
import 'dayjs/locale/pt-br'
// MUI
import { CssBaseline, GlobalStyles } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// MUI's Theme
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import components from './theme/components'
import palette from './theme/palette'
import typography from './theme/typography'
import global_styles from './theme/globalStyles'
import { ptBR } from '@mui/material/locale'

const theme = createTheme({
  typography: typography(),
  palette: palette(),
  components: components()
}, ptBR)

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>

    <ThemeProvider theme={responsiveFontSizes(theme)}>

      <LocalizationProvider adapterLocale={'pt-br'} dateAdapter={AdapterDayjs}>

        <App/>

        <CssBaseline/>

        <GlobalStyles styles={global_styles}/>

      </LocalizationProvider>

    </ThemeProvider>

  </React.StrictMode>

)
