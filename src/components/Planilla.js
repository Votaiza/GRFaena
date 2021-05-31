import React from 'react';
import { Link } from "react-router-dom";

export default function Planilla() {
    return (
        <>
            <div>
                <Link to="/newlinea" className="uk-button uk-button-primary">NUEVA LINEA</Link>
            </div>

            <div className="uk-overflow-auto">
                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                    <thead>
                        <tr>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink">#</th>
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
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
