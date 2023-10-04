// MUI
import { Typography, Alert, Link } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
// React
import { useState } from 'react'

type Props = {
    deleteFunc: ()=> void,
    instance_name: string
}

export const DeleteBar = ({deleteFunc, instance_name}: Props)=> {

    const [confirm, setConfirm] = useState(false)

    const checkDelete = ()=> {
        if(!confirm){ return setConfirm(true) }
        deleteFunc()
    }

    return (

        <Alert
            icon={<DeleteOutlined/>}
            severity={"error"}
            onClick={confirm ? ()=> null : checkDelete}>

                <Typography
                    sx={{cursor: confirm ? 'default' : 'pointer'}}
                    variant={'caption'}>
                        {confirm ? "Are you sure?" : `Click to delete this ${instance_name}.`}
                </Typography>

                {confirm && <>

                <Link
                    sx={{cursor: 'pointer'}}
                    fontSize={11}
                    ml={2}
                    color={'error'}
                    onClick={()=> setConfirm(false)}>
                        Keep
                </Link>

                <Link
                    sx={{cursor: 'pointer'}}
                    fontSize={11}
                    ml={2}
                    color={'error'}
                    onClick={checkDelete}>
                        Delete
                </Link> </> }

        </Alert>

    )
}
