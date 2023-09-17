// https://mui.com/material-ui/customization/color/

// MUI
import { deepPurple, amber } from '@mui/material/colors'

const palette = ()=> {
    return({
        primary: {
            main: deepPurple[400],
            light: deepPurple[50],
            contrastText: '#ffffff',
            dark: deepPurple[600]
        },
        secondary: {
            main: amber[400],
            light: amber[100],
            contrastText: '#ffffff',
            dark: amber[600]
        },
    })
}

export default palette
