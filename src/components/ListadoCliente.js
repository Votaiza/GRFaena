import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';

import { activeCliente, startDeleteCliente, startLoadingClientes } from '../redux/actions/clienteActions';
import { setMenu, setSaveCliente } from '../redux/actions/ui';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
    },
}));

export default function ListadoCliente() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false)

    const { clientes } = useSelector(state => state.clientes)
    const {saveCliente} = useSelector(state => state.ui)

    useEffect(() => {

        dispatch( startLoadingClientes() );        

    }, [dispatch,])

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'uk-button uk-button-primary uk-button-small',
            cancelButton: 'uk-button  uk-button-danger uk-button-small',
        },
        buttonsStyling: false
    })

    const returnMenu = () => (<Redirect to="/dashboard"></Redirect>)

    const handleVolver = ( e ) => {
        dispatch( setMenu( true ) )
    }

    const handleNewCliente = () => {
        dispatch( setSaveCliente( false ) )
    }

    const handleDelete = ( e ) => {

        swalWithBootstrapButtons.fire({
            title: '¿Desea eliminar el registro?',
            text: "!No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: false
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                '¡Eliminado!',
                'El registro ha sido eliminado.',
                'success'
              )
              dispatch( startDeleteCliente( e.target.value ) )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                '¡Cancelado!',
                'La eliminación fue cancelada',
                'error',
              )
            }
        })        
    }

    const handleEdit = async ( e ) => {
        await dispatch( activeCliente( e.target.value ) )
        setEdit(true)
    }

    return (
        
        <Container>

            {
                !saveCliente &&
                <Redirect to="/newcliente"></Redirect>
            }

            <Grid 
                container
                justifyContent="space-between"
                alignItems="center"
                className={classes.root}
            >
                <Grid item >
                    <h3>Listado de Clientes</h3>
                    <Link to="/newcliente" 
                        className="uk-button uk-button-primary uk-button-small"
                        onClick={ handleNewCliente }
                    >NUEVO CLIENTE</Link>
                </Grid>

                <Grid item >
                    {/* <Link to="/dashboard" 
                        className="uk-button uk-button-primary uk-button-small"
                        onClick={ handleVolver }
                    >VOLVER</Link> */}
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

            <div className="uk-overflow-auto">
                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                    <thead>
                        <tr>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink">Cod FDZ</th>
                            <th className="uk-table-shrink">Cod. FCM</th>
                            <th className="uk-table-shrink">Nombre</th>
                            <th className="uk-table-shrink">Nombre Fantasia</th>
                            <th className="uk-table-shrink">Provincia</th>
                            <th className="uk-table-shrink">Localidad</th>
                            <th className="uk-table-shrink">Teléfono</th>
                            <th className="uk-table-shrink">Dirección</th>
                            <th className="uk-table-shrink">Altura</th>
                            <th className="uk-table-shrink">Encargado</th>
                            <th className="uk-table-shrink">Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (clientes.length > 0) &&
                                clientes.map( cliente => (
                                    <tr key={ cliente.id }>
                                        <td><input className="uk-checkbox" type="checkbox" /></td>
                                        <td>
                                            <button className="uk-button uk-button-danger uk-button-small"
                                                    value={ cliente.id }                                                    
                                                    onClick={ handleDelete }
                                            >Eliminar
                                            </button>

                                            
                                        </td>
                                        <td>                                            
                                            <button className="uk-button uk-button-primary uk-button-small"
                                                    value={ cliente.id }                                                    
                                                    onClick={ handleEdit }
                                            >Editar</button>
                                            {
                                                edit && 
                                                <Redirect to="/newcliente"></Redirect>
                                            }
                                        </td>
                                        <td>{ cliente.codFDZ }</td>
                                        <td>{ cliente.codFCM }</td>
                                        <td>{ cliente.nombreCompleto }</td>
                                        <td>{ cliente.nombreFantasia }</td>
                                        <td>{ cliente.provincia }</td>
                                        <td>{ cliente.localidad }</td>
                                        <td>{ cliente.telefono }</td>
                                        <td>{ cliente.direccion }</td>
                                        <td>{ cliente.altura }</td>
                                        <td>{ cliente.encargado }</td>
                                        <td>{ cliente.email }</td>
                                    </tr>
                                ))
                        }
                        
                    </tbody>
                </table>
            </div>
        </Container>
    )
}
