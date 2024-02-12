// https://axios-http.com/ptbr/docs/intro

// Libs
import axios from 'axios'
import { toast } from 'sonner'
import Cookies from 'js-cookie'

export const APIInstance = (navigate?: (path: string) => void, success_toast = true) => {
    const instance = axios.create({
        baseURL: 'backend_url',
        timeout: 20000,
        headers: { Authorization: `Bearer ${Cookies.get('access')}` }
    })

    instance.interceptors.response.use(
        (response) => {
            success_toast &&
                toast.success(`${response.data.message} (${response.status})`, { id: 'server-success-feedback' })

            return response
        },
        (error) => {
            if (error?.code === 'ECONNABORTED' && error?.message.includes('timeout')) {
                toast.error('Servidor indisponível.', { id: 'timeout' })
            } else if (error?.response.status) {
                if (error.response.status === 401) {
                    navigate && navigate('/')
                    Cookies.remove('access')
                }

                toast.warning(`${error.response?.data.message} (${error.response.status})`, {
                    id: 'server-error-feedback'
                })
            } else {
                toast.error('Houve um erro.', { id: 'unknown-error' })
            }

            console.error(error)

            return Promise.reject(error)
        }
    )

    return instance
}
