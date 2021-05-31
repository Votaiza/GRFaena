import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Sidebar } from "../Sidebar";
import Clientes from '../Clientes';
import AltaFaena from "../AltaFaena";
import ListadoFaena from "../ListadoFaena";
import ListadoCliente from "../ListadoCliente";
import Faena from '../Faena';


export const Dashboard = () => {
  return (
    <>
      <Sidebar />

      <div>
        <Router>
          <div>
            <nav>
              <ul className="uk-subnav uk-subnav-pill">
                <li>
                  <Link to="/dashboard">Faena</Link>
                </li>

                <li>
                  <Link to="/ListadoCliente">Cliente</Link>
                </li>
                
              </ul>
            </nav>

            <Switch>
              <Route path="/dashboard">
                <ListadoFaena />
              </Route>

              <Route path="/ListadoCliente">
                <ListadoCliente />
              </Route>

              <Route path="/newfaena">
                <Faena />
              </Route>

              <Route path="/newcliente">
                <Faena />
              </Route>
            </Switch>

          </div>
        </Router>


      </div>

    </>
  );
};