// React hooks
import { useContext } from 'react'
import { AuthLayoutContext } from './AuthLayout'
// MUI
import MuiDrawer from '@mui/material/Drawer'
import { Box, Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
// Libs
import { useNavigate } from 'react-router-dom'

const Drawer = ()=> {

    const {drawer_opened, setDrawerOpened} = useContext(AuthLayoutContext)

    const navigate = useNavigate()

    const navigation = [
        [
            {title: 'Home', icon: HomeOutlinedIcon, path: '/home'},
        ],
        [
            {title: 'Home', icon: HomeOutlinedIcon, path: '/home'},
            {title: 'Home', icon: HomeOutlinedIcon, path: '/home'}
        ]
    ]

    return (
        <MuiDrawer
            anchor={'left'}
            open={drawer_opened}
            onClose={()=>setDrawerOpened(false)}>

            <Stack sx={{ width: 250 }}>

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

            </Stack>

      </MuiDrawer>
    )
}

export default Drawer
