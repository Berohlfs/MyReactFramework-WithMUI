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

export const ListPotions = () => {
    const { setLoading } = useContext(AppContext)!

    type Potions = {
        data: {
            attributes: {
                name: string
            }
        }[]
        meta: {
            pagination: {
                current: number
                records: number
            }
        }
    }

    const [potions, setPotions] = useState<Potions | null>(null)
    
    type Response = {
        data: Potions
    }

    const indexPotions = async (page: number = 1) => {
        setLoading({ render: true })
        try {
            const res: Response = await axios.get(
                `https://api.potterdb.com/v1/potions?page[size]=15&page[number]=${page}`
            )
            setPotions(res.data)
            console.log(res.data)
        } catch (erro) {
            console.log(erro)
            toast.error('API Error.', { id: 'Error' })
        } finally {
            setLoading({ render: false })
        }
    }

    // Table mock action
    const action = (id: string) => {
        toast.success(id)
    }

    useEffect(() => {
        indexPotions()
    }, [])

    return (
        <CustomTable
            title={'Poções'}
            id={'id'}
            add_route={'/new/potion'}
            columns={[
                { name: 'Nome', key: 'attributes.name', show_domain_path: '/potions' },
                { name: 'Ingredientes', key: 'attributes.ingredients' },
                {
                    name: 'Dificuldade',
                    key: 'attributes.difficulty',
                    enum: {
                        Advanced: 'error',
                        'Moderate to Advanced': 'warning',
                        Moderate: 'primary',
                        'Beginner to Moderate': 'secondary',
                        Beginner: 'success'
                    }
                }
            ]}
            data={potions ? potions.data : []}
            pagination_data={
                potions
                    ? {
                          total_records: potions.meta.pagination.records,
                          current_page: potions.meta.pagination.current
                      }
                    : undefined
            }
            fetchFunction={indexPotions}
            hidden_actions={[{ name: 'Retornar ID', function: action }]}
            actions={[{ name: 'Retornar ID', function: action, icon: TaskAltOutlined }]}
        />
    )
}
