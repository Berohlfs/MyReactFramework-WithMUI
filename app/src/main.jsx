// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// App
import App from './App.jsx'
// MUI
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { ptBR } from '@mui/material/locale'

const theme = createTheme({
  ptBR,
  typography: {
    fontFamily: "'Inter','sans-serif'"
  },
  palette: {
    example: {
      main: '#556ee6',
      light: '#c8d0ff',
    },
  },
  components:{
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

      <App />

    </ThemeProvider>

  </React.StrictMode>,

)
