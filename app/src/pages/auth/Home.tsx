// MUI
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
// Components
import Table from '../../components/Table'
// Libs
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// React hooks
import { useEffect, useContext, useState } from 'react'
import { AuthLayoutContext } from '../../layout/auth/AuthLayout'
import { AppContext } from '../../App'
// Config
import APIInstance from '../../config/axios'

const StyledBox = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: '0 auto'
}))

const Home = ()=> {

    // Método de navegação
    const navigate = useNavigate()

    // Loading - AppContext
    const {setLoading} = useContext(AppContext)

    // Breadcrumbs - AuthContext
    const {setBreadcrumbs} = useContext(AuthLayoutContext)

    // GET - Characters (teste)
    const [characters, setCharacters] = useState([])

    const getCharacters = async()=> {
        setLoading(true)
        try{
            const res = await APIInstance(navigate).get('/api/characters/house/gryffindor')
            setCharacters(res.data)
        }catch(erro){
            // O tratamento de erro é feito dentro de 'config/axios.js'.
        }finally{
            setLoading(false)
        }
    }

    // Table mock action
    const action = (id)=> {
        toast(id)
    }

    // Onload
    useEffect(()=>{
        // Cada objeto passado dentro do array abaixo será convertido em um nível do breadcrumb
        setBreadcrumbs([{text: 'MyReactFramework', link: '/home'},{text: 'Characters', link: '/home'}])
        getCharacters()
    },[])

    return(

        <StyledBox pt={3}>

            <Table
                row_key={'id'}
                columns={[
                    // Adicione o atributo 'link' para uma coluna de LINKS.
                    {nome: 'Nome', chave: 'name', link: {path: 'home', chave: 'id'}},
                    {nome: 'Espécie', chave: 'species'},
                    // Adicione o atributo 'enum' para uma coluna de CHIPS.
                    {nome: 'Sexo', chave: 'gender', enum: {'male' : 'primary', 'female': 'secondary'}},
                ]}
                data={characters}
                // Adicione actions para colunas com disparo de funções.
                actions={[
                    {nome: 'Action', function: action, icon: TaskAltOutlinedIcon, param: 'id'},
                ]}/>

        </StyledBox>

    )
}

export default Home
