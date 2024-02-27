// MUI
import MuiModal from '@mui/material/Modal'
import { Paper, Typography, Divider, Box, IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Close } from '@mui/icons-material'
// React
import { ReactNode } from 'react'

const StyledPaper = styled(Paper)((/*{theme}*/) => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    padding: '16px',
    maxHeight: '75%',
    overflowY: 'scroll',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
}))

type Props = {
    children: ReactNode
    open: boolean
    max_width: number
    title: string
    handleClose: () => void
    keep_mounted?: boolean
}

export const Modal = ({ children, open, handleClose, title = 'Modal', max_width = 400, keep_mounted }: Props) => {
    return (
        <MuiModal keepMounted={keep_mounted} open={open} onClose={handleClose}>
            <StyledPaper sx={{ maxWidth: max_width }}>
                <Tooltip title={'Fechar'} sx={{ position: 'absolute', top: 3, right: 3 }}>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Tooltip>

                <Typography variant={'subtitle1'}> {title} </Typography>

                <Divider sx={{ my: 2 }} />

                <Box>{children}</Box>
            </StyledPaper>
        </MuiModal>
    )
}
