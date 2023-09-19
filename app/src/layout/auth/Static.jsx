// React hooks
import { useContext, useState } from 'react'
import { AuthLayoutContext } from './AuthLayout'
// MUI
import { Logout, HomeOutlined, MenuOutlined, PersonRounded } from '@mui/icons-material'
import { Box, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Typography, Paper, Breadcrumbs, Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
// Libs
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
// Components
import Modal from '../../components/Modal'

const StyledHeader = styled(Paper)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 3
}))

const StyledMenu = styled(Paper)(({ theme }) => ({
    position: 'fixed',
    zIndex: 5,
    top: 0,
    right: 0,
    height: '100%',
    transition: '2',
    '&.closed': {
        right: '-300px'
    }
}))

const Escape = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#0000004e',
    zIndex: 4
}))

const Static = ()=> {

    const navigate = useNavigate()

    const [menu_opened, setMenuOpened] = useState(false)

    const [logout_modal_open, setLogoutModalOpen] = useState(false)

    const {breadcrumbs} = useContext(AuthLayoutContext)

    // Espelho do menu lateral
    const navigation = [
        [
            {title: 'Page 01', icon: HomeOutlined, path: '/characters'},
        ],
        [
            {title: 'Page 02', icon: HomeOutlined, path: '/characters'},
            {title: 'Page 03', icon: HomeOutlined, path: '/characters'}
        ]
    ]

    // Handle logout
    const logout = ()=> {
        Cookies.remove('access')
        navigate('/')
        toast.success('Logout realizado com sucesso', {toastId: 'success-logout'})
    }

    // Avatar's menu anchor
    const [anchorEl, setAnchorEl] = useState(null)

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleAvatarMenuClose = () => {
        setAnchorEl(null)
    }

    return (<>

        <StyledHeader square>
            <Stack
                height={55}
                direction={'row'}
                paddingX={2}
                alignItems={'center'}
                justifyContent={'space-between'}>

                <Stack
                    direction={'row'}
                    spacing={2}
                    alignItems={'center'}>

                    <Tooltip>
                        <IconButton
                            onClick={handleAvatarClick}
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
                        onClose={handleAvatarMenuClose}
                        onClick={handleAvatarMenuClose}>

                        <MenuItem onClick={()=>{setLogoutModalOpen(true)}}>

                            <ListItemIcon>
                                <Logout fontSize="small"/>
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
        </StyledHeader>

        <StyledMenu className={menu_opened ? '' : 'closed'}>
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
        </StyledMenu>

        { menu_opened && <Escape onClick={()=>setMenuOpened(false)}/> }

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
