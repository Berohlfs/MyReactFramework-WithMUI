// React hooks
import { forwardRef, useState } from 'react'
// Libs
import { IMaskInput } from 'react-imask'
import { Controller, Control } from 'react-hook-form'
// MUI
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { InputAdornment, IconButton, TextField } from '@mui/material'

type InputProps = {
  onChange: (event: { target: { name: string; value: string } }) => void,
  name: string
}

const Mask = forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  const { onChange, ...other } = props

  return (

    <IMaskInput
      {...other}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />

  )
})

type MaskProps = {
  mask: string | Number
  radix?: string,
  scale?: number,
  padFractionalZeros?: boolean,
  thousandsSeparator?: string,
}

type Props = {
  control: Control<any, any>,
  name: string,
  label: string,
  placeholder: string
  mask_props?: MaskProps
  password?: true
  full_width?: true
  width?: number
}

export const CustomTextField = ({control, name, label, placeholder, mask_props, password, full_width, width}: Props)=> {

  const [visible, setVisible] = useState(false)

  return(
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (

        <TextField
            {...field}
            fullWidth={full_width}
            sx={{width: width}}
            label={label}
            placeholder={placeholder}
            error={error ? true : false}
            helperText={error?.message}
            type={password ? visible ? 'text' : 'password' : undefined}

            InputProps={{
                inputComponent: mask_props ? Mask as any : undefined,
                inputProps: mask_props ? {...mask_props} : undefined,
                endAdornment: password ? (
                <InputAdornment position={'end'}>

                  <IconButton
                      size={'small'}
                      onClick={()=>setVisible(!visible)}
                      edge={'end'}>

                      {visible ?

                      <Visibility sx={{width: 18, height: 18}}/> :

                      <VisibilityOff sx={{width: 18, height: 18}}/> }

                  </IconButton>

                </InputAdornment>) : undefined
            }}
        />

      )}
    />
  )
}
