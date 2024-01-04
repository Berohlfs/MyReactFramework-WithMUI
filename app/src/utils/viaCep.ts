// Libs
import axios from 'axios'
import { toast } from 'sonner'

export const viaCep = async (cep: string) => {
    const clean_cep = cep.replace(/\D/g, '')

    if (clean_cep.length != 8) {
        return false
    }

    try {
        const res = await axios.get(`https://viacep.com.br/ws/${clean_cep}/json/`)
        // console.log(res)
        if (res.data.erro) {
            toast.warning('CEP não encontrado.', { id: 'viaCep-warning' })
            return false
        }
        return res.data
    } catch (erro) {
        toast.error('Erro durante a busca do CEP.', { id: 'viaCep-error' })
        console.log(erro)
        return false
    }
}
