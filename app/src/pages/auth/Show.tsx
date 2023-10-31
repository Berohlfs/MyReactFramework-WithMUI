// MUI
import { Stack, Typography, Button, Divider, Paper } from '@mui/material'
import { Check, ReplayOutlined } from '@mui/icons-material'
// Libs
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from 'yup'
import axios from 'axios'
// React
import { useEffect, useContext } from 'react'
import { AppContext } from '../../App'
// Components
import { DeleteBar } from '../../components/widgets/DeleteBar'
import { CustomTextField } from '../../components/widgets/CustomTextField'
// Scripts
import { default_required } from '../../scripts/yupModules'

export const EntityShow = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const { setLoading } = useContext(AppContext)!

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
    const getCharacter = async () => {
        setLoading({render: true})
        try {
            const res = await axios.get(`https://hp-api.onrender.com/api/character/${id}`)
            reset(res.data[0])
        } catch (erro) {
            console.log(erro)
            toast('API Error.')
        } finally {
            setLoading({render: false})
        }
    }

    // OnLoad
    useEffect(() => {
        getCharacter()
    }, [])

    return (

        <form onSubmit={handleSubmit((data) => { toast.success('Mock save'); console.log(data) })}>
            <Paper>

                <Stack padding={2} spacing={2}>

                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}>

                        <Typography>Character</Typography>

                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            spacing={1}>

                            <Button
                                color={'error'}
                                onClick={() => reset()}
                                endIcon={<ReplayOutlined />}>
                                Restore
                            </Button>

                            <Button
                                type={'submit'}
                                endIcon={<Check />}>
                                Save
                            </Button>

                        </Stack>

                    </Stack>

                    <Divider />

                    <Stack
                        direction={'row'}
                        flexWrap={'wrap'}
                        useFlexGap
                        spacing={3}
                        alignItems={'flex-start'}>

                        <CustomTextField
                            name={'name'}
                            control={control}
                            label={'Name'}
                            width={250}
                            placeholder={"Type character's name"} />

                    </Stack>

                    <DeleteBar
                        deleteFunc={() => { toast('Mock delete'); navigate('/characters') }}
                        instance_name={'character'} />

                </Stack>

            </Paper>
        </form>

    )
}
