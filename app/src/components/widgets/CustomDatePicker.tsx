// MUI
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// Libs
import { Controller, Control } from 'react-hook-form'

type Props = {
    control: Control<any, any>,
    label: string,
    name: string,
    width?: number
}

export const CustomDatePicker = ({ control, label, name, width }: Props)=> {

    return(

        <Controller name={name} control={control}
            render={({field, fieldState: {error}}) => (

                <DatePicker
                    {...field}
                    sx={{width: width}}
                    label={label}
                    slotProps={{
                        textField: {
                            error: error ? true : false,
                            helperText: error?.message
                        }
                    }}/>

                )}
            />

    )
}
