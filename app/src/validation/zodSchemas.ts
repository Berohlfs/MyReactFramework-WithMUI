// Zod validation modules

// Libs
import { z } from 'zod'
import { string_required, date, number_required, boolean_required, cpf } from './zodModules'

export const potionSchema = ()=> {
    return (
        z.object({
            name: string_required,
            select: number_required,
            datepicker: date,
            checkbox: boolean_required,
            radiogroup: string_required
        })
    )
}

export const loginSchema = ()=> {
    return (
        z.object({
            cpf: cpf,
            password: string_required
        })
    )
}
