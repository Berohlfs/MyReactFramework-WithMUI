// Components
import PageCard from "../../components/containers/PageCard"

const NotFound = ()=> {
    return (
        <PageCard
            title={'Erro 404'}
            caption={'Page not found'}
            link={{text: 'Go back?', path: '/characters', label: 'Go!'}}
        />
    )
}

export default NotFound
