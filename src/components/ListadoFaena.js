import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { newFaena, startLoadingFaenas } from '../redux/actions/faenaAction';
import Faena from './Faena';


export default function ListadoFaena(  ) {

    const dispatch = useDispatch();

    const {faenas} = useSelector(state => state.faena)
    
    useEffect(() => {
        dispatch( startLoadingFaenas() )
    }, [])   
    
    
    const handleNewFaena = () => {
        dispatch( newFaena() );
    }

    return (
        <div>
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
                                        <td>{ faena?.fechaProduccion }</td>
                                        <td>{ faena?.id }</td>
                                        <td>
                                            {
                                                faena.traslado ? 
                                                <span uk-icon="icon: check" className="uk-text-success"></span> : 
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
                                                <a href={faena.vep} target="_blank" download>
                                                    <span uk-icon="icon: check" className="uk-text-success"></span>
                                                </a>
                                                : 
                                                <span uk-icon="icon: close" className="uk-text-danger"></span>
                                            }
                                        </td>
                                        <td>
                                            {
                                                faena.oficial ? 
                                                <a href={faena.vep} target="_blank" download>
                                                    <span uk-icon="icon: check" className="uk-text-success"></span>
                                                </a>
                                                : 
                                                <span uk-icon="icon: close" className="uk-text-danger"></span>
                                            }
                                        </td>
                                        <td>
                                            {
                                                faena.liquidacion ? 
                                                <a href={faena.vep} target="_blank" download>
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
