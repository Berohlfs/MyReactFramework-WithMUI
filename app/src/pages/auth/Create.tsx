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
import { CustomSelect } from '../../components/widgets/CustomSelect'
import { CustomTextField } from '../../components/widgets/CustomTextField'
import { CustomDatePicker } from '../../components/widgets/CustomDatePicker'
import { CustomCheckbox } from '../../components/widgets/CustomCheckbox'
import { CustomRadioGroup } from '../../components/widgets/CustomRadioGroup'
// Scripts
import { species, genders } from '../../scripts/options'
import { date, default_required } from '../../scripts/yupModules'

export const EntityCreate = () => {

    const navigate = useNavigate()

    // Schema de validação
    const validacao_login = object({
        name: default_required,
        date_of_birth: date,
        gender: default_required
    })

    // Hook form
    type Inputs = {
        name: string,
        species?: string,
        wizard?: boolean,
        date_of_birth: string,
        gender: string
    }

    const { handleSubmit, control, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validacao_login),
        defaultValues: {
            'name': '',
            'species': '',
            'wizard': true,
            'date_of_birth': '',
            'gender': ''
        }
    })

    const create = (data: Inputs) => {
        toast('Mock create')
        // Mock navigate to recent created instance
        navigate('/characters/9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8')
        console.log(data)
    }

    return (

        <form onSubmit={handleSubmit((data) => create(data))}>
            <Paper>

                <Stack padding={2} spacing={2}>

                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}>

                        <Typography>New Character</Typography>

                        <Button
                            type={'submit'}
                            endIcon={<Add />}>
                            Create
                        </Button>

                    </Stack>

                    <Divider />

                    <CustomRadioGroup
                        label={'Gender'}
                        control={control}
                        options={genders}
                        name={'gender'}
                        form_control_error={errors.gender} />

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
                            placeholder={"Type the character's name"} />

                        <CustomDatePicker
                            control={control}
                            name={'date_of_birth'}
                            width={200}
                            label={'Date of birth'} />

                        <CustomSelect
                            label={'Species'}
                            control={control}
                            options={species}
                            name={'species'}
                            width={150}
                            form_control_error={errors.species} />

                        <CustomCheckbox
                            label={'Wizard?'}
                            control={control}
                            name={'wizard'} />

                    </Stack>

                </Stack>

            </Paper>
        </form>

    )
}
