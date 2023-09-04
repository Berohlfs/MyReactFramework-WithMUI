/*
Esse script serve para configurar o 'axios' (lib utilizada
para facilitar a realização de requisições HTTP à um servidor).

Para mais detalhes, acesse: https://axios-http.com/ptbr/docs/intro
*/

// Libs
import axios from 'axios'

/*
'openInstance' é uma instância do axios que padroniza
o consumo das rotas não NÃO PROTEGIDAS de um servidor específico.
*/
const openInstance = ()=> {
    const instance = axios.create({
        baseURL: 'http://192.168.0.248:8989',
    })

    return instance
}

/*
'authInstance' é uma instância do axios que padroniza
o consumo das rotas PROTEGIDAS de um servidor específico.
*/
const authInstance = ()=> {
    const instance = axios.create({
        baseURL: 'http://192.168.0.248:8989',
        headers: {'Authorization': `Bearer ${sessionStorage.getItem('token')}`}
    })
    /*
    O trecho de código abaixo INTERCEPTA as requisições feitas pela instância
    'authInstance'. Neste exemplo, caso a resposta da requisição retorne
    'erro 401' ("não autorizado"), o usuário é redirecionado à página
    de login.
    */
    instance.interceptors.response.use((response)=>{
        return response
    }, (error)=>{
        if(error?.response?.status === 401){
            // console.log(error)
            window.location.href = '/'
            sessionStorage.clear()
        }
        return Promise.reject(error)
    })

    return instance
}

export { openInstance, authInstance }
