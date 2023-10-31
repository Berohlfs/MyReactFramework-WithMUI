// MUI
import { Typography, Alert, Stack, Button } from '@mui/material'
import { DeleteOutlined } from '@mui/icons-material'
// React
import { useState } from 'react'
// Components
import { Modal } from '../containers/Modal'

type Props = {
    deleteFunc: ()=> void,
    instance_name: string
}

export const DeleteBar = ({deleteFunc, instance_name}: Props)=> {

    const [confirm, setConfirm] = useState(false)

    return (<>

        <Alert
            icon={<DeleteOutlined/>}
            sx={{cursor: 'pointer'}}
            severity={"error"}
            onClick={()=> setConfirm(true)}>

                <Typography variant={'caption'}>
                    {`Delete ${instance_name}`}
                </Typography>

        </Alert>

        <Modal
            open={confirm}
            handleClose={()=> setConfirm(false)}
            title={`Delete ${instance_name}`}
            max_width={400}>

            <Typography variant={'caption'}>
                Are you sure?
            </Typography>

            <Stack direction={'row'} spacing={1} mt={2}>
                <Button
                    fullWidth
                    onClick={()=> setConfirm(false)}>
                        Cancelar
                </Button>
                <Button
                    fullWidth
                    onClick={deleteFunc}
                    color={'error'}>
                        Delete
                </Button>
            </Stack>
        </Modal>

    </>)
}
