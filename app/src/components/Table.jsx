// MUI
import MuiTable from '@mui/material/Table'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip, Button, Stack, Divider, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
// Libs
import { Link, useNavigate } from 'react-router-dom'
// React hooks
import { useMemo } from 'react'
// Components
import Menu from './Menu'

const Table = ({title, id, columns=[], data=[], actions=[], hidden_actions, add_link})=> {

  const navigate = useNavigate()

  const table = useMemo(()=> (

    <Paper sx={{overflow: 'hidden', borderRadius: '10px'}}>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        spacing={1}
        padding={2}>

        <Typography color={'primary'}>{title}</Typography>

        <Button
          variant={'outlined'}
          endIcon={<Add/>}
          onClick={()=>navigate(add_link)}>
            Novo
        </Button>

      </Stack>

      <Divider/>

      <TableContainer sx={{ maxHeight: 420 }}>
        <MuiTable stickyHeader>

          <TableHead>

            <TableRow>

              {hidden_actions &&

                <TableCell sx={{width: 30}}></TableCell>

              }

              {columns.map((column, index)=>(

                <TableCell key={index}>
                    {column.nome}
                </TableCell>

              ))}

              {actions.map((index)=>(

                <TableCell key={index}></TableCell>

              ))}

            </TableRow>

          </TableHead>

          <TableBody>

            {data.map((row) => (

              <TableRow key={row[id]}>

                {hidden_actions &&

                  <TableCell>

                    <Menu param={row[id]} hidden_actions={hidden_actions}/>

                  </TableCell>

                }

                {columns.map((column, index)=> (

                  <TableCell key={index}>

                    {column.enum  ?

                    <Chip
                      color={column.enum[row[column.chave]]}
                      label={row[column.chave]}/>

                    :

                    column.link  ?

                    <Link to={`/${column.link.path}/${row[column.link.chave]}`}>

                        {row[column.chave]}

                    </Link>

                    :

                    row[column.chave]}

                  </TableCell>

                ))}

                {actions.map((action, index)=>(

                  <TableCell key={index}>

                    <Tooltip placement={'left'} title={action.nome}>
                        <IconButton onClick={()=> action.function(row[id])}>
                          <action.icon sx={{fontSize: '15px'}}/>
                        </IconButton>
                    </Tooltip>

                  </TableCell>

                ))}

              </TableRow>

            ))}

          </TableBody>

        </MuiTable>
      </TableContainer>

    </Paper>

  ), [data])

  return (

    table

  )
}

export default Table
