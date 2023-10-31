// MUI
import { Stack, Typography, Button, Divider, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
// Libs
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from 'yup'
// Components
import { CustomTextField } from '../../components/widgets/CustomTextField'
// Scripts
import { string_required } from '../../scripts/yupModules'

export const EntityCreate = () => {

    const navigate = useNavigate()

    // Schema de validação
    const validacao = object({
        name: string_required,
    })

    // Hook form
    type Inputs = {
        name: string,
    }

    const { handleSubmit, control } = useForm<Inputs>({
        resolver: yupResolver(validacao),
        defaultValues: {
            'name': ''
        }
    })

    const create = (/*data: Inputs*/) => {
        toast.success('Mock create')
        // Mock navigate to recent created instance
        navigate('/entity/9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8')
    }

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

                <Typography>Novo personagem</Typography>

                <Button
                    onClick={handleSubmit((/*data*/) => create())}
                    endIcon={<Add />}>
                    Criar
                </Button>

            </Stack>

            <Divider />

            <Stack
                direction={'row'}
                flexWrap={'wrap'}
                alignItems={'flex-start'}
                useFlexGap
                spacing={3}
                padding={1}>

                <CustomTextField
                    name={'name'}
                    control={control}
                    label={'Nome'}
                    width={250}
                    placeholder={"Digite o nome do personagem"} />

            </Stack>

        </Stack>
        </Paper>

    )
}
