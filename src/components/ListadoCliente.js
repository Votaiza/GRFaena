import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { startLoadingClientes } from '../redux/actions/clienteActions';
import { startLoadingCiudades } from '../redux/actions/ciudadAction';
import { startLoadingProvincias } from '../redux/actions/provinciasAction';

export default function ListadoCliente() {

    const dispatch = useDispatch();

    const { clientes } = useSelector(state => state.clientes)

    useEffect(() => {

        dispatch( startLoadingClientes() );
        dispatch( startLoadingCiudades() );
        dispatch( startLoadingProvincias() )

    }, [dispatch])

    return (
        <div>
            <div>
                <div>
                    <h3>Listado de Clientes</h3>
                    <Link to="/newcliente" className="uk-button uk-button-primary">NUEVO CLIENTE</Link>
                </div>
                <p>Gestione su cartera de clientes para luego poder ejecutar distintas acciones sobre los mismos.</p>
            </div>

            <div className="uk-overflow-auto">
                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                    <thead>
                        <tr>
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
        </div>
    )
}
