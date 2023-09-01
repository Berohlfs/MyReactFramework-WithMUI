// React hooks
import { useContext } from 'react'
import { AuthLayoutContext } from './AuthLayout'
// Libs
import { Link } from 'react-router-dom'
// MUI
import { Paper, Stack, Tooltip, IconButton, Breadcrumbs } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

const Drawer = ()=> {

    const {setDrawerOpened, breadcrumbs} = useContext(AuthLayoutContext)

    const header_style = {
        position: 'fixed',
        top: 0,
        width: '100%',
        left: 0,
        height: 55,
        zIndex: 3
    }

    const link_style = {
        textDecoration: 'none'
    }

    return (
        <Paper square sx={header_style}>

            <Stack direction={'row'} p={1} spacing={1} alignItems={'center'}>

                <Tooltip title="Menu">
                    <IconButton onClick={()=>setDrawerOpened(true)}>
                        <MenuOutlinedIcon/>
                    </IconButton>
                </Tooltip>

                <Breadcrumbs>

                {breadcrumbs.map((item)=>(

                    <Link
                        style={link_style}
                        key={`${item.link}-${item.text}`}
                        to={item.link}>
                            {item.text}
                    </Link>

                ))}

                </Breadcrumbs>

            </Stack>

        </Paper>
    )
}

export default Drawer
