// React hooks
import { useContext } from 'react'
import { AuthLayoutContext } from './AuthLayout'
// MUI
import { Paper, Stack, Tooltip, IconButton } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

const Drawer = ()=> {

    const {setDrawerOpened} = useContext(AuthLayoutContext)

    const header_style = {
        position: 'fixed',
        top: 0,
        width: '100%',
        left: 0,
        height: 55,
        zIndex: 3
    }

    return (
        <Paper square sx={header_style}>

            <Stack direction={'row'} p={1} alignItems={'center'}>

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
