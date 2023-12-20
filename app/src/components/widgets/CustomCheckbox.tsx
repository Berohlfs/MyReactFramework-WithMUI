// MUI
import { FormControlLabel, Checkbox } from '@mui/material'
// Libs
import { Controller, Control, FieldError } from 'react-hook-form'

type Props = {
    control: Control<any, any>
    label: string
    name: string
    form_control_error: FieldError | undefined
}

export const CustomCheckbox = ({ control, label, name, form_control_error }: Props) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, ...other } }) => (
                <FormControlLabel
                    control={<Checkbox {...other} value={Boolean(value)} checked={Boolean(value)} />}
                    label={label + (form_control_error ? ' ~ missing default value ~' : '')}
                />
            )}
        />
    )
}
