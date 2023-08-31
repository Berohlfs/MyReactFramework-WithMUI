// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// App
import App from './App.jsx'
// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'
import { deepPurple, amber } from '@mui/material/colors' // https://mui.com/material-ui/customization/color/

const theme = createTheme({
  ptBR,
  typography: {
    fontFamily: "'Inter','sans-serif'"
  },
  palette: {
    primary: {
      main: deepPurple[500],
      light: deepPurple[200],
      contrastText: '#ffffff',
      dark: deepPurple[600]
    },
    secondary: {
      main: amber[400],
      light: amber[200],
      contrastText: '#ffffff',
      dark: amber[600]
    },
  },
  components:{
    MuiPaper: {
      styleOverrides:{
          root: {
            boxShadow: '0 0 0.3em #ccc',
          }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontSize: 12,
        },
      }
    },
    MuiInputLabel: {
      styleOverrides:{
        root:{
          fontSize: 12,
        },
        shrink: {
          fontSize: 16
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides:{
        label:{
          fontSize: 12,
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: 10
        }
      }
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained'
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <ThemeProvider theme={theme}>

      <App/>

    </ThemeProvider>

  </React.StrictMode>

)
