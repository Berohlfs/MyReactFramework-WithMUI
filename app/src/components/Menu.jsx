import { useState } from 'react'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

const options = [
  'None',
  'Atria',
  'Callisto'
]

const LongMenu = ({hidden_actions, param})=> {

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size={'small'} onClick={handleClick}>

        <MoreHoriz fontSize={'11px'}/>

      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}>

        {hidden_actions.map((action) => (

          <MenuItem
            key={action.name}
            onClick={()=>{handleClose(); action.function(param)}}>

            <Typography variant={'caption'}>
                {action.name}
            </Typography>

          </MenuItem>

        ))}

      </Menu>
    </>
  )
}

export default LongMenu
