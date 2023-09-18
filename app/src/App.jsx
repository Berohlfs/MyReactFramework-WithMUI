// Rotas
import { auth_routes, open_routes } from './routes'
// Layouts
import AuthLayout from './layout/auth/AuthLayout'
import OpenLayout from './layout/open/OpenLayout'
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
      backgroundColor: '#f7f7f7',
      paddingBottom: '50px'
    },
    html: {
      scrollBehavior: 'smooth',
    },
    a: {
      color: '#2864ad'
    },
    '*': {
      fontFamily: "'Inter','sans-serif'",
      /* Firefox */
      scrollbarWidth: 'thin',
      scrollbarColor: '#bbb #e7e7e7'
    },
    /* Chrome, Edge and Safari */
    '*::-webkit-scrollbar': {
      width: '5px',
      height: '5px'
    },
    '*::-webkit-scrollbar-track': {
      backgroundColor: '#e7e7e7'
    },
    '*::-webkit-scrollbar-thumb': {
      borderRadius: '20px',
      backgroundColor: '#bbb'
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

      <ToastContainer position={"top-right"} draggable={false} autoClose={3000}/>

      <CssBaseline/>

      <GlobalStyles styles={global_styles}/>

      <AppContext.Provider value={{setLoading}}>

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

  </>)
}

export default App
