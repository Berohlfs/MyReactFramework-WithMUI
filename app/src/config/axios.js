/*
Esse script serve para configurar o 'axios' (lib utilizada
para facilitar a realização de requisições HTTP à um servidor).

Para mais detalhes, acesse: https://axios-http.com/ptbr/docs/intro
*/

// Libs
import axios from 'axios'
import { toast } from 'react-toastify'

const APIInstance = (navigate) => {

    const instance = axios.create({
        baseURL: 'https://hp-api.onrender.com',
        timeout: 10000,
    })

    instance.interceptors.response.use(
        response=> response,
        error=> {

            if(error?.response?.status === 401){

                navigate && navigate('/')
                sessionStorage.clear()
                toast.warning('Acesso inválido ou expirado (401).', {toastId: 'invalid-token'})

            }else if(error?.response?.status === 500){

                toast.error('Erro interno do servidor (500).', {toastId: 'server-error'})

            }else if(error.code === 'ECONNABORTED' && error.message.includes('timeout')) {

                toast.error('Não foi possível se conectar ao servidor.', {toastId: 'connection-error'})

            }else{

                toast.error('Houve um erro.', {toastId: 'generic-error'})

            }

            console.error(error)

            return Promise.reject(error)

    })

    return instance
}

export default APIInstance
