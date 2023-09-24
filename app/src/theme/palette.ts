// https://mui.com/material-ui/customization/color/

// MUI
import { deepPurple, amber, green } from '@mui/material/colors'

const palette = {
    
    primary: {
        main: deepPurple[500],
        light: deepPurple[50],
        contrastText: '#ffffff',
        dark: deepPurple[600]
    },
    secondary: {
        main: amber[600],
        light: amber[100],
        contrastText: '#ffffff',
        dark: amber[600]
    },
    success: {
        main: green[500]
    }

}

export default palette
