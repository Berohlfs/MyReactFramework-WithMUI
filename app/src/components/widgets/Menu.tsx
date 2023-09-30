// React
import { useState, MouseEvent } from 'react'
// MUI
import MuiMenu from '@mui/material/Menu'
import { IconButton, MenuItem } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

type HiddenAction = {
  name: string,
  function: (id: string)=> void
}

type Props = {
  hidden_actions: HiddenAction[],
  id: string
}

export const Menu = ({hidden_actions, id}: Props)=> {

  // mMenu's anchor
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleIconClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size={'small'} onClick={handleIconClick}>

        <MoreHoriz fontSize={'small'}/>

      </IconButton>

      <MuiMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}>

        {hidden_actions.map((action) => (

          <MenuItem
            key={action.name}
            onClick={()=> action.function(id)}>

              {action.name}

          </MenuItem>

        ))}

      </MuiMenu>
    </>
  )
}
