// Libs
import axios from 'axios'

const checkTokenInstance = axios.create({
    baseURL: 'http://192.168.0.30:8989',
})

const authInstance = axios.create({
    baseURL: 'http://192.168.0.30:8989',
    headers: {'Authorization': sessionStorage.getItem('token')}
})

authInstance.interceptors.response.use((response)=>{
    return response
}, (error)=>{
    if(error?.response?.status === 401){
        window.location.href = '/'
    }
    return Promise.reject(error)
})

export { checkTokenInstance, authInstance }
