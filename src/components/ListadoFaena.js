import React from 'react';
import { Link } from "react-router-dom";

import Faena from './Faena';

export default function ListadoFaena() {
    return (
        <div>
            <div>
                <div>
                    <h3>Listado de Faena</h3>
                    <Link to="/newfaena" className="uk-button uk-button-primary">NUEVA FAENA</Link>
                </div>
                <p>Gestione su Faena de manera sencilla y sobre todo con la posibilidad de aplicar distintas acciones sobre las mismas</p>
            </div>

            <div className="uk-overflow-auto">
                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                    <thead>
                        <tr>
                            <th className="uk-table-shrink"></th>
                            <th className="uk-table-shrink">#</th>
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
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
