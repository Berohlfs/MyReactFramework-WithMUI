// React hooks
import { forwardRef } from 'react'
// Libs
import { IMaskInput } from 'react-imask'

const Mask = forwardRef((props, ref)=> {

  const { onChange, ...other } = props

  return (

    <IMaskInput
      {...other}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />

  )
})

export default Mask
