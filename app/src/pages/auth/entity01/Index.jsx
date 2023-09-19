// MUI
import { TaskAltOutlined } from '@mui/icons-material'
// Components
import Table from '../../../components/Table'
import AuthBlock from '../../../components/AuthBlock'
// Libs
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// React hooks
import { useEffect, useContext, useState } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'
import { AppContext } from '../../../App'
// Config
import APIInstance from '../../../config/axios'

const EntityIndex = ()=> {

    const navigate = useNavigate()

    const {setLoading} = useContext(AppContext)

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

    // Table mock action
    const action = (id)=> {
        toast(id)
    }

    // OnLoad
    useEffect(()=>{
        setBreadcrumbs([{text: 'Characters', link: '/characters'}])
        getCharacters()
    },[])

    return(

        <AuthBlock type={'box'}>

            <Table
                title={'Characters'}
                id={'id'}
                add_link={'/novo/characters'}
                columns={[
                    {name: 'Nome', key: 'name', link_path: 'characters'},
                    {name: 'Espécie', key: 'species'},
                    {name: 'Sexo', key: 'gender', enum: {'male' : 'primary', 'female': 'secondary'}},
                ]}
                data={characters}
                hidden_actions={[{name: 'Get ID', function: action}]}
                actions={[{name: 'Get ID', function: action, icon: TaskAltOutlined}]}
            />

        </AuthBlock>

    )
}

export default EntityIndex
