import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Swal from 'sweetalert2';

import { addItems, startDeleteStock, startLoadingStock, updateStock } from '../redux/actions/stockAction';
import { SelectFieldProducto, SelectFieldCliente } from '../helpers/inputTables';
import { addCuenta } from '../redux/actions/ctaCteActions';
import { removeError, setError } from '../redux/actions/ui';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      flexGrow: 1,
  },
  grilla: {
      marginTop: theme.spacing(2),
  }
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function StockAll( frigorifico ) {

  const items = useSelector(state => state.stock.items.filter( item => item.idFrigorifico == frigorifico.frigorifico?.idFrigorifico  ))
  const { clientes } = useSelector(state => state.clientes)
  const { proveedores } = useSelector(state => state.proveedores)
  const { msgError } = useSelector(state => state.ui)

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);


  const [valueTextProveedor, setValueTextProveedor] = React.useState(null);
  const [txtCantidad, setTxtCantidad] = useState()
  const [txtNroTropa, setTxtNroTropa] = useState()
  const [txtCorrelativo, setTxtCorrelativo] = useState()
  const [txtCosto, setTxtCosto] = useState()

  const [selection, setSelection] = useState([])

  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickSnack = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    
    setOpenSnack(false);
    dispatch( removeError() )

  };

  const cleanInput = () => {
    setValueTextProveedor(null)
    setTxtCantidad(null)
    setTxtNroTropa(null)
    setTxtCorrelativo(null)
    setTxtCosto(null)
  }

  const newItems = () => {

    if (valueTextProveedor && txtCantidad && txtNroTropa && txtCorrelativo && txtCosto) {
      dispatch( addItems( frigorifico.frigorifico.idFrigorifico, txtCantidad, txtNroTropa, txtCorrelativo, valueTextProveedor, txtCosto) )
      handleClose();
      cleanInput();
    }
  }

  const uploadCtaCte = async () => {
    
    let error = false
    let articulosCompletos = []

    selection.map( idArticulo => {

      let articulo = items.find( item => item.id == idArticulo )

      if(articulo.idCliente && articulo.nroTropa && articulo.peso && articulo.precio && articulo.correlativo){
        articulosCompletos.push(idArticulo)
      }
      else{
        dispatch( setError('Algunos articulos no pudieron añadirse a Cta. Cte. Asegurece de cargar los datos faltante') )
        error = true
      }
    })
    
    if(articulosCompletos.length > 0){
      dispatch(addCuenta(articulosCompletos))
    } 

    error && setOpenSnack(true)
  }
  
  const onSelectionModelChange = (params) => {
    itemsSelected(params)
  }

  const itemsSelected = (value) => {
    setSelection(value)
  }

  const handleDelete = (e) => {
    dispatch( startDeleteStock(selection) )
    setSelection([])
  }

  const getCliente = (params) => {
    const {idCliente} = params.row
    if(idCliente){
      return clientes.find(cliente => cliente.idCliente == idCliente)?.nombreCompleto
    }

    return 'Seleccionar Cliente'
  }

  const getCiudad = (params) => {
    const {idCliente} = params.row
    if(idCliente){
      return clientes.find(cliente => cliente.idCliente == idCliente)?.localidad
    }

    return 'Seleccionar Cliente' 
  }

  const getMargen = (params) => {
    const {precio, costo} = params.row

    if (precio>0 && costo>0){
      return precio - costo
    }

    return 0
  }

  const getTotal = (params) => {
    const {precio, costo, peso} = params.row

    if (precio>0 && costo>0 && peso>0){
      return (precio - costo) * peso
    }

    return 0
  }

  const handleOnEditCellChange = (params) => {

    const {field, id} = params
    const value = params.props.value

    const data = `{"${field}": "${value}"}`

    dispatch(updateStock( id, JSON.parse(data) ))

  }

  const columns = [
    { 
      field: 'producto', 
      headerName: 'Producto',
      width: 150,
      editable: true,
      renderEditCell: (params) => (
        <SelectFieldProducto {...params} />
      )
    },
    {
      field: 'correlativo',
      headerName: 'Correlativo',
      width: 150,
      editable: true,
    },
    {
      field: 'peso',
      headerName: 'Peso',
      width: 150,
      editable: true,
    },
    {
      field: 'tipo',
      headerName: 'Tipo',
      width: 150,
      editable: true,
    },
    {
      field: 'idCliente',
      headerName: 'Nro Cliente',
      width: 150,
      editable: true,
      renderEditCell: (params) => (
        <SelectFieldCliente {...params} />
      )
    },
    {
      field: 'cliente',
      headerName: 'Cliente',
      width: 150,
      editable: false,
      valueGetter: getCliente,
    },
    {
      field: 'ciudad',
      headerName: 'Ciudad',
      width: 150,
      editable: false,
      valueGetter: getCiudad,
    },
    {
      field: 'ruta',
      headerName: 'Ruta',
      width: 150,
      editable: false,
    },
    {
      field: 'precio',
      headerName: 'Precio',
      width: 150,
      editable: true,
    },
    {
      field: 'transporte',
      headerName: 'Transporte',
      width: 150,
      editable: true,
    },
    {
      field: 'tocino',
      headerName: 'Tocino',
      width: 150,
      editable: true,
    },
    {
      field: 'proveedor',
      headerName: 'Proveedor',
      width: 150,
      editable: false,
      valueGetter: (params) => {
        const { proveedor } = params.row
        return proveedor.proveedor
      }
    },
    {
      field: 'costo',
      headerName: 'Costo',
      width: 150,
      editable: true,
    },
    {
      field: 'margen',
      headerName: 'Margen',
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Number.parseFloat(params.value).toFixed(2);;
        return valueFormatted;
      },
      valueGetter: getMargen,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        const valueFormatted = Number.parseFloat(params.value).toFixed(2);;
        return valueFormatted;
      },
      valueGetter: getTotal,
    },
  ]
  

  return (
    <div style={{ height: 400, width: '100%' }}>

      <Grid 
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.root}
      >
        <Grid item >
          <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
              sx={{mr: 1}}
          >
              Agregar Productos
          </Button>

          <Button
              size="small"
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick={ uploadCtaCte }
          >
              Cta.Cte
          </Button>
        </Grid>

        <Grid item >
          <Button
              size="small"
              variant="contained" 
              color="error" 
              onClick={ handleDelete }
          >
              Eliminar
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        rows={items}
        columns={columns}
        // pageSize={20}
        checkboxSelection
        disableSelectionOnClick
        onEditCellChange={handleOnEditCellChange}
        onSelectionModelChange={onSelectionModelChange}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
          
            <Autocomplete
              disablePortal
              value={valueTextProveedor}
              onChange={(event, newValue) => {
                setValueTextProveedor(newValue);
              }}
              id="proveedor"
              options={proveedores}
              // options={proveedores.map((proveedor) => proveedor.nroProveedor)}
              getOptionLabel={(proveedor) => proveedor.proveedor}
              renderInput={(params) => (
                <TextField {...params} 
                    label="Proveedor"
                />
              )}
            />

            <TextField
              id="cantidad"
              label="Cantidad"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setTxtCantidad(event.target.value);
              }}
            />

            <TextField
              id="nroTropa"
              label="NroTropa"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setTxtNroTropa(event.target.value);
              }}
            />

            <TextField
              id="correlativo"
              label="Correlativo"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setTxtCorrelativo(event.target.value);
              }}
            />

            <TextField
              id="costo"
              label="Costo"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setTxtCosto(event.target.value);
              }}
            />


          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={newItems} >Aceptar</Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openSnack} 
          autoHideDuration={10000} 
          onClose={handleCloseSnack} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
          TransitionComponent={SlideTransition}
        >
          <Alert onClose={handleCloseSnack} severity="warning" sx={{ width: '100%' }}>
            {msgError}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
}