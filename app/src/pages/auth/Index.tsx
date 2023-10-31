// MUI
import { TaskAltOutlined } from '@mui/icons-material'
// Components
import { CustomTable } from '../../components/widgets/CustomTable'
// Libs
import { toast } from 'sonner'
import axios from 'axios'
// React
import { useEffect, useContext, useState } from 'react'
import { AppContext } from '../../App'

export const EntityIndex = () => {

    const { setLoading } = useContext(AppContext)!

    // GET - Characters
    type Character = {
        [key: string]: string
    }

    type Characters = Character[]

    const [characters, setCharacters] = useState<Characters>([])

    const getCharacters = async () => {
        setLoading({render: true})
        try {
            const res = await axios.get('https://hp-api.onrender.com/api/characters/house/gryffindor')
            setCharacters(res.data)
            console.log(res.data)
        } catch (erro) {
            console.log(erro)
            toast.error('API Error.', {id: 'Error'})
        } finally {
            setLoading({render: false})
        }
    }

    // Table mock action
    const action = (id: string) => {
        toast.success(id)
    }

    // OnLoad
    useEffect(() => {
        getCharacters()
    }, [])

    return (

        <CustomTable
            title={'Personagens'}
            id={'id'}
            add_link={'/new/entity'}
            columns={[
                { name: 'Nome', key: 'name', show_domain_path: '/entity' },
                { name: 'Espécie', key: 'species' },
                { name: 'Gênero', key: 'gender', enum: { 'male': 'primary', 'female': 'secondary' } },
            ]}
            data={characters}
            hidden_actions={[{ name: 'Retornar ID', function: action }]}
            actions={[{ name: 'Retornar ID', function: action, icon: TaskAltOutlined }]} />

    )
}
