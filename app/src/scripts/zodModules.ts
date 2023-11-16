// https://www.jsdocs.io/package/z

// Zod validation modules

// Libs
import { z } from 'zod'
import dayjs, { type Dayjs } from 'dayjs'

// Common error messages
export const messages = {
    required: 'Obrigatório',
    invalid: 'Inválido',
    large: 'Muito grande'
}

// Default
export const string_required = z.string().min(1, messages.required).max(60, messages.large)
export const string_optional = z.string().max(60, messages.large).optional()

// 'Pessoais/corporativos'
export const cpf = z.string().min(1, messages.required).length(11, messages.invalid)
export const cnpj = z.string().min(1, messages.required).length(14, messages.invalid)
export const email = string_required.email(messages.invalid)
export const celular = z.string().min(1, messages.required).length(11, messages.invalid)
export const telefone = z.string().min(1, messages.required).length(10, messages.invalid)

// 'Dados bancários'
export const numero_do_banco = z.string().min(1, messages.required).length(3, messages.invalid)
export const conta_corrente = string_required
export const digito_cc = z.string().min(1, messages.required).length(1, messages.invalid)
export const agencia = z.string().min(1, messages.required).length(4, messages.invalid)
export const pix = string_required

// 'Endereço'
export const cep = z.string().min(1, messages.required).length(8, messages.invalid)
export const logradouro = string_required
export const numero = string_optional
export const complemento = string_optional
export const bairro = string_required
export const cidade = string_required
export const estado = z.string().min(1, messages.required).length(2, messages.invalid)

// 'Outros'
export const date = z
  .union([z.string(), z.instanceof(dayjs as unknown as typeof Dayjs, { message: 'Inválido' })])
  .refine((value) => dayjs(value).isValid(), { message: 'Inválido' })
  .transform((value) => dayjs(value).format('YYYY-MM-DD'))
