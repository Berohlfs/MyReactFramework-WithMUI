import MuiModal from '@mui/material/Modal'
import { Paper, Typography, Divider, Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    padding: 14
}))

const Modal = ({children, open, handleClose, title = 'Modal', max_width = 400})=> {

    return (
        <MuiModal open={open} onClose={handleClose}>

            <StyledPaper sx={{maxWidth: max_width}}>

                <Typography variant={"subtitle1"} mb={1}>
                    {title}
                </Typography>

                <Divider/>

                <Box mt={1}>{children}</Box>

            </StyledPaper>

        </MuiModal>
    )
}

export default Modal
