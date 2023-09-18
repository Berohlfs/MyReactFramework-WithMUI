// MUI
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { TaskAltOutlined } from '@mui/icons-material'
// Components
import Table from '../../../components/Table'
// Libs
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// React hooks
import { useEffect, useContext, useState } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'
import { AppContext } from '../../../App'
// Config
import APIInstance from '../../../config/axios'

const StyledBox = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: '0 auto'
}))

const EntityIndex = ()=> {

    // Método de navegação
    const navigate = useNavigate()

    // Loading - AppContext
    const {setLoading} = useContext(AppContext)

    // Breadcrumbs - AuthContext
    const {setBreadcrumbs} = useContext(AuthLayoutContext)

    // GET - Characters
    const [characters, setCharacters] = useState([])

    const getCharacters = async()=> {
        setLoading(true)
        try{
            const res = await APIInstance(navigate).get('/api/characters/house/gryffindor')
            setCharacters(res.data)
        }catch(erro){
            // Erros tratados dentro do arquivo 'config/axios.js'.
        }finally{
            setLoading(false)
        }
    }

    // Table action
    const action = (id)=> {
        toast(id)
    }

    // Onload
    useEffect(()=>{
        setBreadcrumbs([{text: 'MyReactFramework', link: '/home'},{text: 'Characters', link: '/home'}])
        getCharacters()
    },[])

    return(

        <StyledBox pt={3}>

            <Table
                title={'Characters'}
                id={'id'}
                columns={[
                    {nome: 'Nome', chave: 'name', link: {path: 'home', chave: 'id'}},
                    {nome: 'Espécie', chave: 'species'},
                    {nome: 'Sexo', chave: 'gender', enum: {'male' : 'primary', 'female': 'secondary'}},
                ]}
                data={characters}
                hidden_actions={[{name: 'Renovar', function: action}]}
                actions={[{name: 'Renovar', function: action, icon: TaskAltOutlined}]}
                add_link={'/novo/characters'}/>

        </StyledBox>

    )
}

export default EntityIndex
