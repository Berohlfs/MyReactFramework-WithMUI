// MUI
import {
    Table,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    IconButton,
    Chip,
    Tooltip,
    Button,
    Stack,
    Divider,
    Typography
} from '@mui/material'
import { Add } from '@mui/icons-material'
// Libs
import { Link, useNavigate } from 'react-router-dom'
// React
import { useMemo, FC } from 'react'
// Components
import { Menu } from './Menu'
// Types
import { type HiddenAction } from './Menu'

type Enum = {
    [key: string]: 'primary' | 'secondary' | 'success' | 'error' | 'warning'
}

type Column = {
    name: string
    key: string
    show_domain_path?: string
    enum?: Enum
}

type Action = {
    name: string
    function: (id: string) => void
    icon: FC<{ sx?: { fontSize: number } }>
}

export type JSONDataInstance = {
    [key: string]: string | number | boolean | JSONDataInstance | (string | number | boolean)[]
}

type PaginationData = {
    records: number
    current: number
}

type Props = {
    title: string
    add_link?: string
    id: string
    data: JSONDataInstance[]
    pagination_data?: PaginationData
    columns: Column[]
    actions?: Action[]
    hidden_actions?: HiddenAction[]
    fetchFunction: (page: number) => void
}

export const CustomTable = ({
    title,
    add_link,
    id,
    data,
    pagination_data,
    columns,
    actions,
    hidden_actions,
    fetchFunction
}: Props) => {
    const navigate = useNavigate()

    const getCellData = (key: string, row_data: JSONDataInstance): string => {
        const error = 'Sem dado'
        const split_key = key.split('.')
        const result = split_key.reduce((accumulator: JSONDataInstance | string | number | boolean | (string | number | boolean)[], prop) => {

            if(typeof accumulator === 'object' && !(accumulator instanceof Array) && accumulator[prop]){
                return accumulator[prop]
            }else{
                return accumulator
            }

        }, row_data)

        if (typeof result !== 'string' && typeof result !== 'number') {
            return error
        }

        return String(result)
    }

    const table = useMemo(
        () => (
            <Paper sx={{ overflow: 'hidden' }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1} padding={2}>
                    <Typography>{title}</Typography>

                    {add_link && (
                        <Button endIcon={<Add />} onClick={() => navigate(add_link)}>
                            Adicionar
                        </Button>
                    )}
                </Stack>

                <Divider />

                <TableContainer sx={{ maxHeight: 420 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {hidden_actions && <TableCell sx={{ width: 30 }}></TableCell>}

                                {columns.map((column, index) => (
                                    <TableCell key={index}>{column.name}</TableCell>
                                ))}

                                {actions &&
                                    actions.map((action) => <TableCell key={action.name}>{action.name}</TableCell>)}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={getCellData(id, row)}>
                                    {hidden_actions && (
                                        <TableCell>
                                            <Menu id={getCellData(id, row)} hidden_actions={hidden_actions} />
                                        </TableCell>
                                    )}

                                    {columns.map((column, index) => (
                                        <TableCell key={index} sx={{ maxWidth: 150, overflow: 'hidden' }}>
                                            {column.enum ? (
                                                <Chip
                                                    color={column.enum[getCellData(column.key, row)]}
                                                    label={getCellData(column.key, row)}
                                                />
                                            ) : column.show_domain_path ? (
                                                <Link to={`${column.show_domain_path}/${row[id]}`}>
                                                    {getCellData(column.key, row)}
                                                </Link>
                                            ) : (
                                                getCellData(column.key, row)
                                            )}
                                        </TableCell>
                                    ))}

                                    {actions &&
                                        actions.map((action, index) => (
                                            <TableCell key={index}>
                                                <Tooltip placement={'left'} title={action.name}>
                                                    <IconButton onClick={() => action.function(getCellData(id, row))}>
                                                        <action.icon sx={{ fontSize: 15 }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {pagination_data && (
                    <TablePagination
                        component={'div'}
                        rowsPerPage={15}
                        rowsPerPageOptions={[15]}
                        page={pagination_data.current - 1}
                        onPageChange={(e: unknown, page) => fetchFunction(page + 1)}
                        count={pagination_data.records}
                    />
                )}
            </Paper>
        ),
        [data]
    )

    return table
}
