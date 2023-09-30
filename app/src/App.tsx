// Routes
import { auth_routes, open_routes } from './routes'
// Layouts
import { AuthLayout } from './layout/auth/AuthLayout'
import { OpenLayout } from './layout/open/OpenLayout'
// Libs
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// MUI
import { LinearProgress } from '@mui/material'
// React
import { useState, createContext, Dispatch, SetStateAction } from 'react'

type AppValues = {
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppValues | null>(null)

export function App() {

  const [loading, setLoading] = useState(false)

  const progress_style = {
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '10'
  }

  return (

      <AppContext.Provider value={{setLoading}}>

        {loading && <LinearProgress sx={progress_style}/>}

        <ToastContainer
          position={"top-right"}
          draggable={false}
          autoClose={3000}/>

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

  )
}
