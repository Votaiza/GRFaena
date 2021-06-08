import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { uiReducer } from '../redux/reducers/uiReducer';
import { clientesReducer } from "./reducers/clienteReducer";
import { faenaReducer } from "./reducers/faenaReducer";
import { localidadesReducer } from "./reducers/localidadReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  clientes: clientesReducer,
  faena: faenaReducer,
  localidades: localidadesReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
