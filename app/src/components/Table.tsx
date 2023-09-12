// MUI
import MuiTable from '@mui/material/Table'
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip } from '@mui/material'
// Libs
import { Link } from 'react-router-dom'
// React hooks
import { useMemo } from 'react'

const Table = ({ columns=[], data=[], actions=[], row_key})=> {

  /*
    Tabelas podem se tornar grandes e pesadas. Dito isso, para evitar que uma tabela seja
    desnecessariamente 're-renderizada', utilizamos um hook nativo de React: o 'useMemo()'.

    Em resumo, esse hook evita que uma função seja executada novamente em situações em que
    o resultado é previsível. Na implementação abaixo, a tabela é renderizada apenas quando
    os dados fornecidos (data) sofrem alguma alteração (aumentando significativamente a
    performance da aplicação).
  */

  const table = useMemo(()=> (

    <Paper sx={{overflow: 'hidden'}}>

      <TableContainer sx={{ maxHeight: 460 }}>
        <MuiTable stickyHeader>

          <TableHead>

            <TableRow>

              {columns.map((column, index)=>(

                <TableCell sx={{fontSize: '12px'}} key={index}>
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

              <TableRow key={row[row_key]}>

                {columns.map((column, index)=> (

                  <TableCell sx={{fontSize: '11px', padding: '10px 16px'}} key={index}>

                    {column.enum  ?

                    <Chip
                      size={'small'}
                      color={column.enum[row[column.chave]]}
                      sx={{fontSize: '10px'}}
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

                  <TableCell sx={{padding: '4px 16px'}} key={index}>

                    <Tooltip placement={'left'} title={action.nome}>
                        <IconButton  onClick={()=> action.function(row[action.param])}>
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
