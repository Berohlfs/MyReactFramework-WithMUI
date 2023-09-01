// MUI
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
// Components
import Table from '../../components/Table'
// Libs
import axios from 'axios'
import { toast } from 'react-toastify'
// React hooks
import { useEffect, useContext, useState } from 'react'
import { AuthLayoutContext } from '../../layout/auth/AuthLayout'
import { AppContext } from '../../App'

const StyledBox = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: '0 auto'
}))

const Home = ()=> {

    const {setLoading} = useContext(AppContext)

    const {setBreadcrumbs} = useContext(AuthLayoutContext)

    const [characters, setCharacters] = useState([])

    // Para fins de demonstração, utilizaremos a API de personagens do Harry Potter
    const getCharacters = async()=> {
        setLoading(true)
        try{
            const res = await axios.get('https://hp-api.onrender.com/api/characters/house/gryffindor')
            // console.log(res.data)
            setCharacters(res.data)
        }catch(erro){
            toast.error('Não foi possível acessar a API.', {toastId: 'hp-error'})
            console.log(erro)
        }finally{
            setLoading(false)
        }
    }

    const action = (id)=> {
        toast(id)
    }

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
