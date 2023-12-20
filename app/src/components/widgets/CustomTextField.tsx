// React
import { forwardRef, useState } from 'react'
// Libs
import { IMaskInput } from 'react-imask'
import { Controller, Control } from 'react-hook-form'
// MUI
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, IconButton, TextField } from '@mui/material'

type InputProps = {
    // Simulating onChange event object
    onChange: (event: { target: { name: string; value: string } }) => void
    name: string
}

export const Mask = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { onChange, name, ...other } = props

    return (
        <IMaskInput
            {...other}
            inputRef={ref}
            unmask={true}
            onAccept={(value) => onChange({ target: { name: name, value } })}
            overwrite
        />
    )
})

type MaskProps = {
    mask: string | NumberConstructor
    max?: number
    min?: number
    radix?: string
    scale?: number
    padFractionalZeros?: boolean
    thousandsSeparator?: string
}

type Props = {
    control: Control<any, any>
    name: string
    label?: string
    placeholder?: string
    mask_props?: MaskProps
    password?: true
    full_width?: true
    width?: number
    disabled?: true
}

export const CustomTextField = ({
    control,
    name,
    label,
    placeholder,
    mask_props,
    password,
    full_width,
    width,
    disabled
}: Props) => {
    const [visible, setVisible] = useState(false)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, ...other }, fieldState: { error } }) => (
                <TextField
                    {...other}
                    value={String(value)}
                    disabled={disabled}
                    fullWidth={full_width}
                    sx={{ width: width }}
                    label={label}
                    placeholder={placeholder}
                    error={error ? true : false}
                    helperText={error?.message}
                    type={password ? (visible ? 'text' : 'password') : undefined}
                    InputProps={{
                        inputComponent: mask_props ? (Mask as any) : undefined,
                        inputProps: mask_props ? { ...mask_props } : undefined,
                        endAdornment: password ? (
                            <InputAdornment position={'end'}>
                                <IconButton size={'small'} onClick={() => setVisible(!visible)} edge={'end'}>
                                    {visible ? (
                                        <Visibility sx={{ width: 18, height: 18 }} />
                                    ) : (
                                        <VisibilityOff sx={{ width: 18, height: 18 }} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ) : undefined
                    }}
                />
            )}
        />
    )
}
