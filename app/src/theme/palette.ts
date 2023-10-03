// https://mui.com/material-ui/customization/color/

// MUI
import { deepPurple, amber, red } from '@mui/material/colors'
import { PaletteMode, PaletteOptions } from '@mui/material'

export const palette = (mode: PaletteMode): PaletteOptions => ({

    mode,

    ...(mode === 'light' ?

        {
            primary: {
                main: deepPurple[500],
                light: deepPurple[50]
            },
            secondary: {
                main: amber[900],
            },
            background: {
                default: '#fff',
                paper: '#fff'
            },
            error: {
                main: red[700],
            },
            divider: '#f2f1f3'
        } :

        {
            primary: {
                main: deepPurple[600],
            },
            secondary: {
                main: amber[700]
            },
            background: {
                default: '#13111c',
                paper: '#13111c'
            },
            error: {
                main: red[800],
                dark: red[900],
            },
            divider: '#211f2d'
        })

})
