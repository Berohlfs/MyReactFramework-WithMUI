// MUI
import { Stack, Typography, Button, Divider, TextField, FormControl, InputLabel, FormHelperText, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Add } from '@mui/icons-material'
// Libs
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
// React hooks
import { useEffect, useContext } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'
// Components
import AuthBlock from '../../../components/AuthBlock'
// Scripts
import { species } from '../../../scripts/options'

const EntityIndex = ()=> {

    const navigate = useNavigate()

    const {setBreadcrumbs} = useContext(AuthLayoutContext)

    // Schema de validação
    const validacao_login = yup.object({
        name: yup.string().required('Obrigatório'),
        date_of_birth: yup.string().required('Obrigatório').not(['Invalid Date'], 'inválido')
    })

    // Hook form
    const { handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'name': '',
          'species': '',
          'wizard': true,
          'date_of_birth': ''
        }
    })

    const create = (data)=> {
        toast('Mock create')
        // Mock navigate to recent created instance
        navigate('/characters/9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8')
        console.log(data)
    }

    // OnLoad
    useEffect(()=>{
        setBreadcrumbs([{text: 'Characters', link: '/characters'},{text: 'Create', link: ''}])
    },[])

    return(

        <form onSubmit={handleSubmit((data)=>create(data))}>

        <AuthBlock type={'paper'}>

            <Stack padding={2} spacing={2}>

                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>

                    <Typography color={'primary'}>New Character</Typography>

                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={1}>

                        <Button
                            type={'submit'}
                            endIcon={<Add/>}>
                                Create
                        </Button>

                    </Stack>

                </Stack>

                <Divider/>

                <Stack
                    direction={'row'}
                    flexWrap={'wrap'}
                    useFlexGap
                    spacing={2}>

                    <Controller name={'name'} control={control}
                        render={({field, fieldState: {error}}) => (
                        <TextField
                            label={'Name'}
                            placeholder={"Type the character's name"}
                            {...field}
                            error={error ? true : false}
                            helperText={error?.message}
                        />)}
                    />

                    <Controller name={'date_of_birth'} control={control}
                    render={({field, fieldState: {error}}) => (
                        <DatePicker
                            {...field}
                            slotProps={{
                            textField: {
                                error: error ? true : false,
                                helperText: error?.message
                            }
                            }}
                            label={'Date of birth'}/>
                        )}
                    />

                    <FormControl sx={{width: 150}}>
                        <InputLabel error={errors.species ? true : false}>
                            Species
                        </InputLabel>
                        <Controller name={'species'} control={control}
                        render={({field, fieldState: {error}}) => (

                            <Select
                                error={error ? true : false}
                                {...field}
                                // Label deve ser === InputLabel
                                label={'Species'}>

                                {species.map((item)=> (
                                    <MenuItem
                                        key={item.value}
                                        value={item.value}>
                                            {item.label}
                                    </MenuItem>
                                ))}

                            </Select>)}/>

                        {errors.species &&
                        <FormHelperText error={errors.species ? true : false}>
                            {errors.species?.message}
                        </FormHelperText>}
                    </FormControl>

                    <Controller name={'wizard'} control={control}
                        render={({field: {value, ...other}}) => (
                        <FormControlLabel
                            control={<Checkbox {...other} checked={value}/>}
                            label="Wizard?"
                        />)}
                    />

                </Stack>

            </Stack>

        </AuthBlock>

        </form>

    )
}

export default EntityIndex
