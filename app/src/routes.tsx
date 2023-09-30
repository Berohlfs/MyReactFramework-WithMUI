// Open
import { Login } from './pages/open/Login'
import { NotFound } from './pages/open/NotFound'
// Protected
import { EntityIndex } from './pages/auth/entity01/Index'
import { EntityShow } from './pages/auth/entity01/Show'
import { EntityCreate } from './pages/auth/entity01/Create'

export const open_routes = [
    {path: '/', component: <Login/>},
    {path: '*', component: <NotFound/>},
]

export const auth_routes = [
    {path: '/characters', component: <EntityIndex/>},
    {path: '/characters/:id', component: <EntityShow/>},
    {path: '/new/characters', component: <EntityCreate/>},
]
