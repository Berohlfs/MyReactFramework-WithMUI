// MUI
import { TextField, Stack, Button } from "@mui/material"
// Components
import Mask from '../../components/Mask'
import PageCard from '../../components/PageCard'
// Libs
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
// React hooks
import { useContext } from 'react'
import { AppContext } from '../../App'

const Login = ()=> {

    const {setLoading} = useContext(AppContext)

    const navigate = useNavigate()

    // Schema para validação de formulário
    const validacao_login = yup.object({
        cpf: yup.string().required('Obrigatório').length(14, 'Inválido'),
        senha: yup.string().required('Obrigatório'),
    })

    // Hook para controle de formulário
    const { handleSubmit, control } = useForm({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'cpf': '',
          'senha': '',
        }
      })

    // onSubmit (Mock)
    const login = async(data)=> {
        // console.log(data)
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            toast.success('Login efetuado com sucesso.', {toastId: 'success-login'})
            sessionStorage.setItem('token', 'token')
            navigate('/home')
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

                    {/* O Controller é um componente, disponibilizado pela lib 'react-hook-form',
                    que oferece um state de controle para o input aninhado a ele. */}

                    <Controller name={'cpf'} control={control}
                        render={({field, fieldState: {error}}) => (
                        <TextField
                            label={'CPF'}
                            placeholder={'Digite seu CPF'}
                            {...field}
                            error={error ? true : false}
                            helperText={error?.message}
                            /* Para adicionar uma máscara a um campo de texto, precisamos subsituir o
                            input padrão renderizado pelo TextField por um 'input mascarado' (Mask). */
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
