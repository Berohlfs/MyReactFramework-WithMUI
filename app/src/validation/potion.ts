// Libs
import { z } from 'zod'
import { string_required, date, number_required, boolean_required } from '../utils/zodModules'

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

export const potion_default_values = {
    name: '',
    select: 1,
    checkbox: true,
    datepicker: '10-30-2023',
    radiogroup: '1'
}



