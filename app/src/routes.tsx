// Open
import { Login } from './pages/open/Login'
import { NotFound } from './pages/open/NotFound'
// Auth
import { EntityIndex } from './pages/auth/Index'
import { EntityShow } from './pages/auth/Show'
import { EntityCreate } from './pages/auth/Create'

export const open_routes = [
    { path: '/', component: <Login /> },
    { path: '*', component: <NotFound /> }
]

export const auth_routes = [
    { path: '/entity', component: <EntityIndex /> },
    { path: '/entity/:id', component: <EntityShow /> },
    { path: '/new/entity', component: <EntityCreate /> }
]
