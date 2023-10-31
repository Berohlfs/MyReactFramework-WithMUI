// MUI
import { Stack, Button } from "@mui/material"
// Components
import { CustomTextField } from '../../components/widgets/CustomTextField'
import { PageCard } from '../../components/containers/PageCard'
// Libs
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from 'yup'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
// React
import { useContext } from 'react'
import { AppContext } from '../../App'
// Scripts
import { cpf, string_required } from '../../scripts/yupModules'

export const Login = ()=> {

    const { setLoading } = useContext(AppContext)!

    const navigate = useNavigate()

    // Schema de validação
    const validacao = object({
        cpf: cpf,
        password: string_required
    })

    // Hook form
    type Inputs = {
        cpf: string,
        password: string
    }

    const { handleSubmit, control } = useForm<Inputs>({
        resolver: yupResolver(validacao),
        defaultValues: {
          'cpf': '',
          'password': ''
        }
      })

    // onSubmit
    const login = async(/*data: Inputs*/)=> {
        setLoading({render: true, text: 'Entrando'})
        setTimeout(()=>{
            setLoading({render: false})
            Cookies.set('access', 'access')
            navigate('/entity')
        },1500)
    }

    return (

        <PageCard
            max_width={280}
            title={'Login'}
            caption={'Seja bem vindo!'}
            link={{text: "Ainda não é cadastrado?", path: '/register', label: 'Cadastre-se!'}}>

            <Stack spacing={2}>

                <CustomTextField
                    control={control}
                    name={'cpf'}
                    label={'CPF'}
                    placeholder={'Digite o CPF'}
                    mask_props={{mask:'000.000.000-00'}}/>

                <CustomTextField
                    control={control}
                    name={'password'}
                    label={'Senha'}
                    placeholder={'Digite a senha'}
                    password={true}/>

                <Button onClick={handleSubmit((/*data*/)=>login())}>
                        Login
                </Button>

            </Stack>

        </PageCard>

    )
}
