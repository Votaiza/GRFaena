import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

import Adjuntos from './Adjuntos';
import Planilla from './Planilla';
import General from './General';
import AltaFaena from './AltaFaena';
import { startLoadingClientes } from '../redux/actions/clienteActions'
import { setSaveFaena } from '../redux/actions/ui';
import { cleanActiveFaena } from '../redux/actions/faenaAction';


export default function Faena() {

    const dispatch = useDispatch();
    
    const { saveFaena } = useSelector( state => state.ui )
    const idFaena = useSelector(state => state.faena.active.id)

    useEffect(() => {
        dispatch( startLoadingClientes() )
    }, [dispatch])

    const handleBack = () => {
        dispatch( setSaveFaena( true ) )
        dispatch( cleanActiveFaena() )
    }

    return (
        <>
            {
                saveFaena &&
                <Redirect to="/dashboard"></Redirect>
            }

            <div className="uk-margin">
                <p className="uk-text-large uk-text-primary"
                    >Código de Faena Unica: <span className="uk-text-small uk-text-success">{idFaena}</span></p>
                
            </div>

            <div>
                    <button onClick={handleBack} className="uk-button uk-button-danger uk-button-small">VOLVER</button>
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
