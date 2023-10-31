// React
import { useState, MouseEvent, useContext } from 'react'
import { AppContext } from '../../App'
// MUI
import { Logout, PersonRounded, ModeNightOutlined, LightModeOutlined, HolidayVillageOutlined, PersonPinCircleOutlined, Groups2Outlined, ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Box, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, Typography, Paper, Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
// Libs
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
// Components
import { Modal } from '../../components/containers/Modal'
// Images
import logo from '../../images/logo.webp'

const StyledHeader = styled(Paper)(({/*theme*/}) => ({
    position: 'fixed',
    top: 0,
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
    height: '100%',
    transition: '0.2s',
    width: 250,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    '&.closed': {
        width: '55px'
    }
}))

const Escape = styled(Box)(() => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: '0.4',
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
            {title: 'Characters', icon: Groups2Outlined, path: '/characters'},
            {title: 'Houses', icon: HolidayVillageOutlined, path: '/characters'},
        ],
        [
            {title: 'Death Eaters', icon: PersonPinCircleOutlined, path: '/characters'},
        ]
    ]

    // Handle logout
    const logout = ()=> {
        Cookies.remove('access')
        navigate('/')
        toast('Logged out.')
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
                paddingX={1}
                alignItems={'center'}>

                <Tooltip title={'Avatar'}>
                    <IconButton onClick={handleAvatarClick} size={'small'}>
                        <Avatar sx={{width: 32, height: 32}}>
                            <PersonRounded/>
                        </Avatar>
                    </IconButton>
                </Tooltip>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleAvatarMenuClose}>

                    <MenuItem onClick={()=>setDarkMode((state)=>!state)}>
                        <ListItemIcon>
                            {dark_mode ?
                            <LightModeOutlined fontSize={'small'}/> :
                            <ModeNightOutlined fontSize={'small'}/>}
                        </ListItemIcon>
                        Switch theme
                    </MenuItem>

                    <Divider/>

                    <MenuItem onClick={()=>{setLogoutModalOpen(true)}}>
                        <ListItemIcon>
                            <Logout fontSize={"small"}/>
                        </ListItemIcon>
                        Log out
                    </MenuItem>

                </Menu>

            </Stack>
        </StyledHeader>

        <StyledMenu className={menu_opened ? '' : 'closed'}>

            <Stack p={'6px'} alignItems={'flex-start'}>
                <Tooltip title={'Menu'}>
                    <IconButton
                        onClick={()=>setMenuOpened(!menu_opened)}>
                        { menu_opened ?
                            <ArrowForwardIos fontSize={'small'}/> :
                            <ArrowBackIosNew fontSize={'small'}/> }
                    </IconButton>
                </Tooltip>
            </Stack>

            <Stack>

                <img
                    src={logo}
                    alt={'logo'}
                    style={{width: 25, display: 'block', margin: '15px auto'}}/>

                {navigation.map((group, group_index)=>(

                <Box key={group_index}>

                    <List>

                        {group.map((item, item_index)=>(

                        <ListItem disablePadding key={item_index}>

                            <ListItemButton onClick={()=> navigate(item.path)}>

                                <ListItemIcon>
                                    <item.icon sx={{ width: 20 }}/>
                                </ListItemIcon>

                                <ListItemText
                                    secondary={item.title}
                                    secondaryTypographyProps={{
                                        variant: 'caption',
                                        style: {whiteSpace: 'nowrap'}
                                    }}/>

                            </ListItemButton>

                        </ListItem>

                        ))}

                    </List>

                    <Divider sx={{mx:2}}/>

                </Box>

                ))}

            </Stack>
        </StyledMenu>

        { menu_opened && <Escape onClick={()=>setMenuOpened(false)}/> }

        <Modal
            open={logout_modal_open}
            handleClose={()=>setLogoutModalOpen(false)}
            title={'Logout?'}
            max_width={300}>

            <Typography variant={'caption'}>
                Você terá que realizar o login novamente.
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
                        Log out
                </Button>
            </Stack>

        </Modal>

    </>)
}
