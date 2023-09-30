// https://mui.com/material-ui/customization/color/

// MUI
import { deepPurple, amber, green } from '@mui/material/colors'
import { PaletteMode, PaletteOptions } from '@mui/material'

export const palette = (mode: PaletteMode): PaletteOptions => ({

    mode,

    ...(mode === 'light' ?

        {
            primary: {
                main: deepPurple[500],
            },
            background: {
                default: '#f7efff',
                paper: '#ffffff'
            }
        } :

        {
            primary: {
                main: deepPurple[500]
            },
            background: {
                default: '#13111c',
                paper: '#221f2d'
            },
            text: {
                primary: '#ffffff'
            }
        })

})
