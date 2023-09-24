// MUI
import MuiModal from '@mui/material/Modal'
import { Paper, Typography, Divider, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
// React
import { ReactNode } from 'react'

const StyledPaper = styled(Paper)((/*{theme}*/) => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    padding: 14
}))

type Props = {
    children: ReactNode,
    open: boolean,
    max_width: number,
    title: string,
    handleClose: ()=> void
}

const Modal = ({children, open, handleClose, title = 'Modal', max_width = 400}: Props)=> {

    return (

        <MuiModal open={open} onClose={handleClose}>

            <StyledPaper sx={{maxWidth: max_width}}>

                <Typography variant={"subtitle1"} mb={1}>
                    {title}
                </Typography>

                <Divider/>

                <Box mt={1}>


                    {children}


                </Box>

            </StyledPaper>

        </MuiModal>

    )
}

export default Modal
