import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import ViewListIcon from '@material-ui/icons/ViewList';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import DateAdapter from '@mui/lab/AdapterDayjs';
import enLocale from 'dayjs/locale/es';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

import { setMenu } from '../redux/actions/ui';
import { newPago, startLoadingCtaCte } from '../redux/actions/ctaCteActions';
import TablaCtaCte from './TablaCtaCte';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
    },
    grilla: {
        marginTop: theme.spacing(2),
        '& .font-tabular-nums': {
            fontVariantNumeric: 'tabular-nums',
        }
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

const localeMap = {
    en: enLocale,
};

const maskMap = {
    en: '__/__/____',
  };

export default function ListadoCtaCte() {

    const { cuentas } = useSelector(state => state.ctaCte)
    const { clientes } = useSelector(state => state.clientes)

    const [cuentaCliente, setCuentaCliente] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [openPago, setOpenPago] = React.useState(false);
    const [valueTextCliente, setValueTextCliente] = React.useState(null);
    const [txtImporte, setTxtImporte] =React.useState()
    const [txtObservacion, setTxtObservacion] = React.useState('')
    const [txtFechaDesde, setTxtFechaDesde] = React.useState(new Date());
    const [txtFechaHasta, setTxtFechaHasta] = React.useState(new Date());


    
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch( startLoadingCtaCte() );
        
    }, [ dispatch, valueTextCliente ])

    const clickOpenPago = () => {
        setOpenPago(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClosePago = () => {
        setOpenPago(false);
    };    

    const handleVolver = ( e ) => {
        dispatch( setMenu( true ) )
    }

    const handleAceptar = () => {
        dispatch( newPago(  txtImporte, txtObservacion, valueTextCliente.idCliente ))
        setOpenPago(false)
    }

    const clearText = () => {
        setTxtImporte('')
        setTxtObservacion('')
    }

    const filtrarXFechas = (cuentas, cliente) => {
        let datos = []
        let fechaDesde = dayjs(txtFechaDesde).subtract(1, 'day').format('DD/MM/YYYY')
        let fechaHasta = dayjs(txtFechaHasta).add(1, 'day').format('DD/MM/YYYY')

        datos = cuentas.filter( (cuenta) =>  cuenta.idCliente == cliente?.idCliente 
                                             && dayjs(cuenta.fechaMovimiento).isBetween(fechaDesde, fechaHasta)
        )

        return datos
    }


    return (
        <>
        <Container>

                <Grid 
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className={classes.root}
                >
                    <Grid item >
                        <h3>Cuenta Corriente</h3>
                        <Link to="#" style={{textDecoration: 'none'}}>
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={ clickOpenPago }
                            >
                                PAGO
                            </Button>
                        </Link>
                    </Grid>

                    
                    <Grid item >
                        <Link to="/dashboard" style={{textDecoration: 'none'}}>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                startIcon={<FirstPageIcon />}
                                onClick={ handleVolver }
                            >
                                VOLVER
                            </Button>
                        </Link>
                    </Grid>

                </Grid>

                <Box>

                <Grid
                    className={classes.root}
                    container
                    justifyContent="space-around"
                    alignItems="center"
                    
                >

                        <Autocomplete                            
                            size='small'
                            disablePortal
                            value={valueTextCliente}
                            onChange={(event, newValue) => {
                                // let datos = []
                                setValueTextCliente(newValue);

                                // datos = cuentas.filter( (cuenta) =>  cuenta.idCliente == newValue?.idCliente )
                                setCuentaCliente( filtrarXFechas(cuentas, newValue) )
                            }}
                            id="cliente"
                            options={clientes}
                            // options={proveedores.map((proveedor) => proveedor.nroProveedor)}
                            getOptionLabel={(cliente) => cliente.nombreCompleto}
                            renderInput={(params) => (
                                <TextField {...params} 
                                    label="Cliente"
                                    sx={{width: 300}}
                                />
                            )}
                        />

                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <DesktopDatePicker
                                label="Fecha Desde"
                                value={txtFechaDesde}
                                mask={maskMap['en']}
                                onChange={(newValue) => {
                                    setTxtFechaDesde(newValue);
                                    setCuentaCliente( filtrarXFechas(cuentas, newValue) )
                                }}
                                renderInput={(params) => <TextField {...params} size='small'/>}
                            />

                            <DesktopDatePicker
                                label="Fecha Hasta"
                                value={txtFechaHasta}
                                onChange={(newValue) => {
                                    setTxtFechaHasta(newValue);
                                    setCuentaCliente( filtrarXFechas(cuentas, newValue) )
                                }}
                                renderInput={(params) => <TextField {...params} size='small'/>}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <TableContainer component={Paper} className={classes.grilla}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell />
                                    <StyledTableCell align="right">ID Cliente</StyledTableCell>
                                    <StyledTableCell align="left">Cliente</StyledTableCell>
                                    <StyledTableCell align="left">Fecha</StyledTableCell>
                                    <StyledTableCell align="right">Importe</StyledTableCell>
                                    <StyledTableCell align="right">Saldo</StyledTableCell>
                                    <StyledTableCell align="left">Observacion</StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {cuentaCliente.map((cuenta) => (
                                    <TablaCtaCte key={cuenta.id} cuenta={cuenta}/>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

        </Container>

        <Dialog open={openPago} onClose={handleClosePago}>
            <DialogTitle>Pago</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="importe"
                        label="Importe"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => {
                            setTxtImporte(event.target.value);
                        }}
                    />

                    <TextField
                        id="observacion"
                        label="Observacion"
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => {
                            setTxtObservacion(event.target.value);
                        }}
                    />              


                </Box>
            </DialogContent>

            <DialogActions>
            <Button onClick={handleAceptar} >Aceptar</Button>
            </DialogActions>
        </Dialog>
        
    </>
    )
}
