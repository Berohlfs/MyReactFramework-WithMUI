// Routes
import { auth_routes, open_routes } from './routes'
// Layouts
import { AuthLayout } from './layout/auth/AuthLayout'
import { OpenLayout } from './layout/open/OpenLayout'
// Libs
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import 'dayjs/locale/pt-br'
// MUI
import { CssBaseline, GlobalStyles, CircularProgress, Stack, Typography } from '@mui/material'
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ptBR } from '@mui/material/locale'
// Theme
import { components } from './theme/components'
import { palette } from './theme/palette'
import { typography } from './theme/typography'
import { global_styles } from './theme/globalStyles'
// React
import { useState, createContext, Dispatch, SetStateAction } from 'react'

type Loading = {
  render: boolean,
  text?: string
}

type AppValues = {
  setLoading: Dispatch<SetStateAction<Loading>>,
  setDarkMode: Dispatch<SetStateAction<boolean>>,
  dark_mode: boolean
}

export const AppContext = createContext<AppValues | null>(null)

export function App() {

  const [loading, setLoading] = useState<Loading>({render: false})

  const [dark_mode, setDarkMode] = useState(true)

  const theme = createTheme({
    typography: typography(),
    palette: palette(dark_mode ? 'dark' : 'light'),
    components: components()
  }, ptBR)

  const progress_container_style = {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    zIndex: '2000',
    backgroundColor: '#0000009e'
  }

  return (

    <ThemeProvider theme={responsiveFontSizes(theme)}>

    <LocalizationProvider adapterLocale={'pt-br'} dateAdapter={AdapterDayjs}>

    <AppContext.Provider value={{setLoading, setDarkMode, dark_mode}}>

      {loading.render &&
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        sx={progress_container_style}>
          <CircularProgress/>
          <Typography mt={2} fontSize={11}>{loading.text ? loading.text : 'Carregando'}</Typography>
      </Stack> }

      <Toaster
        theme={dark_mode ? 'dark' : 'light'}
        closeButton={true}
        richColors={true}/>

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
