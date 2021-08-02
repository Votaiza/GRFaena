import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import Swal from 'sweetalert2';

import { activeFaena, newFaena, startDeleteFaena, startLoadingFaenas } from '../redux/actions/faenaAction';
import { setSaveFaena } from '../redux/actions/ui';


export default function ListadoFaena(  ) {

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false)

    const {faenas} = useSelector(state => state.faena)
    const {saveFaena} = useSelector(state => state.ui)
    
    useEffect(() => {
        dispatch( startLoadingFaenas() )
    }, [dispatch])

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'uk-button uk-button-primary uk-button-small',
            cancelButton: 'uk-button  uk-button-danger uk-button-small',
        },
        buttonsStyling: false
    })
    
    const handleNewFaena = () => {
        dispatch( setSaveFaena( false ) )
        dispatch( newFaena() );
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
              dispatch( startDeleteFaena( e.target.value ) )
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

    const handleEdit = ( e ) => {
        dispatch( setSaveFaena(false) )
        dispatch( activeFaena( e.target.value ) )
        setEdit(true)

    }

    return (
        <div>
            {
                !saveFaena &&
                <Redirect to="/newfaena"></Redirect>
            }

            <div>
                <div>
                    <h3>Listado de Faena</h3>
                    <Link to="/newfaena" 
                        className="uk-button uk-button-primary uk-button-small"
                        onClick={handleNewFaena}
                    >
                            NUEVA FAENA
                    </Link>
                </div>
                <p>Gestione su Faena de manera sencilla y sobre todo con la posibilidad de aplicar distintas acciones sobre las mismas</p>
            </div>

            <div className="uk-overflow-auto">
                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                    <thead>
                        <tr>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink">Fecha</th>
                            <th className="uk-table-shrink">Codigo Faena</th>
                            <th className="uk-table-shrink">Guia Traslado</th>
                            <th className="uk-table-shrink">Comprobante Vep</th>
                            <th className="uk-table-shrink">Romaneo Interno</th>
                            <th className="uk-table-shrink">Romaneo Oficial</th>
                            <th className="uk-table-shrink">Liquidacion</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            (faenas.length > 0) &&
                                faenas.map( faena => (
                                    <tr key={faena.id}>
                                        <td><input className="uk-checkbox" type="checkbox" /></td>
                                        <td>
                                            <button className="uk-button uk-button-danger uk-button-small"
                                                    value={ faena.id }                                                    
                                                    onClick={ handleDelete }
                                            >Eliminar
                                            </button>

                                            
                                        </td>
                                        <td>                                            
                                            <button className="uk-button uk-button-primary uk-button-small"
                                                    value={ faena.id }                                                    
                                                    onClick={ handleEdit }
                                            >Editar</button>
                                            {
                                                edit && 
                                                <Redirect to="/newfaena"></Redirect>
                                            }
                                        </td>
                                        <td>{ faena?.fechaProduccion }</td>
                                        <td>{ faena?.id }</td>
                                        <td>
                                            {
                                                faena.guia ? 
                                                <a href={faena.guia} target="_blank" download>
                                                    <span uk-icon="icon: check" className="uk-text-success"></span>
                                                </a>
                                                : 
                                                <span uk-icon="icon: close" className="uk-text-danger"></span>
                                            } 
                                        </td>
                                        <td>
                                            {
                                                faena.vep ? 
                                                <a href={faena.vep} target="_blank" download>
                                                    <span uk-icon="icon: check" className="uk-text-success"></span>
                                                </a>
                                                : 
                                                <span uk-icon="icon: close" className="uk-text-danger"></span>
                                            } 
                                        </td>
                                        <td>
                                            {
                                                faena.interno ? 
                                                <a href={faena.interno} target="_blank" download>
                                                    <span uk-icon="icon: check" className="uk-text-success"></span>
                                                </a>
                                                : 
                                                <span uk-icon="icon: close" className="uk-text-danger"></span>
                                            }
                                        </td>
                                        <td>
                                            {
                                                faena.oficial ? 
                                                <a href={faena.oficial} target="_blank" download>
                                                    <span uk-icon="icon: check" className="uk-text-success"></span>
                                                </a>
                                                : 
                                                <span uk-icon="icon: close" className="uk-text-danger"></span>
                                            }
                                        </td>
                                        <td>
                                            {
                                                faena.liquidacion ? 
                                                <a href={faena.liquidacion} target="_blank" download>
                                                    <span uk-icon="icon: check" className="uk-text-success"></span>
                                                </a>
                                                : 
                                                <span uk-icon="icon: close" className="uk-text-danger"></span>
                                            }
                                        </td>
                                    </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
