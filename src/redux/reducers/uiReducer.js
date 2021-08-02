import { types } from '../types/types';

const initialState = {
    loading: false,
    menu: true,
    msgError: null,
    saveCliente: true,
    saveFaena: true,
}


export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:
                return {
                    ...state,
                    msgError: null
                }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            }
 
        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }

        case types.uiSaveCliente:
            return {
                ...state,
                saveCliente: action.payload,
            }

        case types.uiSaveFaena:
            return {
                ...state,
                saveFaena: action.payload,
            }

        case types.uiSetMenu:
            return {
                ...state,
                menu: action.payload
            }

        default:
            return state;
    }

}
