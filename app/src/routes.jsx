// Páginas protegidas
import Home from './pages/auth/Home'
// Páginas abertas
import Login from './pages/open/Login'
import NotFound from './pages/open/NotFound'

export const open_routes = [
    {path: '/', component: <Login/>},
    {path: '*', component: <NotFound/>},
]

export const auth_routes = [
    {path: '/home', component: <Home/>}
]
