import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Sidebar } from "../Sidebar";
import Clientes from '../Clientes';
import ListadoFaena from "../ListadoFaena";
import ListadoCliente from "../ListadoCliente";
import Faena from '../Faena';
import { startLoadingFaenas } from "../../redux/actions/faenaAction";


export const Dashboard = () => {

  return (
    <>
      <Sidebar />

      <div>
        <Router>
          <div>
            <nav>
              <ul className="uk-subnav uk-subnav-pill" >
                <li className="">
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
                <Clientes />
              </Route>
            </Switch>

          </div>
        </Router>


      </div>

    </>
  );
};