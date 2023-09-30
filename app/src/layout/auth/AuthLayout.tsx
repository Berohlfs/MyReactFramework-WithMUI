// Layout components
import { Static } from './Static'
import { Footer } from '../both/Footer'
// MUI
import { Box } from '@mui/material'
// Libs
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
// React
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react'

type Breadcrumb = {
    text: string,
    link: string
}

type AuthValues = {
    breadcrumbs: Breadcrumb[],
    setBreadcrumbs: Dispatch<SetStateAction<Breadcrumb[]>>
}

export const AuthLayoutContext = createContext<AuthValues | null>(null)

type Props = {
    children: ReactNode
}

export const AuthLayout = ({children}: Props)=> {

    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([])

    return (<>

        {Cookies.get('access')

        ?

        <AuthLayoutContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>

            <Static/>

            <Box position={'relative'} top={'55px'} padding={3}>


                {children}


            </Box>

        </AuthLayoutContext.Provider>

        :

        <Navigate to={'/'}/> }

        <Footer/>

    </>)
}
