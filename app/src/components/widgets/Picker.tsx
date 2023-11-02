// React hooks
import { useContext, useState, Dispatch, SetStateAction } from 'react'
import { AppContext } from '../../App'
// Libs
import { useNavigate } from 'react-router-dom'
// MUI
import { Divider, Stack, Typography, Box, Autocomplete, TextField } from '@mui/material'
import { debounce } from '@mui/material/utils'
// Config
import { APIInstance } from '../../config/axios'

type Props = {
    instance_attributes: {name: string, field_name: string}[]
    token: string,
    setToken: Dispatch<SetStateAction<string>>,
    url_domain: string,
    entity_name: string,
    title: string,

    CreateComponent: FC
}

export const Picker = ({ entity, entity_name, token, tokenSetter, instance_attributes}: Props) => {

    const navigate = useNavigate()

    const { setLoading } = useContext(AppContext)!

    type Instancia = {
        [key: string]: string
    } | null

    // GET - /{{ entidade }}?search="..."
    const [instancias, setInstancias] = useState<Instancia[]>([])

    const getInstancias = debounce(async (search: string) => {
        if (!search) { return setInstancias([]) }
        try {
            setLoading({render: true})
            const res = await APIInstance(navigate, false).get(`/${entity}?search=${search}`)
            setInstancias(res.data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading({render: false})
        }
    }, 700)

    // GET - /{{ entidade }}/:token
    const [instancia, setInstancia] = useState<Instancia>(null)

    return (

            <Autocomplete
                options={instancias}
                sx={{mb: 2}}
                value={instancia}
                onChange={(e, value: Instancia) => { setInstancia(value) }}
                getOptionLabel={(option) => (
                    instance_attributes.map(attribute => (
                        option ? option[attribute.field_name] : ''
                    )).join(', ')
                )}
                renderOption={(props, option) => (<>
                    <Box {...props} key={option?.token} component="li">
                        <Stack>

                            {instance_attributes.map(attribute=> (
                                <Typography fontSize={11}>
                                    { option ?
                                    attribute.name + ': ' +
                                    option[attribute.field_name] : '' }
                                </Typography>
                            ))}

                        </Stack>
                    </Box>
                    <Divider/>
                </>)}
                renderInput={(textfield_props) => (
                    <TextField
                        {...textfield_props}
                        size={'medium'}
                        label={'Buscar imóvel'}
                        placeholder={"Buscar por código, CEP, logradouro, número, complemento, bairro, cidade ou UF."}
                        onChange={(e) => getInstancias(e.target.value)}
                        inputProps={{
                            ...textfield_props.inputProps,
                        }} />
                )} />

    )
}
