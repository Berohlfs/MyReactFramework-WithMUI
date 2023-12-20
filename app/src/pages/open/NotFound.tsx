// Components
import { PageCard } from '../../components/containers/PageCard'

export const NotFound = () => {
    return (
        <PageCard
            title={'Erro 404'}
            caption={'Página não encontrada.'}
            link={{ text: 'Voltar ao início?', path: '/potions', label: 'Voltar!' }}
        />
    )
}
