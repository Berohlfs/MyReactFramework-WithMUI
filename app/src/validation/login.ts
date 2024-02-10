// Libs
import { z } from 'zod'
import { string_required, cpf } from '../utils/zodModules'

export const loginSchema = ()=> {
    return (
        z.object({
            cpf: cpf,
            password: string_required
        })
    )
}

export const login_default_values = {
    cpf: '',
    password: ''
}