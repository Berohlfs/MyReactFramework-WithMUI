// MUI
import { Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
// Componentes
import Table from '../../components/Table'
// Libs
import axios from 'axios'
import { toast } from 'react-toastify'
// React hooks
import { useEffect, useState } from 'react'

const StyledBox = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: '0 auto'
}))

const Home = ()=> {

    const [characters, setCharacters] = useState([])

    const getCharacters = async()=> {
        try{
            const res = await axios.get('https://hp-api.onrender.com/api/characters')
            //console.log(res.data)
            setCharacters(res.data)
        }catch(erro){
            toast.error('Não foi possível acessar a API.', {toastId: 'hp-error'})
            console.log(erro)
        }
    }

    const action = (id)=> {
        toast(id)
    }

    useEffect(()=>{
        getCharacters()
    },[])

    return(<>

        <Typography variant={'h6'} m={2} textAlign={'center'}>HP Characters</Typography>

        <StyledBox>

            <Table
                instance_key={'id'}
                columns={[
                    {nome: 'Nome', chave: 'name', link: {path: 'home', id: 'id'}},
                    {nome: 'Espécie', chave: 'species'},
                    {nome: 'Sexo', chave: 'gender', enum: {'male' : 'primary', 'female': 'secondary'}},
                ]}
                data={characters}
                actions={[
                    {nome: 'Action', function: action, icon: TaskAltOutlinedIcon, param: 'id'},
                ]}/>

        </StyledBox>


    </>)
}

export default Home
