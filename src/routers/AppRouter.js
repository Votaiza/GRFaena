import React, { useEffect, useState } from "react";
import { Switch, Redirect, useLocation, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

import { firebase } from '../firebase/config';
import { login } from '../redux/actions/authActions'
import { Home } from "../components/Home";
import { Dashboard } from "../components/auth/Dashboard";

export const AppRouter = () => {
  // const [ checking, setChecking ] = useState(true);
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged( (user) => {

      if ( user?.uid ) {
          dispatch( login( user.uid, user.displayName ) );
          SetIsLoggedIn( true );
      } else {
          SetIsLoggedIn( false );
      }

      // setChecking(false);

  });
  }, [dispatch]);

  return (
    <>
      <Switch location={location} key={location.key}>
        <PublicRoute
          exact
          path="/"
          component={Home}
          isAuthenticated={isLoggedIn}
        />

        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isLoggedIn}
        />

        <Redirect to="/" />
      </Switch>
    </>
  );
};
