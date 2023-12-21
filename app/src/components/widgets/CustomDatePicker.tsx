// MUI
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// Libs
import { Controller, Control } from 'react-hook-form'
import dayjs from 'dayjs'

type Props = {
    control: Control<any, any>
    label: string
    name: string
    width?: number
}

export const CustomDatePicker = ({ control, label, name, width = 180 }: Props) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, ...other }, fieldState: { error } }) => (
                <DatePicker
                    {...other}
                    value={dayjs(value)}
                    sx={{ width: width }}
                    label={label}
                    slotProps={{
                        textField: {
                            error: error ? true : false,
                            helperText: error?.message
                        }
                    }}
                />
            )}
        />
    )
}
