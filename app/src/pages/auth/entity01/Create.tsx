// MUI
import { Stack, Typography, Button, Divider, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Add } from '@mui/icons-material'
// Libs
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from 'yup'
// React hooks
import { useEffect, useContext } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'
// Components
import { PageBlock } from '../../../components/containers/PageBlock'
import { Select } from '../../../components/widgets/Select'
// Scripts
import { species } from '../../../scripts/options'
import { date, default_required } from '../../../scripts/yupModules'

type Inputs = {
    name: string,
    species?: string,
    wizard?: boolean,
    date_of_birth: string
}

const EntityIndex = ()=> {

    const navigate = useNavigate()

    const {setBreadcrumbs} = useContext(AuthLayoutContext)

    // Schema de validação
    const validacao_login = object({
        name: default_required,
        date_of_birth: date,
    })

    // Hook form
    const { handleSubmit, control, formState: {errors}} = useForm<Inputs>({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'name': '',
          'species': '',
          'wizard': true,
          'date_of_birth': ''
        }
    })

    const create = (data: Inputs)=> {
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

        <PageBlock type={'paper'}>

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

                   <Select
                    label={'Species'}
                    control={control}
                    options={species}
                    name={'species'}
                    width={150}
                    form_control_error={errors.species}/>

                    <Controller name={'wizard'} control={control}
                        render={({field: {value, ...other}}) => (
                        <FormControlLabel
                            control={<Checkbox {...other} checked={value}/>}
                            label="Wizard?"
                        />)}
                    />

                </Stack>

            </Stack>

        </PageBlock>

        </form>

    )
}

export default EntityIndex
