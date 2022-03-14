import React from 'react'
import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { TableCell, TableRow, tableCellClasses } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

export default function TablaCtaCte(props) {

    const { clientes } = useSelector(state => state.clientes)

    const { cuenta } = props;
    const [open, setOpen] = React.useState(false);

    // const convertirFecha = (valor) => {
    //     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };        
    //     let fechaMovimiento = new Date(parseInt(valor)).toLocaleDateString('es-ES', options)

    //     return fechaMovimiento

    // }


    return (
        <>
            <>
                <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">{cuenta.idCliente}</TableCell>
                    <TableCell align="left">
                        {clientes.find(cliente => cliente.idCliente == cuenta.idCliente)?.nombreCompleto}
                    </TableCell>
                    <TableCell align="left">{cuenta.fechaMovimiento}</TableCell>
                    <TableCell align="right" 
                        sx={cuenta.importeMovimiento < 0 && {color: 'red'}}
                    >$ {cuenta.importeMovimiento}</TableCell>
                    <TableCell align="right">$ {cuenta.saldo}</TableCell>
                    <TableCell align="left">{cuenta.Observacion}</TableCell>
                </StyledTableRow>


                
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {cuenta.detalle &&
                            <Box sx={{ margin: 1 }}>
                                
                                <Typography variant="h6" gutterBottom component="div">
                                    Detalle
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">Nro Tropa</TableCell>
                                            <TableCell align="right">Correlativo</TableCell>
                                            <TableCell align="left">Producto</TableCell>
                                            <TableCell align="left">Tipo</TableCell>
                                            <TableCell align="right">Peso</TableCell>
                                            <TableCell align="right">Costo</TableCell>
                                            <TableCell align="right">Precio</TableCell>
                                            <TableCell align="left">Proveedor</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cuenta.detalle?.map((row) => (
                                            <TableRow
                                                key={row.nroTropa + row.correlativo}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="right">{row.nroTropa}</TableCell>
                                                <TableCell align="right">{row.correlativo}</TableCell>
                                                <TableCell align="left">{row.producto}</TableCell>
                                                <TableCell align="left">{row.tipo}</TableCell>
                                                <TableCell align="right">{row.peso}</TableCell>
                                                <TableCell align="right">{row.costo}</TableCell>
                                                <TableCell align="right">{row.precio}</TableCell>
                                                <TableCell align="left">{row.proveedor?.proveedor}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
}
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>

            
        </>
    )
}