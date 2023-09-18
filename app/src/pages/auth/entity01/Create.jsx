// MUI
import { Paper, Stack, Typography, Button, Divider, TextField, FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@mui/material'
import { styled } from '@mui/material/styles'
// Libs
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
// React hooks
import { useEffect, useContext } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '90%',
    margin: '0 auto',
    marginTop: 30
}))

const EntityIndex = ()=> {

    // Schema para validação de formulário
    const validacao_login = yup.object({
        name: yup.string().required('Obrigatório'),
    })

    // Hook para controle de formulário
    const { handleSubmit, control, formState: {errors}} = useForm({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'name': '',
          'species': ''
        }
      })

    // Método de navegação
    const navigate = useNavigate()

    // Breadcrumbs - AuthContext
    const {setBreadcrumbs} = useContext(AuthLayoutContext)

    const create = ()=> {
        toast('Mock create')
        navigate('/characters/9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8')
    }

    // Onload
    useEffect(()=>{
        setBreadcrumbs([{text: 'Characters', link: '/characters'},{text: 'Create', link: ''}])
    },[])

    return(

        <form onSubmit={handleSubmit((data)=>create())}>

        <StyledPaper>

            <Stack padding={2} spacing={2}>

                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>

                    <Typography color={'primary'}>Novo personagem</Typography>

                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={1}>

                        <Button type={'submit'}>Criar</Button>

                    </Stack>

                </Stack>

                <Divider/>

                <Stack
                    direction={'row'}
                    flexWrap={'wrap'}
                    useFlexGap
                    spacing={1}>

                    <Controller name={'name'} control={control}
                        render={({field, fieldState: {error}}) => (
                        <TextField
                            label={'Nome'}
                            placeholder={'Digite o nome'}
                            {...field}
                            error={error ? true : false}
                            helperText={error?.message}
                        />)}
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

                                {[{label: 'Human', value: '1'},{label: 'Troll', value: '2'}].map((item)=> (
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

                </Stack>

            </Stack>

        </StyledPaper>

        </form>

    )
}

export default EntityIndex
