// Layout components
import { Static } from './Static'
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

export const AuthLayout = ({ children }: Props) => {
    return Cookies.get('access') ? (
        <>
            <Static />

            <Box
                position={'relative'}
                top={'55px'}
                paddingY={3}
                paddingLeft={2}
                paddingRight={9}>

                {children}

            </Box>
        </>
    ) : (
        <Navigate to={'/'} />
    )
}
