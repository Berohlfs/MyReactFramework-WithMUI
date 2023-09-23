// MUI
import { Box, Paper } from '@mui/material'

const AuthBlock = ({children, type='box'})=> {

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

export default AuthBlock
