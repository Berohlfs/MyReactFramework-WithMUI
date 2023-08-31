// React hooks
import { useContext } from 'react'
import { AuthLayoutContext } from './AuthLayout'
// MUI
import { Paper, Stack, Tooltip, IconButton } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

const Drawer = ()=> {

    const {setDrawerOpened} = useContext(AuthLayoutContext)

    return (
        <Paper square>

            <Stack direction={'row'} p={1}>

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
