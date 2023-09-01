import { deepPurple, amber } from '@mui/material/colors' // https://mui.com/material-ui/customization/color/

const palette = ()=> {
    return({
        primary: {
            main: deepPurple[500],
            light: deepPurple[200],
            contrastText: '#ffffff',
            dark: deepPurple[600]
        },
        secondary: {
            main: amber[400],
            light: amber[200],
            contrastText: '#ffffff',
            dark: amber[600]
        },
    })
}

export default palette
