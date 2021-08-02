import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DataGrid } from '@material-ui/data-grid';
import Swal from 'sweetalert2';

import { addItems, startDeleteStock, updateStock } from '../redux/actions/stockAction';
import { SelectFieldProducto, SelectFieldCliente } from '../helpers/inputTables';

export default function StockAll( ) {

  const { items } = useSelector(state => state.stock)
  const { clientes } = useSelector(state => state.clientes)
  
  const [selection, setSelection] = useState([])

  const dispatch = useDispatch()

  const newItems = async () => {

    let cant = null
    let correlativo = null

    cant = await Swal.fire({
      title: 'Ingrese Cantidad de Filas',
      input: 'number',
      showCancelButton: true,
    })

    if(cant.isConfirmed){
      correlativo = await Swal.fire({
        title: 'Ingrese Correlativo',
        input: 'number',
        showCancelButton: true,
      })
    }

    if(correlativo.isConfirmed && cant.isConfirmed){
      dispatch( addItems( cant.value, correlativo.value) )
    }
    

  }
  
  const onSelectionModelChange = (params) => {
    itemsSelected(params)
  }

  const itemsSelected = (value) => {
    setSelection(value)
  }

  const handleDelete = (e) => {
    console.log(selection)
    dispatch( startDeleteStock(selection) )
  }

  const getCliente = (params) => {
    const {idCliente} = params.row
    if(idCliente){
      return clientes.find(cliente => cliente.id == idCliente)?.nombreCompleto
    }

    return 'Seleccionar'
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
      headerName: 'Cliente',
      width: 150,
      editable: true,
      valueGetter: getCliente,
      renderEditCell: (params) => (
        <SelectFieldCliente {...params} />
      )
    },
    {
      field: 'ciudad',
      headerName: 'Ciudad',
      width: 150,
      editable: true,
    },
    {
      field: 'ruta',
      headerName: 'Ruta',
      width: 150,
      editable: true,
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
      editable: true,
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
      editable: true,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      editable: true,
    },
  ]
  

  return (
    <div style={{ height: 400, width: '100%' }}>

      <div>
        <button className="uk-button uk-button-primary uk-button-small"
                onClick={ newItems }
        >Nueva Línea</button>

      <button className="uk-button uk-button-danger uk-button-small"
                onClick={ handleDelete }
        >Eliminar</button>
      </div>

      <DataGrid
        rows={items}
        columns={columns}
        // pageSize={20}
        checkboxSelection
        disableSelectionOnClick
        onEditCellChange={handleOnEditCellChange}
        onSelectionModelChange={onSelectionModelChange}
      />
    </div>
  )
}