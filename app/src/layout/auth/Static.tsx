// React
import { useState, MouseEvent, useContext, FC } from 'react'
import { AppContext } from '../../App'
// MUI
import { styled } from '@mui/material/styles'
import {
    Logout,
    PersonRounded,
    ModeNightOutlined,
    LightModeOutlined,
    ListOutlined,
    ArrowBackIosNew,
    ArrowForwardIos
} from '@mui/icons-material'
import {
    Box,
    Stack,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Typography,
    Paper,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem
} from '@mui/material'
// Libs
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'sonner'
// Components
import { Modal } from '../../components/containers/Modal'
// Images
import logo from '../../images/logo.webp'

const StyledHeader = styled(Paper)((/*{theme}*/) => ({
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 3,
    borderRadius: 0,
    borderLeft: '0px',
    borderRight: '0px'
}))

const StyledNavigation = styled(Paper)(() => ({
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

export const Static = () => {
    const navigate = useNavigate()

    const [navigation_opened, setNavigationOpened] = useState(false)

    const [logout_modal_open, setLogoutModalOpen] = useState(false)

    const { setDarkMode, dark_mode } = useContext(AppContext)!

    const navigation: { title: string; icon: FC<{ sx: { width: number } }>; path: string }[][] = [
        [
            { title: 'Lista de poções', icon: ListOutlined, path: '/potions' },
            { title: 'Lista de poções', icon: ListOutlined, path: '/potions' }
        ],
        [{ title: 'Lista de poções', icon: ListOutlined, path: '/potions' }]
    ]

    const menu: { title: string; icon: FC<{ fontSize: 'small' }>; function: () => void }[][] = [
        [
            {
                title: 'Trocar tema',
                icon: dark_mode ? LightModeOutlined : ModeNightOutlined,
                function: () => setDarkMode((state) => !state)
            },
        ],
        [{ title: 'Sair', icon: Logout, function: () => setLogoutModalOpen(true) }]
    ]

    const logout = () => {
        Cookies.remove('access')
        navigate('/')
        toast.success('Logout realizado com sucesso.', { id: 'logout' })
    }

    // Avatar's menu anchor
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const handleAvatarClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleAvatarMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <StyledHeader>
                <Stack height={55} direction={'row'} paddingX={1} alignItems={'center'}>
                    <Tooltip title={'Avatar'}>
                        <IconButton onClick={handleAvatarClick} size={'small'}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                                <PersonRounded />
                            </Avatar>
                        </IconButton>
                    </Tooltip>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleAvatarMenuClose}>
                        {menu.map((group, group_index) => (
                            <Box key={group_index}>
                                {group.map((item, item_index) => (
                                    <MenuItem key={item_index} onClick={item.function}>
                                        <ListItemIcon>
                                            <item.icon fontSize={'small'} />
                                        </ListItemIcon>
                                        {item.title}
                                    </MenuItem>
                                ))}

                                {group_index + 1 !== menu.length  && <Divider />}
                            </Box>
                        ))}
                    </Menu>
                </Stack>
            </StyledHeader>

            <StyledNavigation className={navigation_opened ? '' : 'closed'}>
                <Stack padding={1} alignItems={'flex-start'}>
                    <Tooltip title={'Menu'}>
                        <IconButton onClick={() => setNavigationOpened(!navigation_opened)}>
                            {navigation_opened ? (
                                <ArrowForwardIos fontSize={'small'} />
                            ) : (
                                <ArrowBackIosNew fontSize={'small'} />
                            )}
                        </IconButton>
                    </Tooltip>
                </Stack>

                <Stack>
                    <img
                        src={logo}
                        alt={'logo'}
                        style={{ width: 25, display: 'block', margin: '15px auto' }} />

                    {navigation.map((group, group_index) => (
                        <Box key={group_index}>
                            <List>
                                {group.map((item, item_index) => (
                                    <ListItem disablePadding key={item_index}>
                                        <ListItemButton onClick={() => navigate(item.path)}>
                                            <ListItemIcon>
                                                <item.icon sx={{ width: 20 }} />
                                            </ListItemIcon>

                                            <ListItemText
                                                secondary={item.title}
                                                secondaryTypographyProps={{
                                                    variant: 'caption',
                                                    style: { whiteSpace: 'nowrap' }
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>

                            <Divider sx={{ mx: 2 }} />
                        </Box>
                    ))}
                </Stack>
            </StyledNavigation>

            {navigation_opened && <Escape onClick={() => setNavigationOpened(false)} />}

            <Modal
                open={logout_modal_open}
                handleClose={() => setLogoutModalOpen(false)}
                title={'Deseja sair?'}
                max_width={300}>
                <Typography variant={'caption'}>Você terá que realizar o login novamente.</Typography>

                <Stack direction={'row'} spacing={1} mt={2}>
                    <Button fullWidth onClick={() => setLogoutModalOpen(false)}>
                        Cancelar
                    </Button>
                    <Button fullWidth onClick={logout} color={'error'}>
                        Sair
                    </Button>
                </Stack>
            </Modal>
        </>
    )
}
