import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { uiReducer } from '../redux/reducers/uiReducer';
import { clientesReducer } from "./reducers/clienteReducer";
import { faenaReducer } from "./reducers/faenaReducer";
import { localidadesReducer } from "./reducers/localidadReducer";
import { stockReducer } from "./reducers/stockReducer";
import { frigorificoReducer } from "./reducers/frigorificoReducer";
import { proveedorReducer } from "./reducers/proveedorReducer";
import { ctaCteReducer } from "./reducers/ctaCteReducer";

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
  stock: stockReducer,
  frigorifico: frigorificoReducer,
  proveedores: proveedorReducer,
  ctaCte: ctaCteReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
