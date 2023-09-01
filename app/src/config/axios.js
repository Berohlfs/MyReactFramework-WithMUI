/*
Esse script serve para configurar o 'axios' (lib utilizada
para facilitar a realização de requisições HTTP à um servidor).

Para mais detalhes, acesse: https://axios-http.com/ptbr/docs/intro
*/

// Libs
import axios from 'axios'

/*
'checkTokenInstance' é uma instância do axios que padroniza
o consumo das rotas não NÃO PROTEGIDAS de um servidor específico.
*/
const checkTokenInstance = axios.create({
    baseURL: 'http://192.168.0.30:8989',
})

/*
'authInstance' é uma instância do axios que padroniza
o consumo das rotas PROTEGIDAS de um servidor específico.
*/
const authInstance = axios.create({
    baseURL: 'http://192.168.0.30:8989',
    headers: {'Authorization': sessionStorage.getItem('token')}
})

/*
O código abaixo INTERCEPTA as requisições feitas pela instância
'authInstance'. Neste exemplo, caso a resposta da requisição retorne
'erro 401' ("não autorizado"), o usuário é redirecionado à página
de login.
*/
authInstance.interceptors.response.use((response)=>{
    return response
}, (error)=>{
    if(error?.response?.status === 401){
        sessionStorage.clear()
        window.location.href = '/'
    }
    return Promise.reject(error)
})

export { checkTokenInstance, authInstance }
