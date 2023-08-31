// Layout components
import Header from './Header'
import Drawer from './Drawer'
// MUI
import { Box } from '@mui/material'
// Libs
import { Navigate } from 'react-router-dom'
// React hooks
import { createContext, useState } from 'react'
export const AuthLayoutContext = createContext()

const AuthLayout = ({children})=> {

    const [drawer_opened, setDrawerOpened] = useState(false)

    return (<>

        {sessionStorage.getItem('token')

        ?

        <AuthLayoutContext.Provider value={{drawer_opened, setDrawerOpened}}>

            <Drawer/>

            <Header/>

            <Box position={'relative'} top={'55px'}>{children}</Box>

        </AuthLayoutContext.Provider>

        :

        <Navigate to={'/'}/>

        }

    </>)
}

export default AuthLayout
