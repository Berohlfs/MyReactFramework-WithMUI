// MUI
import { Box, Paper } from '@mui/material'
// React
import { ReactNode } from 'react'

type Props = {
    children: ReactNode,
    type: 'box' | 'paper'
}

export const PageBlock = ({children, type='box'}: Props)=> {

    const block_styles = {
        width: '90%',
        margin: '30px auto 0'
    }

    return (

        type === 'box' ?

        <Box sx={block_styles}>

            {children}

        </Box> :

        <Paper sx={block_styles}>

            {children}

        </Paper>
    )
}
