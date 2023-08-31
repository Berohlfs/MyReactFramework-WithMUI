// Layout components
import Header from './Header'
import Drawer from './Drawer'
// React hooks
import { createContext, useState } from 'react'
export const AuthLayoutContext = createContext()

const AuthLayout = ({children})=> {

    const [drawer_opened, setDrawerOpened] = useState(false)

    return (

        <AuthLayoutContext.Provider value={{drawer_opened, setDrawerOpened}}>

            <Drawer/>
            <Header/>
            {children}

        </AuthLayoutContext.Provider>

    )
}

export default AuthLayout
