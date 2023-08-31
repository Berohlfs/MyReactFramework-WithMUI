// MUI
import { Typography, Stack, Paper, Box } from '@mui/material'
// Imagens
import logo from '../images/logo.png'
// Libs
import { styled } from '@mui/material/styles'
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
    backgroundColor: '#eee',
    '&>img': {
        width: 40
    }
}))

const OutsideLink = styled(Typography)(({ theme }) => ({
    position: 'relative',
    top: '120px',
    display: 'block',
    width: '100%',
    textAlign: 'center',
}))

const PageCard = ({children, title = 'Title', caption = 'Caption', max_width = 500, link})=> {

    return(<>

        <StyledPaper sx={{maxWidth: max_width}}>

            <Stack sx={{
                backgroundColor: 'primary.light',
                padding: '20px 20px 35px',
                marginBottom: '35px'}}>

                <Typography
                    variant={'subtitle1'}
                    color={'primary.contrastText'}>
                        {title}
                </Typography>

                <Typography
                    variant={'caption'}
                    color={'primary.contrastText'}>
                        {caption}
                </Typography>

                <LogoStack
                    alignItems={'center'}
                    justifyContent={'center'}>

                    <img src={logo} alt={'Webimob'}/>

                </LogoStack>

            </Stack>

            <Box padding={2}>

                {children}

            </Box>

        </StyledPaper>

        {link &&

        <OutsideLink variant={'caption'}>
            {link.text}{' '}
            <Link to={link.path}><strong>{link.label}</strong></Link>
        </OutsideLink>

        }

    </>)
}

export default PageCard
