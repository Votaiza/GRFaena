import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useSelector } from 'react-redux';

import Adjuntos from './Adjuntos';
import Planilla from './Planilla';
import General from './General';
import AltaFaena from './AltaFaena';
import { startLoadingClientes } from '../redux/actions/clienteActions'


export default function Faena() {

    const dispatch = useDispatch();
    
    const idFaena = useSelector(state => state.faena.active.id)

    useEffect(() => {
        dispatch( startLoadingClientes() )
    }, [dispatch])

    return (
        <>
            <div className="uk-margin">
                <h2 className="uk-text-primary">Codigo de Faena Unica:</h2>
                <span className="uk-text-success">{idFaena}</span>           
            </div>
            
            <div>
                <Router>
                    <div>
                        <nav>
                            <ul className="uk-subnav uk-subnav-pill" >
                                <li>
                                    <Link to="/newfaena">1. PLANILLA</Link>
                                </li>

                                <li>
                                    <Link to="/adjuntos">2. ADJUNTOS</Link>
                                </li>

                                <li>
                                    <Link to="/general">3. GENERAL</Link>
                                </li>
                                
                            </ul>
                        </nav>

                        <Switch>
                            <Route path="/newfaena">
                                <Planilla />
                            </Route>

                            <Route path="/adjuntos">
                                <Adjuntos />
                            </Route>

                            <Route path="/general">
                                <General />
                            </Route>

                            <Route path="/newlinea">
                                <AltaFaena />
                            </Route>
                        </Switch>

                    </div>
                </Router>


            </div>
        
        </>
    )
}
