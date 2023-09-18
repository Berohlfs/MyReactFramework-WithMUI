// React hooks
import { useContext, useState } from 'react'
import { AuthLayoutContext } from './AuthLayout'
// MUI
import { Logout, HomeOutlined, MenuOutlined, PersonRounded } from '@mui/icons-material'
import { Box, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button,
        Typography, Paper, Breadcrumbs, Tooltip, IconButton, Drawer } from '@mui/material'
// Libs
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
// Components
import Modal from '../../components/Modal'

import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Settings from '@mui/icons-material/Settings'

const Static = ()=> {

    // Método de navegação
    const navigate = useNavigate()

    // Estado do menu (aberto ou fechado?)
    const [menu_opened, setMenuOpened] = useState(false)

    // Estado do modal de logout (aberto ou fechado?)
    const [logout_modal_open, setLogoutModalOpen] = useState(false)

    // Breadcrumbs - AuthContext
    const {breadcrumbs} = useContext(AuthLayoutContext)

    // Espelho da estrutura do menu lateral
    const navigation = [
        [
            {title: 'Page 01', icon: HomeOutlined, path: '/home'},
        ],
        [
            {title: 'Page 02', icon: HomeOutlined, path: '/home'},
            {title: 'Page 03', icon: HomeOutlined, path: '/home'}
        ]
    ]

    // Handle logout
    const logout = ()=> {
        sessionStorage.clear()
        navigate('/')
        toast.success('Logout realizado com sucesso', {toastId: 'success-logout'})
    }

    // Estilização do cabeçalho
    const header_style = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 3
    }

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (<>

        <Paper square sx={header_style}>

            <Stack
                height={55}
                direction={'row'}
                paddingX={2}
                alignItems={'center'}
                justifyContent={'space-between'}>

                <Stack
                    direction={'row'}
                    spacing={2} alignItems={'center'}>

                    <Tooltip>
                        <IconButton
                            onClick={handleClick}
                            size="small">
                            <Avatar
                                sx={{ width: 32, height: 32}}>
                                <PersonRounded/>
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        onClick={handleClose}>

                        <MenuItem
                        onClick={()=>{handleClose; setLogoutModalOpen(true)}}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Sair desta conta
                        </MenuItem>
                    </Menu>

                    <Breadcrumbs>

                        {breadcrumbs.map((item)=>(

                        <Link
                            key={`${item.link}-${item.text}`}
                            to={item.link}
                            style={{textDecoration: 'none'}}>
                                <Typography fontSize={12}>
                                    {item.text}
                                </Typography>
                        </Link>

                        ))}

                    </Breadcrumbs>

                </Stack>

                <Tooltip title="Menu">
                    <IconButton onClick={()=>setMenuOpened(true)}>
                        <MenuOutlined/>
                    </IconButton>
                </Tooltip>

            </Stack>

        </Paper>

        <Drawer
            anchor={'right'}
            open={menu_opened}
            onClose={()=>setMenuOpened(false)}>

            <Stack sx={{ width: 250 }} px={2}>

                {navigation.map((group, group_index)=>(

                <Box key={group_index}>

                    <List>

                        {group.map((item, item_index)=>(

                        <ListItem disablePadding key={item_index}>

                            <ListItemButton onClick={()=>navigate(item.path)}>

                                <ListItemIcon>
                                    <item.icon/>
                                </ListItemIcon>

                                <ListItemText primary={item.title}/>

                            </ListItemButton>

                        </ListItem>

                        ))}

                    </List>

                    <Divider/>

                </Box>

                ))}

            </Stack>

        </Drawer>

        <Modal
            open={logout_modal_open}
            handleClose={()=>setLogoutModalOpen(false)}
            title={'Deseja sair?'}
            max_width={300}>

            <Typography variant={'caption'}>
                Será necessário efetuar o login novamente.
            </Typography>

            <Stack direction={'row'} spacing={1} mt={2}>
                <Button
                    fullWidth
                    onClick={()=>setLogoutModalOpen(false)}>
                        Cancelar
                </Button>
                <Button
                    fullWidth
                    onClick={logout}
                    color={'error'}>
                        Sair
                </Button>
            </Stack>

        </Modal>

    </>)
}

export default Static
