import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { setMenu } from '../redux/actions/ui'
import { startLoadingStock } from '../redux/actions/stockAction'
import StockAll from './StockAll'

export default function Stock() {

    const { frigorificos } = useSelector(state => state.frigorifico)
    const dispatch = useDispatch()    

    useEffect(() => {
        dispatch( startLoadingStock() )
    }, [])

    const handleVolver = (e) => {
        dispatch( setMenu( true ) )
    }

    

    return (
        <>
            <div>
                <Link to="/dashboard" 
                    className="uk-button uk-button-primary uk-button-small"
                    onClick={ handleVolver }
                >VOLVER</Link>
            </div>

            <div className="uk-container">

                <div>
                    <ul uk-accordion="multiple: true">
                        <li className="uk-open ">
                            <a className="uk-accordion-title uk-text-bold acordion" href="#">Todos</a>
                            <div className="uk-accordion-content">
                                <StockAll />
                            </div>
                        </li>

                        {
                            frigorificos.map( frigorifico => (
                                <li>
                                    <a className="uk-accordion-title uk-text-bold acordion" href="#">{frigorifico.nombre}</a>
                                    <div className="uk-accordion-content">
                                        <table className="uk-table uk-table-small uk-table-divider">
                                            <thead>
                                                <tr>
                                                    <th>Producto</th>
                                                    <th>Correlativo</th>
                                                    <th>Peso</th>
                                                    <th>Tipo</th>
                                                    <th>ID Cliente</th>
                                                    <th>Cliente</th>
                                                    <th>Ciudad</th>
                                                    <th>Ruta</th>
                                                    <th>Precio</th>
                                                    <th>Transporte</th>
                                                    <th>Tocino</th>
                                                    <th>Prov</th>
                                                    <th>Costo</th>
                                                    <th>Margen</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            ))
                        }

                        {/* <li>
                            <a className="uk-accordion-title uk-text-bold acordion" href="#">Deheza</a>
                            <div className="uk-accordion-content">
                                <table className="uk-table uk-table-small uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Correlativo</th>
                                            <th>Peso</th>
                                            <th>Tipo</th>
                                            <th>ID Cliente</th>
                                            <th>Cliente</th>
                                            <th>Ciudad</th>
                                            <th>Ruta</th>
                                            <th>Precio</th>
                                            <th>Transporte</th>
                                            <th>Tocino</th>
                                            <th>Prov</th>
                                            <th>Costo</th>
                                            <th>Margen</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </li>
                        <li>
                            <a className="uk-accordion-title uk-text-bold acordion" href="#">Coronel Moldes</a>
                            <div className="uk-accordion-content">
                                <table className="uk-table uk-table-small uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Correlativo</th>
                                            <th>Peso</th>
                                            <th>1</th>
                                            <th>#Cliente</th>
                                            <th>Apellido</th>
                                            <th>Ciudad</th>
                                            <th>Ruta</th>
                                            <th>Precio</th>
                                            <th>Transporte</th>
                                            <th>Tocino</th>
                                            <th>Prov</th>
                                            <th>Costo</th>
                                            <th>Margen</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}
