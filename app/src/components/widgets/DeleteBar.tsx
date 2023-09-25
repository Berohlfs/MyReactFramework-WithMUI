// MUI
import { Typography, Alert, Link } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
// React
import { useState } from 'react'

type Props = {
    deleteFunc: ()=> void
}

export const DeleteBar = ({deleteFunc}: Props)=> {

    const [confirm, setConfirm] = useState(false)

    const checkDelete = ()=> {
        if(!confirm){ return setConfirm(true) }
        deleteFunc()
    }

    return (

        <Alert
            icon={<DeleteOutlined/>}
            sx={{boxShadow: 0}}
            severity={"error"}
            onClick={confirm ? ()=> null : checkDelete}>

            <Typography
                variant={'caption'}
                sx={{cursor: 'pointer'}}>
                    {confirm ? "Tem certeza?" : "Clique para excluir este registro."}
            </Typography>

            {confirm && <>

                <Link
                    sx={{cursor: 'pointer'}}
                    fontSize={11}
                    ml={2}
                    color={'error'}
                    onClick={()=> setConfirm(false)}>
                        Manter
                </Link>

                <Link
                    sx={{cursor: 'pointer'}}
                    fontSize={11}
                    ml={2}
                    color={'error'}
                    onClick={checkDelete}>
                        Excluir
                </Link>

            </>}

        </Alert>

    )
}
