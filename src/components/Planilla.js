import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { startLoadingLineas } from '../redux/actions/lineasAction'

export default function Planilla() {

    const dispatch = useDispatch()

    const { id, lineas } = useSelector(state => state.faena.active)
    const { ciudades } = useSelector(state => state.localidades)
    const { clientes } = useSelector(state => state.clientes)

    console.log(ciudades)

    useEffect(() => {
        
        dispatch( startLoadingLineas( id ) )

    }, [dispatch, id])

    return (
        <>
            <div>
                <Link to="/newlinea" className="uk-button uk-button-primary uk-button-small">NUEVA LINEA</Link>
            </div>

            <div className="uk-overflow-auto">
                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                    <thead>
                        <tr>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink">Producto</th>
                            <th className="uk-table-shrink">Correlativo</th>
                            <th className="uk-table-shrink">Peso</th>
                            <th className="uk-table-shrink">Estado</th>
                            <th className="uk-table-shrink">#Cliente</th>
                            <th className="uk-table-shrink">Apellido</th>
                            <th className="uk-table-shrink">Ciudad</th>
                            <th className="uk-table-shrink">Ruta</th>
                            <th className="uk-table-shrink">Precio</th>
                            <th className="uk-table-shrink">Transporte</th>
                            <th className="uk-table-shrink">Tocino</th>
                            <th className="uk-table-shrink">Proveedor</th>
                            <th className="uk-table-shrink">Costo</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            (lineas) && (
                                lineas.map( linea => (

                                    <tr key={ linea.id }>
                                        <td><input className="uk-checkbox" type="checkbox" /></td>
                                        <td>{ linea.producto }</td>
                                        <td>{ linea.correlativo }</td>
                                        <td>{ linea.peso }</td>
                                        <td>{ linea.estado }</td>
                                        <td>
                                            {
                                                clientes.find( cliente => (cliente.id === linea.idCliente) )?.nombreCompleto
                                            }
                                        </td>
                                        <td>{ linea.apellido }</td>
                                        <td>
                                            { 
                                                ciudades.find( ciudad => ( ciudad.id === linea.ciudad))?.nombre
                                            }
                                        </td>
                                        <td>{ linea.ruta }</td>
                                        <td>{ linea.precio }</td>
                                        <td>{ linea.transporte }</td>
                                        <td>{ linea.tocino }</td>
                                        <td>{ linea.proveedor }</td>
                                        <td>{ linea.costo }</td>
                                    </tr>
                                ))
                            )
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}
