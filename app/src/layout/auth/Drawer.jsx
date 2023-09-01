// React hooks
import { useContext, useState } from 'react'
import { AuthLayoutContext } from './AuthLayout'
// MUI
import MuiDrawer from '@mui/material/Drawer'
import { Box, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
// Libs
import { useNavigate } from 'react-router-dom'
// Components
import Modal from '../../components/Modal'

const Drawer = ()=> {

    const {drawer_opened, setDrawerOpened} = useContext(AuthLayoutContext)

    const [logout_modal_open, setLogoutModalOpen] = useState(false)

    const navigate = useNavigate()

    const navigation = [
        [
            {title: 'Page 01', icon: HomeOutlinedIcon, path: '/home'},
        ],
        [
            {title: 'Page 02', icon: HomeOutlinedIcon, path: '/home'},
            {title: 'Page 03', icon: HomeOutlinedIcon, path: '/home'}
        ]
    ]

    const logout = ()=> {
        sessionStorage.clear()
        navigate('/')
    }

    return (<>

        <MuiDrawer
            anchor={'right'}
            open={drawer_opened}
            onClose={()=>setDrawerOpened(false)}>

            <Stack sx={{ width: 250 }} p={1}>

                {navigation.map((group, group_index)=>(

                <Box key={group_index}>

                    <List>

                        {group.map((item, item_index)=>(

                        <ListItem disablePadding key={item_index}>

                            <ListItemButton onClick={()=>navigate(item.path)}>

                                <ListItemIcon><item.icon/></ListItemIcon>

                                <ListItemText primary={item.title}/>

                            </ListItemButton>

                        </ListItem>

                        ))}

                    </List>

                    <Divider/>

                </Box>

                ))}

                <Button
                    sx={{mt: 2}}
                    onClick={()=>setLogoutModalOpen(true)}
                    endIcon={<LogoutIcon/>}>
                        Sair
                </Button>

            </Stack>

        </MuiDrawer>

        <Modal
            open={logout_modal_open}
            handleClose={()=>setLogoutModalOpen(false)}
            title={'Deseja sair?'}
            max_width={300}>

                <Typography variant={'caption'}>
                    Será necessário efetuar o login novamente.
                </Typography>

                <Stack direction={'row'} spacing={1} mt={2}>
                    <Button fullWidth onClick={()=>setLogoutModalOpen(false)}>Cancelar</Button>
                    <Button fullWidth onClick={logout} color={'error'}>Sair</Button>
                </Stack>

        </Modal>

    </>)
}

export default Drawer
