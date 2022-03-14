import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@material-ui/icons//Edit';

import { setMenu, setSaveProveedor } from '../redux/actions/ui';
import { startLoadingProveedores, activeProveedor } from '../redux/actions/proveedoresAction';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        flexGrow: 1,
    },
    grilla: {
        marginTop: theme.spacing(2),
    }
}));

export default function ListadoProveedores() {

    const { proveedores } = useSelector(state => state.proveedores)
    const { saveProveedor } = useSelector(state => state.ui)

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch( startLoadingProveedores() );

    }, [dispatch,])

    const handleVolver = ( e ) => {
        dispatch( setMenu( true ) )
    }

    const handleNewProveedor = () => {
        dispatch( setSaveProveedor( false ) )
    }

    const handleEdit = React.useCallback(
        (id) => async() => {
            await dispatch( activeProveedor( id ) )
            dispatch( setSaveProveedor( false ) )
        },
        [],
    );

    const redirectEditProveedor = () => (<Redirect to="/newproveedor"></Redirect>)

    const columns = [
        {
            field: 'nroProveedor', 
            headerName: 'ID Proveedor',
            width: 200,
            editable: false,
        },
        {
            field: 'proveedor', 
            headerName: 'Proveedor',
            width: 150,
            editable: false,
        },
        {
            field: 'email', 
            headerName: 'Email',
            width: 200,
            editable: false,
        },
        {
            field: 'telefono', 
            headerName: 'Telefono',
            width: 150,
            editable: false,
        },
        {
            field: 'ciudad', 
            headerName: 'Ciudad',
            width: 150,
            editable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            width: 150,
            getActions: (params) => [
                <GridActionsCellItem
                  size="medium"
                  icon={<EditIcon color="secondary"/>}
                  label="Editar"
                  onClick={handleEdit(params.id)}
                />,
            ],
        },
    ]    
    return (
        <Container>

            {
                !saveProveedor &&
                <Redirect to="/newproveedor"></Redirect>
            }

                <Grid 
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    className={classes.root}
                >
                    <Grid item >
                        <Typography variant="h4" component="h4" mb={2}>Listado de Proveedores</Typography>
                        <Link to="/newproveedor" style={{textDecoration: 'none'}}>
                            <Button 
                                variant="contained"
                                color="primary"
                                onClick={ handleNewProveedor }
                            >
                                NUEVO PROVEEDOR
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


                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={proveedores}
                        columns={columns}
                        className={classes.grilla}
                    />
                </div>
                

        </Container>
    )
}
