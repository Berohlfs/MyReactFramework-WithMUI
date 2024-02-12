// https://www.jsdocs.io/package/z

// Zod validation modules

// Libs
import { z } from 'zod'
import dayjs, { Dayjs } from 'dayjs'

// Common error messages
export const messages = {
    required: 'Obrigatório',
    invalid: 'Inválido',
    large: 'Muito grande'
}

// Default
export const string_required = z.string().min(1, messages.required).max(60, messages.large)
export const string_optional = z.string().max(60, messages.large)
export const number_required = z.union([z.number(), z.string().length(1, messages.required)])
export const number_optional = z.union([z.number(), z.string().length(0)])
export const boolean_required = z.boolean()

// Comuns
export const cpf = string_required.length(11, messages.invalid)
export const cnpj = string_required.length(14, messages.invalid)
export const email = string_required.email(messages.invalid)
export const celular = string_required.length(11, messages.invalid)
export const telefone = string_required.length(10, messages.invalid)
export const cep = string_required.length(8, messages.invalid)
export const data = z
    .union([z.string().nullable(), z.instanceof(dayjs as unknown as typeof Dayjs, { message: messages.invalid })])
    .refine((value) => dayjs(value).isValid(), { message: messages.invalid })
    .transform((value) => dayjs(value).format('YYYY-MM-DD'))
