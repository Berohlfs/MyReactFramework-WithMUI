// Rotas
import { auth_routes, open_routes } from './routes'
// Layouts
// import OpenLayout from './layouts/OpenLayout'
// import AuthLayout from './layouts/AuthLayout'
// Libs
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// MUI
import { CssBaseline, GlobalStyles, LinearProgress } from '@mui/material'
// React hooks
import { useState, createContext } from 'react'
export const AppContext = createContext()

function App() {

  const [loading, setLoading] = useState(false)

  const global_styles = {
    body: {
      backgroundColor: '#efefef',
      paddingBottom: '50px'
    },
    html: {
      scrollBehavior: 'smooth'
    },
    '*': {
      fontFamily: "'Inter','sans-serif'"
    }
  }

  const progress_style = {
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '10'
  }

  return (<>

      {loading && <LinearProgress sx={progress_style}/>}

      <ToastContainer position={"top-right"} autoClose={3000}/>

      <CssBaseline/>

      <GlobalStyles styles={global_styles}/>

      <AppContext.Provider value={{loading, setLoading}}>

        <BrowserRouter>

            <Routes>

              {auth_routes.map((route, index)=>

                <Route
                  key={index}
                  path={route.path}
                  element={route.component}/>

              )}

              {open_routes.map((route, index)=>

                <Route
                  key={index}
                  path={route.path}
                  element={route.component}/>

              )}

            </Routes>

        </BrowserRouter>

      </AppContext.Provider>

  </>)
}

export default App
