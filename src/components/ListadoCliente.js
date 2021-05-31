import React from 'react'
import { Link } from "react-router-dom";

export default function ListadoCliente() {
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
                            <th className="uk-table-shrink">#</th>
                            <th className="uk-table-shrink">Cod. Interno</th>
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
                        <tr>
                            <td><input className="uk-checkbox" type="checkbox" /></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
