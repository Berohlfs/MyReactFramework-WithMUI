// Open
import { Login } from './pages/open/Login'
import { NotFound } from './pages/open/NotFound'
// Auth
import { ListPotions } from './pages/auth/List'
import { SinglePotion } from './pages/auth/Single'

export const open_routes = [
    { path: '/', component: <Login /> },
    { path: '*', component: <NotFound /> }
]

export const auth_routes = [
    { path: '/potions', component: <ListPotions /> },
    { path: '/potions/:id', component: <SinglePotion role={'show'}/> },
    { path: '/new/potion', component: <SinglePotion role={'create'}/> },
]
