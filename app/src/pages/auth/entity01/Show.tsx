// MUI
import { Stack, Typography, Button, Divider } from '@mui/material'
import { Check, Clear } from '@mui/icons-material'
// Libs
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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
import { CustomTextField } from '../../../components/widgets/CustomTextField'
// Scripts
import { default_required } from '../../../scripts/yupModules'

const EntityShow = ()=> {

    const { id } = useParams()

    const navigate = useNavigate()

    const {setLoading} = useContext(AppContext)!

    const {setBreadcrumbs} = useContext(AuthLayoutContext)!

    // Schema de validação
    const validacao_login = object({
        name: default_required,
    })

    // Hook form
    type Inputs = {
        name: string
    }

    const { handleSubmit, control, reset } = useForm<Inputs>({
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

        <form onSubmit={handleSubmit((data)=>{toast('Mock save'); console.log(data)})}>

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

                    <CustomTextField
                        name={'name'}
                        control={control}
                        label={'Name'}
                        placeholder={"Type character's name"}/>

                </Stack>

                <DeleteBar deleteFunc={()=>{toast('Mock delete'); navigate('/characters')}}/>

            </Stack>

        </PageBlock>

        </form>

    )
}

export default EntityShow
