// Layout components
import { Static } from './Static'
import { Footer } from '../both/Footer'
// MUI
import { Box } from '@mui/material'
// Libs
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
// React
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const AuthLayout = ({children}: Props)=> {

    return (<>

        {Cookies.get('access')

        ?
            <>

            <Static/>

            <Box position={'relative'} top={'55px'} padding={3}>

                {children}

            </Box>

            </>

        :

        <Navigate to={'/'}/> }

        <Footer/>

    </>)
}
