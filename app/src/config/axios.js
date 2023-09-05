/*
Esse script serve para configurar o 'axios' (lib utilizada
para facilitar a realização de requisições HTTP à um servidor).

Para mais detalhes, acesse: https://axios-http.com/ptbr/docs/intro
*/

// Libs
import axios from 'axios'
import { toast } from 'react-toastify'

const APIInstance = (navigate)=> {
    /*
    O método do hook 'useNavigate()' (react-router-dom) foi passado por parâmetro.
    Isso foi preciso pois hooks em React só podem ser inicializados dentro de componentes.
    */
    const instance = axios.create({
        baseURL: 'http://192.168.0.248:8989',
        timeout: 10000,
        headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    })

    instance.interceptors.response.use(
        response=> response,
        error=> {

            if(error?.response?.status === 401){
                navigate('/')
                sessionStorage.clear()
                toast.warning('Acesso inválido ou expirado. Faça seu login (401).', {toastId: 'invalid-token'})

            }else if(error?.response?.status === 500){

                toast.error('Erro interno do servidor (500).', {toastId: 'server-error'})

            }else if(error.code === 'ECONNABORTED' && error.message.includes('timeout')) {

                toast.error('Não foi possível se conectar ao servidor.', {toastId: 'connection-error'})

            }

            return Promise.reject(error)

    })

    return instance
}

export default APIInstance
