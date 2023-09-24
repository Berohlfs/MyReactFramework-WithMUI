// MUI
import { Stack, Typography, Button, Divider, TextField } from '@mui/material'
import { Check, Clear } from '@mui/icons-material'
// Libs
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from 'yup'
import axios from 'axios'
// React
import { useEffect, useContext } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'
import { AppContext } from '../../../App'
// Components
import { DeleteBar } from '../../../components/widgets/DeleteBar'
import { PageBlock } from '../../../components/containers/PageBlock'
// Scripts
import { default_optional } from '../../../scripts/yupModules'

const EntityShow = ()=> {

    const { id } = useParams()

    const navigate = useNavigate()

    const {setLoading} = useContext(AppContext)!

    const {setBreadcrumbs} = useContext(AuthLayoutContext)!

    // Schema de validação
    const validacao_login = object({
        name: default_optional,
    })

    // Hook form
    const { handleSubmit, control, reset } = useForm({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'name': ''
        }
    })

    // GET - Character
    const getCharacter = async()=> {
        setLoading(true)
        try{
            const res = await axios.get(`https://hp-api.onrender.com/api/character/${id}`)
            reset(res.data[0])
        }catch(erro){
            console.log(erro)
            toast.warning('Houve um erro.', {toastId: 'error-getCharacter'})
        }finally{
            setLoading(false)
        }
    }

    // OnLoad
    useEffect(()=>{
        setBreadcrumbs([{text: 'Characters', link: '/characters'},{text: 'Edit', link: ''}])
        getCharacter()
    },[])

    return(

        <form onSubmit={handleSubmit((data)=>console.log(data))}>

        <PageBlock type={'paper'}>

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

                        <Button
                            color={'error'}
                            onClick={()=>reset()}
                            endIcon={<Clear/>}>
                                Cancel
                        </Button>

                        <Button
                            type={'submit'}
                            endIcon={<Check/>}>
                                Save
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

        </PageBlock>

        </form>

    )
}

export default EntityShow