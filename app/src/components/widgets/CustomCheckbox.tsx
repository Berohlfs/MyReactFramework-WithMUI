// MUI
import { FormControlLabel, Checkbox } from '@mui/material'
// Libs
import { Controller, Control } from 'react-hook-form'

type Props = {
    control: Control<any, any>,
    label: string,
    name: string,
}

export const CustomCheckbox = ({ control, label, name }: Props)=> {

    return(

        <Controller name={name} control={control}
            render={({field: {value, ...other}}) => (

            <FormControlLabel
                control={<Checkbox {...other} value={Boolean(value)} checked={Boolean(value)}/>}
                label={label}
            />)}
        />

    )
}
