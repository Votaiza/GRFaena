import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '@material-ui/data-grid';
import { Link } from 'react-router-dom';

import { setMenu } from '../redux/actions/ui'
import Swal from 'sweetalert2';
import { addFrigorifico } from '../redux/actions/frigorificoAction';

export default function ListadoFrigorifico() {

    const { frigorificos } = useSelector(state => state.frigorifico)

    const dispatch = useDispatch()

    const handleVolver = (e) => {
        dispatch( setMenu( true ) )
    }

    const handleNew = async() => {

        const frigorifico = await Swal.fire({
            title: 'Ingrese un Frigorifico',
            input: 'text',
            showCancelButton: true,
        })

        if(frigorifico.isConfirmed){
            dispatch( addFrigorifico( {nombre: frigorifico.value}) )
        }
    }

    const columns = [
        { 
          field: 'id', 
          headerName: 'ID',
          width: 200,
          editable: false,
        },
        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 150,
          editable: false,
        },
    ]

    return (
        <>
            <div>
                <Link to="/dashboard" 
                    className="uk-button uk-button-primary uk-button-small"
                    onClick={ handleVolver }
                >VOLVER</Link>
            </div>
            <div className="uk-container">

                <div>
                    <button
                            className="uk-button uk-button-primary uk-button-small"
                            onClick={ handleNew }
                        >Agregar
                    </button>
                </div>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={frigorificos}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </>
    )
}
