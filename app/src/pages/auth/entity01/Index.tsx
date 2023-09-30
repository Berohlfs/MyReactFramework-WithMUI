// MUI
import { TaskAltOutlined } from '@mui/icons-material'
// Components
import { CustomTable } from '../../../components/widgets/CustomTable'
// Libs
import { toast } from 'react-toastify'
import axios from 'axios'
// React
import { useEffect, useContext, useState } from 'react'
import { AuthLayoutContext } from '../../../layout/auth/AuthLayout'
import { AppContext } from '../../../App'

export const EntityIndex = ()=> {

    const {setLoading} = useContext(AppContext)!

    const {setBreadcrumbs} = useContext(AuthLayoutContext)!

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
        setBreadcrumbs([{text: 'Characters', link: '/characters'}])
        getCharacters()
    },[])

    return(

        <CustomTable
            title={'Characters'}
            id={'id'}
            add_link={'/new/characters'}
            columns={[
                {name: 'Nome', key: 'name', show_domain_path: '/characters'},
                {name: 'Espécie', key: 'species'},
                {name: 'Sexo', key: 'gender', enum: {'male': 'primary', 'female': 'secondary'}},
            ]}
            data={characters}
            hidden_actions={[{name: 'Get ID', function: action}]}
            actions={[{name: 'Get ID', function: action, icon: TaskAltOutlined}]}/>

    )
}
