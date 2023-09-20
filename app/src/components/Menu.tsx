// React hooks
import { useState } from 'react'
// MUI
import MuiMenu from '@mui/material/Menu'
import { IconButton, MenuItem } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

const Menu = ({hidden_actions, param})=> {

  // mMenu's anchor
  const [anchorEl, setAnchorEl] = useState(null)

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size={'small'} onClick={handleIconClick}>

        <MoreHoriz fontSize={'11px'}/>

      </IconButton>

      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}>

        {hidden_actions.map((action) => (

          <MenuItem
            key={action.name}
            onClick={()=> action.function(param)}>

              {action.name}

          </MenuItem>

        ))}

      </MuiMenu>
    </>
  )
}

export default Menu
