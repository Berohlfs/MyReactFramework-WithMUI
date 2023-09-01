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

  // State para gerenciar a barra de carregamento
  const [loading, setLoading] = useState(false)

  const global_styles = {
    body: {
      backgroundColor: '#f7f7f7',
      paddingBottom: '50px'
    },
    html: {
      scrollBehavior: 'smooth'
    },
    '*': {
      /* A declaração global da fonte desejada permite
      sua utilização fora dos componentes do MUI. */
      fontFamily: "'Inter','sans-serif'"
    },
    a: {
      color: '#2864ad'
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

      {/* O CssBaseline injeta regras de estilo básicas para corrigir pré-definições
      dos navegadores: 'margin', 'padding', 'box-sizing', 'lists', 'text-selection', etc. */}

      <CssBaseline/>

      {/* O componente GlobalStyles facilita a adição de estilos
      globais personalizados dentro da aplicação. */}

      <GlobalStyles styles={global_styles}/>

      {/* O AppContext possibilita a passagem de valores para
      componentes aninhados, dispensando o uso desnecessário de props */}

      <AppContext.Provider value={{loading, setLoading}}>

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
