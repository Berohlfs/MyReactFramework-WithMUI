// https://axios-http.com/ptbr/docs/intro

// Libs
import axios from 'axios'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const APIInstance = (navigate)=> {

    const instance = axios.create({
        baseURL: 'https://hp-api.onrender.com',
        timeout: 10000,
        // withCredentials: true
    })

    instance.interceptors.response.use(
        response=> response,
        error=> {
            if(error?.code === 'ECONNABORTED' && error?.message.includes('timeout')) {

                toast.error('Servidor indisponível.', {toastId: 'timeout'})

            }else if(error?.response?.status === 500){

                toast.warning('Erro interno do servidor (500).', {toastId: 'internal-server-error'})

            }else if(error?.response?.status){

                if(error?.response?.status === 401){
                    navigate && navigate('/')
                    Cookies.remove('access')
                }

                toast.warning(`${error.response?.data?.message} (${error.response.status})`, {toastId: 'server-feedback'})

            }else{

                toast.error('Houve um erro.', {toastId: 'unmapped-error'})

            }

            console.error(error)

            return Promise.reject(error)

    })

    return instance
}

export default APIInstance
