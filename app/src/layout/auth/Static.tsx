// React
import { useState, MouseEvent, useContext } from 'react'
import { AppContext } from '../../App'
// MUI
import { Logout, HomeOutlined, MenuOutlined, PersonRounded, ModeNightOutlined, LightModeOutlined } from '@mui/icons-material'
import { Box, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Typography, Paper, Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
// Libs
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
// Components
import { Modal } from '../../components/containers/Modal'

const StyledHeader = styled(Paper)(({theme}) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 3,
    borderRadius: 0,
    borderLeft: '0px',
    borderRight: '0px',
}))

const StyledMenu = styled(Paper)(() => ({
    position: 'fixed',
    zIndex: 5,
    top: 0,
    right: 0,
    height: 'calc(100% - 20px)',
    margin: 10,
    transition: '0.2s',
    '&.closed': {
        right: '-300px'
    }
}))

const Escape = styled(Box)(() => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#0000004e',
    zIndex: 4
}))

export const Static = ()=> {

    const navigate = useNavigate()

    const [menu_opened, setMenuOpened] = useState(false)

    const [logout_modal_open, setLogoutModalOpen] = useState(false)

    const {setDarkMode, dark_mode} = useContext(AppContext)!

    // Menu mirror
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
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
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

                    <Tooltip title={'Avatar'}>
                        <IconButton
                            onClick={handleAvatarClick}
                            size="small">
                            <Avatar
                                sx={{width: 32, height: 32}}>
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

                <Stack
                    direction={'row'}
                    spacing={2}
                    alignItems={'center'}>

                    <Tooltip title="Menu">
                        <IconButton onClick={()=>setMenuOpened(true)}>
                            <MenuOutlined/>
                        </IconButton>
                    </Tooltip>

                </Stack>

            </Stack>
        </StyledHeader>

        <StyledMenu className={menu_opened ? '' : 'closed'}>
            <Stack sx={{ width: 250 }}>

                {navigation.map((group, group_index)=>(

                <Box key={group_index}>

                    <List>

                        {group.map((item, item_index)=>(

                        <ListItem disablePadding key={item_index}>

                            <ListItemButton onClick={()=>navigate(item.path)}>

                                <ListItemIcon>
                                    <item.icon sx={{width: 20, pr: 0}}/>
                                </ListItemIcon>

                                <ListItemText secondary={item.title}/>

                            </ListItemButton>

                        </ListItem>

                        ))}

                    </List>

                    <Divider sx={{mx:2}}/>

                </Box>

                ))}

                <Button
                    variant={'outlined'}
                    sx={{m: 2}}
                    onClick={()=>setDarkMode((state)=>!state)}
                    endIcon={dark_mode ? <LightModeOutlined/> : <ModeNightOutlined/>}>
                        Switch theme
                </Button>

            </Stack>
        </StyledMenu>

        { menu_opened && <Escape onClick={()=>setMenuOpened(false)}/> }

        <Modal
            open={logout_modal_open}
            handleClose={()=>setLogoutModalOpen(false)}
            title={'Logout?'}
            max_width={300}>

            <Typography variant={'caption'}>
                You'll have to login again later.
            </Typography>

            <Stack direction={'row'} spacing={1} mt={2}>
                <Button
                    fullWidth
                    onClick={()=>setLogoutModalOpen(false)}>
                        Cancel
                </Button>
                <Button
                    fullWidth
                    onClick={logout}
                    color={'error'}>
                        Logout
                </Button>
            </Stack>

        </Modal>

    </>)
}
