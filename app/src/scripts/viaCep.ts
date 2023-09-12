/*
A função 'viaCep' pode ser utilizada dentro de toda a aplicação.
Para utilizá-la, basta passar o CEP desejado por parâmetro.
*/

// Libs
import axios from 'axios'
import { toast } from 'react-toastify'

const viaCep = async(cep)=> {

    let clean_cep = String(cep).replace(/\D/g, '')

    if(clean_cep.length != 8){ return false }

    try{
        const res = await axios.get(`https://viacep.com.br/ws/${clean_cep}/json/`)
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
