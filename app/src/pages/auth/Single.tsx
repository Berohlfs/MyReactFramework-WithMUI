// MUI
import { Stack, Typography, Button, Divider, Paper } from '@mui/material'
import { Check, Add } from '@mui/icons-material'
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

type Props = {
    role: 'create' | 'show'
}

export const SinglePotion = ({ role }: Props) => {
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

    type Potion = {
        attributes: {
            name: string
        }
    }

    type Response = {
        data: {
            data: Potion
        }
    }

    const showPotion = async () => {
        setLoading({ render: true })
        try {
            const res: Response = await axios.get(`https://api.potterdb.com/v1/potions/${id}`)
            reset({name: res.data.data.attributes.name})
            console.log(res.data)
        } catch (erro) {
            console.log(erro)
            toast.error('Erro de API (500)')
        } finally {
            setLoading({ render: false })
        }
    }

    const mockCreate = ()=> {
        toast.success('Criado', {id: 'created'})
        navigate(`/potions/af984889-3b1f-4b43-a49c-71c45d6fc012`)
    }

    const mockDelete = ()=> {
        toast.success('Excluído', {id: 'deleted'})
        navigate('/potions')
    }

    const mockUpdate = ()=> {
        toast.success('Atualizado', {id: 'updated'})
    }

    useEffect(() => {
        role === 'show' && showPotion()
    }, [role])

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
                    <Typography>Poção</Typography>

                    <Button
                        endIcon={role === "show" ? <Check/> : <Add/>}
                        onClick={handleSubmit((/*data*/) => {
                            role === 'show' ? mockUpdate() : mockCreate()
                        })}>
                        {role === "show" ? 'Salvar' : 'Criar'}
                    </Button>
                </Stack>

                <Divider />

                <Stack direction={'row'} flexWrap={'wrap'} alignItems={'flex-start'} useFlexGap spacing={3} padding={1}>
                    <CustomTextField
                        name={'name'}
                        control={control}
                        label={'Nome'}
                        width={250}
                        placeholder={'Digite o nome da poção'}
                    />
                </Stack>

                {role === 'show' &&
                <DeleteBar deleteFunc={mockDelete} instance_name={'poção'}/> }

            </Stack>
        </Paper>
    )
}
