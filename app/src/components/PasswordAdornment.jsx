// MUI
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, IconButton } from '@mui/material'

const PasswordAdornment = ({state, setState})=> {

    return (
        <InputAdornment position={'end'}>
            <IconButton
                size={'small'}
                onClick={()=>setState(!state)}
                edge={'end'}>

                {!state ?

                <VisibilityOff sx={{width: 18, height: 18}}/> :

                <Visibility sx={{width: 18, height: 18}}/>}

            </IconButton>
        </InputAdornment>
    )
}

export default PasswordAdornment
