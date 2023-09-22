// Yup validation modules

// Libs
import * as yup from 'yup'
import dayjs from 'dayjs'

export const date = yup.string().required('Obrigatório').not(['Invalid Date'], 'inválido').transform((value)=> dayjs(value).format('YYYY-MM-DD'))
