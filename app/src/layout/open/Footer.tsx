// MUI
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledFooter = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    right: 0,
    backgroundColor: theme.palette.background.default,
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderTopLeftRadius: 10,
    padding: '2px 10px',
    color: theme.palette.primary.main
}))

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <StyledFooter>
            <Typography fontSize={'9px'}>&copy;{year} - MyReactFramework-WithMUI</Typography>
        </StyledFooter>
    )
}
