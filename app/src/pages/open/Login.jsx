// MUI
import { TextField, Stack, Button, FormControl, InputLabel, FormHelperText, Select, MenuItem } from "@mui/material"
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
        opcoes: yup.string().required('Obrigatório'),
    })

    // Hook para controle de formulário
    const { handleSubmit, control, formState: {errors} } = useForm({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'cpf': '',
          'senha': '',
          'opcoes': ''
        }
      })

    // onSubmit
    const login = async(data)=> {
        // console.log(data)
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
            toast.success('Login efetuado com sucesso.', {toastId: 'success-login'})
            sessionStorage.setItem('token', 'token')
            navigate('/characters')
        },1500)
    }

    const select_options = [
        {label: 'Opção 01', value: '1'}
    ]

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

                    <FormControl /* opcoes */>

                        <InputLabel error={errors.opcoes ? true : false}>
                            Opções
                        </InputLabel>

                        <Controller name={'opcoes'} control={control}
                        render={({field, fieldState: {error}}) => (
                            <Select {...field} label={'Opções'} error={error ? true : false}>

                                {select_options.map((item)=> (
                                    <MenuItem
                                        key={item.value}
                                        value={item.value}>
                                            {item.label}
                                    </MenuItem>
                                ))}

                            </Select>)}
                        />

                        {errors.opcoes &&

                        <FormHelperText error={errors.opcoes ? true : false}>
                            {errors.opcoes?.message}
                        </FormHelperText>}

                    </FormControl>

                    <Button type={'submit'}>Login</Button>

                </Stack>

            </form>

        </PageCard>

    )
}

export default Login
