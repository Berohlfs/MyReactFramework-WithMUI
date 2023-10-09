// MUI
import { FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
// Libs
import { Controller, FieldError, Control } from 'react-hook-form'

type Option = {
    value: string,
    label: string
}

type Props = {
    control: Control<any, any>,
    form_control_error: FieldError | undefined,
    label: string,
    name: string,
    options: Option[],
    row?: boolean
}

export const CustomRadioGroup = ({ control, form_control_error, label, name, options, row = true}: Props)=> {

    return(

        <FormControl>

            <FormLabel error={form_control_error && true}>
                {label}{form_control_error && ` - ${form_control_error?.message}`}
            </FormLabel>

            <Controller name={name} control={control}
                render={({field}) => (
                <RadioGroup
                    row={row}
                    {...field}>

                    {options.map((option) => (

                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio/>}
                        label={option.label}/>

                    ))}

                </RadioGroup> )}/>

        </FormControl>

    )
}
