import React from 'react'

export default function Planilla() {
    return (
        <>
            <div>
                <button className="uk-button uk-button-primary">CREAR NUEVA LINEA</button>
            </div>

            <div className="uk-overflow-auto">
                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                    <thead>
                        <tr>
                            <th class="uk-table-shrink"></th>
                            <th class="uk-table-shrink">#</th>
                            <th class="uk-table-shrink">Producto</th>
                            <th class="uk-table-shrink">Correlativo</th>
                            <th class="uk-table-shrink">Peso</th>
                            <th class="uk-table-shrink">Estado</th>
                            <th class="uk-table-shrink">#Cliente</th>
                            <th class="uk-table-shrink">Apellido</th>
                            <th class="uk-table-shrink">Ciudad</th>
                            <th class="uk-table-shrink">Ruta</th>
                            <th class="uk-table-shrink">Precio</th>
                            <th class="uk-table-shrink">Transporte</th>
                            <th class="uk-table-shrink">Tocino</th>
                            <th class="uk-table-shrink">Proveedor</th>
                            <th class="uk-table-shrink">Costo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input class="uk-checkbox" type="checkbox" /></td>
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
