// MUI
import { Button, Paper } from '@mui/material'
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
import { CustomCheckbox } from '../../components/widgets/CustomCheckbox'
import { CustomDatePicker } from '../../components/widgets/CustomDatePicker'
import { CustomSelect } from '../../components/widgets/CustomSelect'
import { CustomRadioGroup } from '../../components/widgets/CustomRadioGroup'
import { FormSubtitle, FormHeaderStack, FormVStack, FormBodyStack } from '../../components/containers/FormStacks'
// Validation
import { potionSchema, potion_default_values} from '../../validation/potion'
// Utils
import { mock_select, mock_radiogroup } from '../../utils/options'

type Props = {
    role: 'create' | 'show'
}

export const SinglePotion = ({ role }: Props) => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { setLoading } = useContext(AppContext)!

    const validation = potionSchema()

    const { handleSubmit, control, reset, setValue, formState: { errors} } = useForm<z.infer<typeof validation>>({
        resolver: zodResolver(validation),
        defaultValues: potion_default_values
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
            setValue('name', res.data.data.attributes.name)
            console.log(res.data)
        } catch (erro) {
            console.log(erro)
            toast.error('Erro de API (500)')
        } finally {
            setLoading({ render: false })
        }
    }

    const mockCreate = () => {
        toast.success('Criado', { id: 'created' })
        navigate(`/potions/eb918612-81ae-4bb6-9712-4a8194c89384`)
    }

    const mockDelete = () => {
        toast.success('Excluído', { id: 'deleted' })
        navigate('/potions')
    }

    const mockUpdate = (data: z.infer<typeof validation>) => {
        toast.success('Atualizado', { id: 'updated' })
        console.log(data)
    }

    useEffect(() => {
        role === 'show' && showPotion()
        role === 'create' && reset(potion_default_values)
    }, [role])

    return (
        <Paper>
            <FormVStack>
                <FormHeaderStack title={'Poção'}>
                    <Button
                        endIcon={role === 'show' ? <Check /> : <Add />}
                        onClick={handleSubmit((data) => {
                            role === 'show' ? mockUpdate(data) : mockCreate()
                        })}>
                        {role === 'show' ? 'Salvar' : 'Criar'}
                    </Button>
                </FormHeaderStack>

                <FormSubtitle divider={false} subtitle={'1º parte'}/>

                <FormBodyStack>

                    <CustomTextField
                        name={'name'}
                        control={control}
                        label={'Nome'}
                        width={250}
                        placeholder={'Digite o nome da poção'}/>

                    <CustomSelect
                        form_control_error={errors.select}
                        options={mock_select}
                        control={control}
                        label={'Select'}
                        name={'select'}/>

                    <CustomDatePicker
                        control={control}
                        label={'Date picker'}
                        name={'datepicker'}/>

                    <CustomCheckbox
                        form_control_error={errors.checkbox}
                        control={control}
                        label={'Checkbox'}
                        name={'checkbox'}/>

                </FormBodyStack>

                <FormSubtitle subtitle={'2º parte'}/>

                <FormBodyStack>

                    <CustomRadioGroup
                        form_control_error={errors.radiogroup}
                        options={mock_radiogroup}
                        control={control}
                        label={'Radio group'}
                        name={'radiogroup'}/>

                </FormBodyStack>

                {role === 'show' && <DeleteBar deleteFunc={mockDelete} instance_name={'poção'} />}
            </FormVStack>
        </Paper>
    )
}
