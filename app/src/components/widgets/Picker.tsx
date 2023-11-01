// React hooks
import { useContext, useState, useEffect, Dispatch, SetStateAction, FC } from 'react'
import { AppContext } from '../../App'
// Libs
import { useNavigate } from 'react-router-dom'
// MUI
import { Divider, Stack, Typography, Paper, Button, Box, Autocomplete, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, LinearProgress } from '@mui/material'
import { CheckOutlined, Search, Edit, EditNoteOutlined } from '@mui/icons-material'
import { debounce } from '@mui/material/utils'
// Config
import { APIInstance } from '../../config/axios'
// Components
import { Modal } from '../containers/Modal'

type Props = {
    instance_attributes: {name: string, field_name: string}[]
    token: string,
    setToken: Dispatch<SetStateAction<string>>,
    url_domain: string,
    entity_name: string,
    title: string,

    CreateComponent: FC
}

export const Picker = ({ url_domain, entity_name, token, setToken, instance_attributes, title,  CreateComponent}: Props) => {

    const { setLoading } = useContext(AppContext)!

    const [picker_loading, setPickerLoading] = useState(false)

    const navigate = useNavigate()

    // Modals
    const [create_modal, setCreateModal] = useState(false)
    const [edit_modal, setEditModal] = useState(false)
    const [select_entity_modal, setSelectEntityModal] = useState(false)

    type Instancia = {
        [key: string]: string
    } | null

    // GET - /{{ entidade }}?search="..."
    const [instancias, setInstancias] = useState<Instancia[]>([])

    const getInstancias = debounce(async (search: string) => {
        if (!search) { return setInstancias([]) }
        try {
            setLoading({render: true, text: 'Buscando'})
            const res = await APIInstance(navigate, false).get(`/${url_domain}?search=${search}`)
            setInstancias(res.data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading({render: false})
        }
    }, 700)

    // GET - /{{ entidade }}/:token
    const [instancia_autocomplete, setInstanciaAutocomplete] = useState<Instancia>(null)
    const [instancia, setInstancia] = useState<Instancia>(null)

    const getEntidadeInstance = async (token: string | undefined, state_case: 'table' | 'autocomplete') => {
        if (token) {
            try {
                setPickerLoading(true)
                const res = await APIInstance(navigate, false).get(`/${url_domain}/${token}`)
                state_case === 'table' ? setInstancia(res.data) : setInstanciaAutocomplete(res.data)
                state_case === 'table' && setToken(res.data.token)
            } catch (error) {
                console.error(error)
            }finally{
                setPickerLoading(false)
            }
        }
    }

    useEffect(()=>{
        setInstanciaAutocomplete(instancia)
    }, [instancia, select_entity_modal])

    useEffect(()=>{
        if(token){ getEntidadeInstance(token, 'table') }
    },[token])

    return (<>

        <Paper sx={{ mb: 2, overflow: 'hidden'}}>

            { picker_loading &&
            <LinearProgress
                hidden={false}/> }

            <Stack padding={2} spacing={2}>

                <Stack
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    spacing={2}
                    useFlexGap>

                    <Typography variant={'caption'}>
                        {title}
                    </Typography>

                    <Button
                        variant={'outlined'}
                        endIcon={<Search />}
                        onClick={() => setSelectEntityModal(true)}>
                        Selecionar
                    </Button>

                </Stack>

                <Divider />

                {instancia

                    ?

                    <TableContainer sx={{ maxHeight: 420 }}>
                        <Table stickyHeader>

                            <TableHead>

                                <TableRow>

                                    <TableCell sx={{ width: 30 }}></TableCell>

                                    {instance_attributes.map(attribute=> (
                                        <TableCell sx={{ width: 30 }}>{attribute.name}</TableCell>
                                    ))}

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                <TableRow>

                                    <TableCell sx={{ width: 30 }}>
                                        <Tooltip
                                            placement={'bottom'}
                                            title={'Editar imóvel'}>

                                            <IconButton onClick={()=> setEditModal(true)}>
                                                <EditNoteOutlined color={'primary'}/>
                                            </IconButton>

                                        </Tooltip>
                                    </TableCell>

                                    {instance_attributes.map(attribute=> (
                                        <TableCell sx={{ width: 30 }}>{instancia[attribute.field_name]}</TableCell>
                                    ))}

                                </TableRow>

                            </TableBody>

                        </Table>
                    </TableContainer>

                    :

                    <Typography
                        variant={'caption'}
                        color={'text.secondary'}>
                        Selecione um imóvel.
                    </Typography>}

            </Stack>
        </Paper>

        <Modal
            open={select_entity_modal}
            handleClose={() => setSelectEntityModal(false)}
            max_width={600}
            title={`Selecionar ${entity_name}`}>

            <Autocomplete
                options={instancias}
                sx={{mb: 2}}
                value={instancia_autocomplete}
                onChange={(e, new_value: Instancia) => { setInstanciaAutocomplete(new_value) }}
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

            {instancia_autocomplete?.token && <>
            <Button
                sx={{mr: 1}}
                endIcon={<CheckOutlined />}
                onClick={() => {getEntidadeInstance(instancia_autocomplete.token, 'table'); setSelectEntityModal(false)}}>
                Selecionar
            </Button>

             <Button
                endIcon={<Edit />}
                variant={'text'}
                onClick={() => setEditModal(true)}>
                Editar
            </Button> </>}

            <Stack alignItems={'center'} mt={2}>

                <Typography variant={'caption'}>Não achou o imóvel desejado?</Typography>
                <Typography variant={'caption'}>
                    <Button
                        variant={'text'}
                        onClick={() => setCreateModal(true)}>
                        Clique para criar um novo imóvel
                    </Button>
                </Typography>

            </Stack>

        </Modal>

        <Modal
            open={create_modal}
            handleClose={() => setCreateModal(false)}
            max_width={800}
            title={`Criar ${entity_name}`}>

            <CreateComponent/>

        </Modal>

        <Modal
            open={edit_modal}
            handleClose={() => {setEditModal(false); getEntidadeInstance(instancia_autocomplete?.token, 'autocomplete')}}
            max_width={800}
            title={`Editar ${entity_name}`}>

            {/* {edit_component({})} */}

        </Modal>

    </>)
}
