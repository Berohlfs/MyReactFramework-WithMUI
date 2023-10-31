// https://www.jsdocs.io/package/yup

// Yup validation modules

// Libs
import * as yup from 'yup'
import dayjs from 'dayjs'

// Common error messages
export const messages = {
    required: 'Obrigatório',
    invalid: 'Inválido',
    large: 'Muito grande'
}

// Default
export const string_required = yup.string().required(messages.required).max(60, messages.large)
export const string_optional = yup.string().max(60, messages.large)
export const number_required = yup.number().required(messages.required)
export const number_optional = yup.number()

// 'Pessoais/corporativos'
export const cpf = yup.string().required(messages.required).length(11, messages.invalid)
export const cnpj = yup.string().required(messages.required).length(14, messages.invalid)
export const email = yup.string().required(messages.required).email(messages.invalid).max(40, messages.large)
export const celular = yup.string().required(messages.required).length(11, messages.invalid)
export const telefone = yup.string().required(messages.required).length(10, messages.invalid)

// 'Dados bancários'
export const numero_do_banco = yup.string().required(messages.required).length(3, messages.invalid)
export const conta_corrente = yup.string().required(messages.required).max(10, messages.large)
export const digito_cc = yup.string().required(messages.required).length(1, messages.invalid)
export const agencia = yup.string().required(messages.required).length(4, messages.invalid)
export const pix = string_required

// 'Endereço'
export const cep = yup.string().required(messages.required).length(8, messages.invalid)
export const logradouro = string_required
export const numero = number_required.max(1000000, messages.large).min(0, messages.invalid)
export const complemento = string_optional
export const bairro = string_required
export const cidade = string_required
export const estado = yup.string().required(messages.required).length(2, messages.invalid)

// 'Outros'
export const date = yup.string().required(messages.required).notOneOf(['Invalid Date'], messages.invalid).transform((value)=>dayjs(value).format('YYYY-MM-DD'))
