// MUI
import { Paper, Stack, Typography, Button, Divider, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
// Libs
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
// React hooks
import { useEffect, useContext, useState } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'
import { AppContext } from '../../../App'
// Config
import APIInstance from '../../../config/axios'
// Components
import DeleteBar from '../../../components/DeleteBar'

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '90%',
    margin: '0 auto',
    marginTop: 30
}))

const EntityIndex = ()=> {

    const { id } = useParams()

    // Schema para validação de formulário
    const validacao_login = yup.object({
        name: yup.string().required('Obrigatório'),
    })

    // Hook para controle de formulário
    const { handleSubmit, control, formState: {errors}, setValue } = useForm({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'name': ''
        }
      })

    // Método de navegação
    const navigate = useNavigate()

    // Loading - AppContext
    const {setLoading} = useContext(AppContext)

    // Breadcrumbs - AuthContext
    const {setBreadcrumbs} = useContext(AuthLayoutContext)

    const getCharacter = async()=> {
        setLoading(true)
        try{
            const res = await APIInstance(navigate).get(`/api/character/${id}`)
            console.log(res.data)
            setValue('name', res.data[0].name)
        }catch(erro){
            // Erros tratados dentro do arquivo 'config/axios.js'.
        }finally{
            setLoading(false)
        }
    }

    // Onload
    useEffect(()=>{
        setBreadcrumbs([{text: 'Characters', link: '/characters'},{text: 'Edit', link: ''}])
        getCharacter()
    },[])

    return(

        <form onSubmit={handleSubmit((data)=>toast('Mock save'))}>

        <StyledPaper>

            <Stack padding={2} spacing={2}>

                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>

                    <Typography color={'primary'}>Character</Typography>

                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={1}>

                        <Button color={'error'} onClick={()=>getCharacter()}>Cancelar</Button>

                        <Button type={'submit'}>Salvar</Button>

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

                </Stack>

                <DeleteBar deleteFunc={()=>{toast('Mock delete'); navigate('/characters')}}/>

            </Stack>

        </StyledPaper>

        </form>

    )
}

export default EntityIndex
