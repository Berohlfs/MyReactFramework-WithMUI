// MUI
import { Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
// Componentes
import Table from '../../components/Table'
// Libs
import axios from 'axios'
import { toast } from 'react-toastify'
// React hooks
import { useEffect, useState, useContext } from 'react'
import { AuthLayoutContext } from '../../layout/auth/AuthLayout'

const StyledBox = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: '0 auto'
}))

const Home = ()=> {

    const {setBreadcrumbs} = useContext(AuthLayoutContext)

    const [characters, setCharacters] = useState([])

    const getCharacters = async()=> {
        try{
            const res = await axios.get('https://hp-api.onrender.com/api/characters')
            console.log(res.data)
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
        setBreadcrumbs([{text: 'Home', link: '/home'},{text: 'Characters', link: '/home'}])
        getCharacters()
    },[])

    return(

        <StyledBox pt={3}>

            <Table
                instance_key={'id'}
                columns={[
                    {nome: 'Nome', chave: 'name', link: {path: 'home', id: 'id'}},
                    {nome: 'Espécie', chave: 'species'},
                    {nome: 'Sexo', chave: 'gender', enum: {'male' : 'primary', 'female': 'secondary'}},
                ]}
                data={characters.slice(100)}
                actions={[
                    {nome: 'Action', function: action, icon: TaskAltOutlinedIcon, param: 'id'},
                ]}/>

        </StyledBox>


    )
}

export default Home
