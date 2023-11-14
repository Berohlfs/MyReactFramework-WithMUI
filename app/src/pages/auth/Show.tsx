// MUI
import { Stack, Typography, Button, Divider, Paper } from '@mui/material'
import { Check } from '@mui/icons-material'
// Libs
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
// React
import { useEffect, useContext } from 'react'
import { AppContext } from '../../App'
// Components
import { DeleteBar } from '../../components/widgets/DeleteBar'
import { CustomTextField } from '../../components/widgets/CustomTextField'
// Scripts
import { string_required } from '../../scripts/zodModules'

export const EntityShow = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { setLoading } = useContext(AppContext)!

    // Schema de validação
    const validation = z.object({
        name: string_required
    })

    const { handleSubmit, control, reset } = useForm<z.infer<typeof validation>>({
        resolver: zodResolver(validation),
        defaultValues: {
            name: ''
        }
    })

    // GET - Character
    const getCharacter = async () => {
        setLoading({ render: true })
        try {
            const res = await axios.get(`https://hp-api.onrender.com/api/character/${id}`)
            reset(res.data[0])
        } catch (erro) {
            console.log(erro)
            toast.error('Erro de API (500)')
        } finally {
            setLoading({ render: false })
        }
    }

    // OnLoad
    useEffect(() => {
        getCharacter()
    }, [])

    return (
        <Paper>
            <Stack padding={2} spacing={2}>
                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    spacing={2}
                    useFlexGap>
                    <Typography>Personagem</Typography>

                    <Button
                        endIcon={<Check />}
                        onClick={handleSubmit((/*data*/) => {
                            toast.success('Mock save')
                        })}>
                        Salvar
                    </Button>
                </Stack>

                <Divider />

                <Stack direction={'row'} flexWrap={'wrap'} alignItems={'flex-start'} useFlexGap spacing={3} padding={1}>
                    <CustomTextField
                        name={'name'}
                        control={control}
                        label={'Nome'}
                        width={250}
                        placeholder={'Digite o nome do personagem'}
                    />
                </Stack>

                <DeleteBar
                    deleteFunc={() => {
                        toast.success('Mock delete')
                        navigate('/entity')
                    }}
                    instance_name={'personagem'}
                />
            </Stack>
        </Paper>
    )
}
