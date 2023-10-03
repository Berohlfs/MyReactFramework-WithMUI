// Routes
import { auth_routes, open_routes } from './routes'
// Layouts
import { AuthLayout } from './layout/auth/AuthLayout'
import { OpenLayout } from './layout/open/OpenLayout'
// Libs
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'dayjs/locale/pt-br'
// MUI
import { LinearProgress } from '@mui/material'
import { CssBaseline, GlobalStyles } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// MUI's Theme
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { components } from './theme/components'
import { palette } from './theme/palette'
import { typography } from './theme/typography'
import { global_styles } from './theme/globalStyles'
import { ptBR } from '@mui/material/locale'
// React
import { useState, createContext, Dispatch, SetStateAction } from 'react'

type AppValues = {
  setLoading: Dispatch<SetStateAction<boolean>>,
  setDarkMode: Dispatch<SetStateAction<boolean>>,
  dark_mode: boolean
}

export const AppContext = createContext<AppValues | null>(null)

export function App() {

  const [loading, setLoading] = useState(false)

  const [dark_mode, setDarkMode] = useState(true)

  const theme = createTheme({
    typography: typography(),
    palette: palette(dark_mode ? 'dark' : 'light'),
    components: components()
  }, ptBR)

  const progress_style = {
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '10'
  }

  return (

    <ThemeProvider theme={responsiveFontSizes(theme)}>

      <LocalizationProvider adapterLocale={'pt-br'} dateAdapter={AdapterDayjs}>

      <AppContext.Provider value={{setLoading, setDarkMode, dark_mode}}>

        {loading && <LinearProgress sx={progress_style}/>}

        <ToastContainer
          position={"bottom-center"}
          draggable={false}
          autoClose={3000}
          theme={'dark'}/>

        <CssBaseline/>

        <GlobalStyles styles={global_styles(dark_mode ? 'dark' : 'light')}/>

        <BrowserRouter>

            <Routes>

              {auth_routes.map((route, index)=>

                <Route
                  key={index}
                  path={route.path}
                  element={<AuthLayout>{route.component}</AuthLayout>}/>

              )}

              {open_routes.map((route, index)=>

                <Route
                  key={index}
                  path={route.path}
                  element={<OpenLayout>{route.component}</OpenLayout>}/>

              )}

            </Routes>

        </BrowserRouter>

      </AppContext.Provider>

      </LocalizationProvider>

      </ThemeProvider>

  )
}
