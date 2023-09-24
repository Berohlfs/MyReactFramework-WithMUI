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

// 'Pessoais/corporativos'
export const cpf = yup.string().required(messages.required).length(14, messages.invalid)
export const cnpj = yup.string().required(messages.required).length(18, messages.invalid)
export const email = yup.string().required(messages.required).email(messages.invalid).max(40, messages.large)
export const celular = yup.string().required(messages.required).length(16, messages.invalid)
export const telefone = yup.string().required(messages.required).length(14, messages.invalid)
export const default_required = yup.string().required(messages.required).max(40, messages.large)
export const default_optional = yup.string().max(40, messages.large)

// 'Dados bancários'
export const numero_do_banco = yup.string().required(messages.required).length(3, messages.invalid)
export const conta_corrente = yup.string().required(messages.required).max(10, messages.large)
export const digito_cc = yup.string().required(messages.required).length(1, messages.invalid)
export const agencia = yup.string().required(messages.required).length(4, messages.invalid)
export const pix = yup.string().required(messages.required).max(40, messages.large)

// 'Endereço'
export const cep = yup.string().required(messages.required).length(10, messages.invalid)
export const logradouro = yup.string().required(messages.required).max(40, messages.large)
export const numero = yup.string().required(messages.required).max(15, messages.large)
export const complemento = yup.string().max(15, messages.large)
export const bairro = yup.string().required(messages.required).max(25, messages.large)
export const cidade = yup.string().required(messages.required).max(40, messages.large)
export const estado = yup.string().required(messages.required).length(2, messages.invalid)

// 'Outros'
export const date = yup.string().required(messages.required).notOneOf(['Invalid Date'], messages.invalid).transform((value)=>dayjs(value).format('YYYY-MM-DD'))