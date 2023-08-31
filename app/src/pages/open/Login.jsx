// MUI
import { TextField, Stack, Button } from "@mui/material"
// Componentes
import Mask from '../../components/Mask'
import PageCard from '../../components/PageCard'
// Libs
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
// React hooks
import { useContext } from 'react'
import { AppContext } from '../../App'

const Login = ()=> {

    const {setLoading} = useContext(AppContext)

    const validacao_login = yup.object({
        cpf: yup.string().required('Obrigatório').length(14, 'Inválido'),
        senha: yup.string().required('Obrigatório'),
    })

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'cpf': '',
          'senha': '',
        }
      })

    const login = (data)=> {
        setLoading(true)
        setTimeout(()=>{
            toast.success('Login realizado com sucesso.', {toastId: 'login-success'})
            console.log(data)
            setLoading(false)
        },1500)
    }

    return (

        <PageCard
            max_width={300}
            title={'Login'}
            caption={'Seja bem vindo!'}
            link={{text: 'Ainda não é parceiro?', path: '/cadastro', label: 'Cadastre-se'}}>

            <form onSubmit={handleSubmit((data)=>login(data))}>

                <Stack spacing={2}>

                    <Controller name={'cpf'} control={control}
                        render={({field, fieldState: {error}}) => (
                        <TextField
                            label={'CPF'}
                            placeholder={'Digite seu CPF'}
                            {...field}
                            error={error ? true : false}
                            helperText={error?.message}
                            InputProps={{
                                inputComponent: Mask,
                                inputProps: {mask: '000.000.000-00'}
                            }}
                        />)}
                    />

                    <Controller name={'senha'} control={control}
                        render={({field, fieldState: {error}}) => (
                        <TextField
                            label={'Senha'}
                            placeholder={'Digite sua senha'}
                            {...field}
                            error={error ? true : false}
                            helperText={error?.message}
                            type={'password'}
                        />)}
                    />

                    <Button type={'submit'}>Login</Button>

                </Stack>

            </form>

        </PageCard>

    )
}

export default Login
