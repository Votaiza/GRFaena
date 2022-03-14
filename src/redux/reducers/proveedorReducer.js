import { types } from '../types/types'

const initialState = {
    proveedores: [],
    active: [],
    msg: '',
    save: true,
}

export const proveedorReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.proveedorAddNew:
            return {
                ...state,
                proveedores: [ action.payload, ...state.proveedores ]
            }

        case types.proveedorLoad:
            return {
                ...state,
                proveedores: [ ...action.payload ]
            }

        case types.proveedorDelete:
            return {
                ...state,
                msg: action.payload,
            }
        
        case types.proveedorActive:
            return {
                ...state,
                active: action.payload
            }

        case types.proveedorCleanActive:
            return {
                ...state,
                active: action.payload
            }

        default:
            return state
    }
}