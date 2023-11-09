// MUI
import {
    Table,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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

type HiddenAction = {
    name: string
    function: (id: string) => void
}

type DataInstance = {
    [key: string]: any
}

type Props = {
    title: string
    add_link?: string
    id: string
    data: DataInstance[]
    columns: Column[]
    actions?: Action[]
    hidden_actions?: HiddenAction[]
}

export const CustomTable = ({ title, add_link, id, data, columns, actions, hidden_actions }: Props) => {
    const navigate = useNavigate()

    const table = useMemo(
        () => (
            <Paper sx={{ overflow: 'hidden' }}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1} padding={2}>
                    <Typography>{title}</Typography>

                    {add_link && (
                        <Button variant={'outlined'} endIcon={<Add />} onClick={() => navigate(add_link)}>
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
                                <TableRow key={row[id]}>
                                    {hidden_actions && (
                                        <TableCell>
                                            <Menu id={row[id]} hidden_actions={hidden_actions} />
                                        </TableCell>
                                    )}

                                    {columns.map((column, index) => (
                                        <TableCell key={index}>
                                            {column.enum ? (
                                                <Chip color={column.enum[row[column.key]]} label={row[column.key]} />
                                            ) : column.show_domain_path ? (
                                                <Link to={`${column.show_domain_path}/${row[id]}`}>
                                                    {row[column.key]}
                                                </Link>
                                            ) : (
                                                row[column.key]
                                            )}
                                        </TableCell>
                                    ))}

                                    {actions &&
                                        actions.map((action, index) => (
                                            <TableCell key={index}>
                                                <Tooltip placement={'left'} title={action.name}>
                                                    <IconButton onClick={() => action.function(row[id])}>
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
            </Paper>
        ),
        [data]
    )

    return table
}
