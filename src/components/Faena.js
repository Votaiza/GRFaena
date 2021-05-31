import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Adjuntos from './Adjuntos';
import Planilla from './Planilla';
import General from './General';
import AltaFaena from './AltaFaena';

export default function Faena() {
    return (
        <>
            <div>
                <h3>Codigo de Faena Unica:</h3>
                <p>EjemploDeCodigo</p>
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
