// MUI
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, IconButton } from '@mui/material'

const PasswordAdornment = ({visible, setVisible})=> {

    return (
        <InputAdornment position={'end'}>

            <IconButton
                size={'small'}
                onClick={()=>setVisible(!visible)}
                edge={'end'}>

                {visible ?

                <Visibility sx={{width: 18, height: 18}}/> :

                <VisibilityOff sx={{width: 18, height: 18}}/> }

            </IconButton>

        </InputAdornment>
    )
}

export default PasswordAdornment
