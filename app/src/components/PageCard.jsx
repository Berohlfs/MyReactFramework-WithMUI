// MUI
import { Typography, Stack, Paper, Box } from '@mui/material'
import { Face } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
// Libs
import { Link } from 'react-router-dom'

const StyledPaper = styled(Paper)(({ theme }) => ({
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 100px)',
    width: '85%',
    overflow: 'hidden'
}))

const LogoStack = styled(Stack)(({ theme }) => ({
    height: '60px',
    width: '60px',
    borderRadius: '50%',
    position: 'absolute',
    top: '80px',
    left: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 0 0.2em #ccc'
}))

const OutsideLink = styled(Typography)(({ theme }) => ({
    position: 'relative',
    top: '120px',
    display: 'block',
    width: '100%',
    textAlign: 'center',
}))

const PageCard = ({
    children,
    title = 'Title',
    caption = 'Caption',
    max_width = 500,
    link
}) => {

    return(<>

        <StyledPaper sx={{maxWidth: max_width}}>

            <Stack sx={{
                backgroundColor: 'primary.light',
                padding: '20px 20px 40px',
                marginBottom: '35px'}}>

                <Typography
                    variant={'subtitle1'}
                    color={'primary.main'}>
                        {title}
                </Typography>

                <Typography
                    variant={'caption'}
                    color={'primary.main'}>
                        {caption}
                </Typography>

                <LogoStack
                    alignItems={'center'}
                    justifyContent={'center'}>

                    <Face color={'primary'}/>

                </LogoStack>

            </Stack>

            <Box padding={2}>

                {children}

            </Box>

        </StyledPaper>

        {link &&

        <OutsideLink variant={'caption'}>

            {link.text}
            {' '}
            <Link to={link.path}><strong>{link.label}</strong></Link>

        </OutsideLink> }

    </>)
}

export default PageCard
