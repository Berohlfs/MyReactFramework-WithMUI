// MUI
import { Typography, Stack, Paper, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
// Libs
import { Link } from 'react-router-dom'
// React
import { ReactNode } from 'react'

const StyledPaper = styled(Paper)((/*{theme}*/) => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 100px)',
    width: '85%'
}))

const StyledTypography = styled(Typography)(() => ({
    position: 'relative',
    top: '120px',
    display: 'block',
    width: '100%',
    textAlign: 'center'
}))

type Link = {
    path: string
    text: string
    label: string
}

type Props = {
    children?: ReactNode
    title: string
    caption: string
    max_width?: number
    link?: Link
}

export const PageCard = ({ children, title = 'Title', caption = 'Caption', max_width = 500, link }: Props) => {
    return (
        <>
            <StyledPaper sx={{ maxWidth: max_width, padding: 3 }}>
                <Stack sx={{ paddingBottom: 3 }}>
                    <Typography variant={'subtitle1'}>{title}</Typography>

                    <Typography variant={'caption'}>{caption}</Typography>
                </Stack>

                <Box>{children}</Box>
            </StyledPaper>

            {link && (
                <StyledTypography variant={'caption'} color={'text.secondary'}>
                    {link.text}{' '}
                    <Link to={link.path}>
                        <strong>{link.label}</strong>
                    </Link>
                </StyledTypography>
            )}
        </>
    )
}
