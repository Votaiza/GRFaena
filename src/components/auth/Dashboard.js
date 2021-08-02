import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Sidebar } from "../Sidebar";
import Clientes from '../Clientes';
import ListadoFaena from "../ListadoFaena";
import ListadoCliente from "../ListadoCliente";
import Faena from '../Faena';
import { startLoadingFaenas } from "../../redux/actions/faenaAction";
import { startLoadingCiudades } from "../../redux/actions/ciudadAction";
import { startLoadingProvincias } from "../../redux/actions/provinciasAction";
import { startLoadingClientes } from "../../redux/actions/clienteActions";
import Stock from "../Stock";
import Menu from "../Menu";
import { startLoadingFrigorifico } from "../../redux/actions/frigorificoAction";
import ListadoFrigorifico from "../ListadoFrigorifico";



export const Dashboard = () => {

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch( startLoadingFaenas() )
      dispatch( startLoadingCiudades() );
      dispatch( startLoadingProvincias() )
      dispatch( startLoadingClientes() )
      dispatch( startLoadingFrigorifico() )
  }, [dispatch])

  return (
    <>
      <Sidebar />     


      <Router>
          <Switch>
            <Route path="/listadofrigorifico">
              <ListadoFrigorifico />
            </Route>

            <Route path="/listadocliente">
              <ListadoCliente />
            </Route>

            <Route path="/listadostock">
              <Stock />
            </Route>

            <Route path="/newfaena">
              <Faena />
            </Route>

            <Route path="/newcliente">
              <Clientes />
            </Route>
          </Switch>

          <Menu />
          
      </Router>

    </>
  );
};