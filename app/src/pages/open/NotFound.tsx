// Components
import PageCard from "../../components/containers/PageCard"

const NotFound = ()=> {
    return (
        <PageCard
            title={'Erro 404'}
            caption={'Página não encontrada'}
            link={{text: 'Voltar à tela inicial?', path: '/characters', label: 'Voltar'}}
        />
    )
}

export default NotFound
