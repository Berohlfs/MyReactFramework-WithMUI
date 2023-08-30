// Libs
import axios from 'axios'
import { toast } from 'react-toastify'

const viaCep = async(cep)=> {

    if(cep.replace(/\D/g, '').length != 8){ return false }

    try{
        const res = await axios.get(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`)
        // console.log(res)
        if(res.data.erro){
            toast.warning('CEP não encontrado.', {toastId : 'viaCep-warning'})
            return false
        }
        return res.data
    }catch(erro){
        toast.error('Erro durante a busca do CEP.', {toastId : 'viaCep-erro'})
        console.log(erro)
        return false
    }
}

export default viaCep
