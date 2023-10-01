// https://mui.com/material-ui/customization/color/

// MUI
import { deepPurple, amber, green, blueGrey } from '@mui/material/colors'
import { PaletteMode, PaletteOptions } from '@mui/material'

export const palette = (mode: PaletteMode): PaletteOptions => ({

    mode,

    ...(mode === 'light' ?

        {
            primary: {
                main: deepPurple[500],
            },
            info: {
                main: '#f2f1f3'
            },
            background: {
                default: '#fff',
                paper: '#fff'
            }
        } :

        {
            primary: {
                main: deepPurple[500],
            },
            info: {
                main: '#211f2d'
            },
            background: {
                default: '#13111c',
                paper: '#13111c'
            },
            text: {
                primary: '#ffffff'
            }
        })

})
