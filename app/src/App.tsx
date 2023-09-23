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
import { LinearProgress } from '@mui/material'
// React hooks
import { useState, createContext } from 'react'
export const AppContext = createContext()

function App() {

  const progress_style = {
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '10'
  }

  const [loading, setLoading] = useState(false)

  return (<>

      {loading && <LinearProgress sx={progress_style}/>}

      <ToastContainer
        position={"top-right"}
        draggable={false}
        autoClose={3000}/>

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
