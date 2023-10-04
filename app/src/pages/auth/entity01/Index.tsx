// MUI
import { TaskAltOutlined } from '@mui/icons-material'
import { Autocomplete, Stack, TextField, Typography, Box, Paper, Divider } from '@mui/material'
// Components
import { CustomTable } from '../../../components/widgets/CustomTable'
// Libs
import { toast } from 'react-toastify'
import axios from 'axios'
// React
import { useEffect, useContext, useState } from 'react'
import { AppContext } from '../../../App'

export const EntityIndex = ()=> {

    const {setLoading} = useContext(AppContext)!

    // GET - Characters
    type Character = {
        [key: string]: string
    }

    type Characters = Character[]

    const [characters, setCharacters] = useState<Characters>([])

    const getCharacters = async()=> {
        setLoading(true)
        try{
            const res = await axios.get('https://hp-api.onrender.com/api/characters/house/gryffindor')
            setCharacters(res.data)
            console.log(res.data)
        }catch(erro){
            console.log(erro)
            toast.warning('Houve um erro.', {toastId: 'error-getCharacters'})
        }finally{
            setLoading(false)
        }
    }

    // Table mock action
    const action = (id: string)=> {
        toast(id)
    }

    // OnLoad
    useEffect(()=>{
        getCharacters()
    },[])

    const [character, setCharacter] = useState<Character | null>()

    useEffect(()=>{
        if(character){
            toast(character!.id)
        }

    },[character])

    return(<>

        <Paper sx={{mb: 2}}>
        <Stack padding={2} spacing={2}>

            <Typography>Search for character</Typography>
            <Divider/>

            <Autocomplete
                options={characters}
                value={character}
                onChange={(event, new_value: Character | null) => {setCharacter(new_value)}}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box {...props} key={option.id} component="li">
                    <Stack>
                        <Typography>{option.name}</Typography>
                        <Typography variant={'caption'}>Species: {option.species}</Typography>
                        <Typography variant={'caption'}>Actor: {option.actor}</Typography>
                    </Stack>
                    </Box>
                )}
                renderInput={(textfield_props) => (
                    <TextField
                    {...textfield_props}
                    size={'medium'}
                    label={"Name"}
                    inputProps={{
                        ...textfield_props.inputProps,
                    }}/>
                )}/>

        </Stack>
        </Paper>

        <CustomTable
            title={'Characters'}
            id={'id'}
            add_link={'/new/characters'}
            columns={[
                {name: 'Nome', key: 'name', show_domain_path: '/characters'},
                {name: 'Espécie', key: 'species'},
                {name: 'Gênero', key: 'gender', enum: {'male': 'primary', 'female': 'secondary'}},
            ]}
            data={characters}
            hidden_actions={[{name: 'Get ID', function: action}]}
            actions={[{name: 'Get ID', function: action, icon: TaskAltOutlined}]}/>

    </>)
}
