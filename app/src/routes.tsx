// Componentes/páginas das rotas abertas
import Login from './pages/open/Login'
import NotFound from './pages/open/NotFound'
// Componentes/páginas das rotas protegidas
import Home from './pages/auth/Home'

/*
Os componentes renderizados pelas ROTAS ABERTAS serão aninhados ao
componente 'app/src/layout/open/openLayout.jsx'.
*/
export const open_routes = [
    {path: '/', component: <Login/>},
    {path: '*', component: <NotFound/>},
]

/*
Os componentes renderizados pelas ROTAS PROTEGIDAS serão aninhados ao
componente 'app/src/layout/auth/authLayout.jsx'.
*/
export const auth_routes = [
    {path: '/home', component: <Home/>}
]
