import Swal from 'sweetalert2';

import { types } from "../types/types";
import { firebase } from '../../firebase/config'
import { startLoading, finishLoading } from '../actions/ui';

export const startLogin = (email, password) => {

  return (dispatch) => {

    dispatch( startLoading() );

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        dispatch( login( user.uid, user.displayName ) )

        dispatch( finishLoading() );
      })
      .catch((e) => {
        console.log(e);
        dispatch( finishLoading() );
        Swal.fire('Error', e.message, 'error');
    });
  };

};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
      uid,
      displayName,
  }
});

export const startLogout = () => {
  return async( dispatch ) => {
      await firebase.auth().signOut();

      dispatch( logout() );
  }
}

export const logout = () => ({
  type: types.logout
})
