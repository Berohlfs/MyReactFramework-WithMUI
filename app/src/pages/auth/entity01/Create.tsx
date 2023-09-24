// MUI
import { Stack, Typography, Button, Divider } from '@mui/material'
import { Add } from '@mui/icons-material'
// Libs
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { object } from 'yup'
// React
import { useEffect, useContext } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'
// Components
import { PageBlock } from '../../../components/containers/PageBlock'
import { CustomSelect } from '../../../components/widgets/CustomSelect'
import { CustomTextField } from '../../../components/widgets/CustomTextField'
import { CustomDatePicker } from '../../../components/widgets/CustomDatePicker'
import { CustomCheckbox } from '../../../components/widgets/CustomCheckBox'
// Scripts
import { species } from '../../../scripts/options'
import { date, default_required } from '../../../scripts/yupModules'

const EntityCreate = ()=> {

    const navigate = useNavigate()

    const {setBreadcrumbs} = useContext(AuthLayoutContext)!

    // Schema de validação
    const validacao_login = object({
        name: default_required,
        date_of_birth: date,
    })

    // Hook form
    type Inputs = {
        name: string,
        species?: string,
        wizard?: boolean,
        date_of_birth: string
    }

    const { handleSubmit, control, formState: {errors}} = useForm<Inputs>({
        resolver: yupResolver(validacao_login),
        defaultValues: {
          'name': '',
          'species': '',
          'wizard': true,
          'date_of_birth': ''
        }
    })

    const create = (data: Inputs)=> {
        toast('Mock create')
        // Mock navigate to recent created instance
        navigate('/characters/9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8')
        console.log(data)
    }

    // OnLoad
    useEffect(()=>{
        setBreadcrumbs([{text: 'Characters', link: '/characters'},{text: 'Create', link: ''}])
    },[])

    return(

        <form onSubmit={handleSubmit((data)=>create(data))}>

        <PageBlock type={'paper'}>

            <Stack padding={2} spacing={2}>

                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}>

                    <Typography color={'primary'}>New Character</Typography>

                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={1}>

                        <Button
                            type={'submit'}
                            endIcon={<Add/>}>
                                Create
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
                        placeholder={"Type the character's name"}/>

                    <CustomDatePicker
                        control={control}
                        name={'date_of_birth'}
                        width={200}
                        label={'Date of birth'}/>

                   <CustomSelect
                        label={'Species'}
                        control={control}
                        options={species}
                        name={'species'}
                        width={150}
                        form_control_error={errors.species}/>

                    <CustomCheckbox
                        label={'Wizard?'}
                        control={control}
                        name={'wizard'}/>

                </Stack>

            </Stack>

        </PageBlock>

        </form>

    )
}

export default EntityCreate