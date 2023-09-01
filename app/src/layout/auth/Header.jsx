// React hooks
import { useContext } from 'react'
import { AuthLayoutContext } from './AuthLayout'
// Libs
import { Link } from 'react-router-dom'
// MUI
import { Paper, Stack, Tooltip, IconButton, Breadcrumbs, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import FaceIcon from '@mui/icons-material/Face'

const Drawer = ()=> {

    const {setDrawerOpened, breadcrumbs} = useContext(AuthLayoutContext)

    const header_style = {
        position: 'fixed',
        top: 0,
        width: '100%',
        left: 0,
        zIndex: 3
    }

    const link_style = {
        textDecoration: 'none'
    }

    return (
        <Paper square sx={header_style}>

            <Stack height={55} direction={'row'} paddingX={2} alignItems={'center'} justifyContent={'space-between'}>

                <Stack direction={'row'} spacing={2} alignItems={'center'}>

                    <FaceIcon color={'primary'}/>

                    <Breadcrumbs>

                    {breadcrumbs.map((item)=>(

                        <Link
                            style={link_style}
                            key={`${item.link}-${item.text}`}
                            to={item.link}>
                                <Typography fontSize={12}>{item.text}</Typography>
                        </Link>

                    ))}

                    </Breadcrumbs>

                </Stack>

                <Tooltip title="Menu">
                    <IconButton onClick={()=>setDrawerOpened(true)}>
                        <MenuOutlinedIcon/>
                    </IconButton>
                </Tooltip>

            </Stack>

        </Paper>
    )
}

export default Drawer
