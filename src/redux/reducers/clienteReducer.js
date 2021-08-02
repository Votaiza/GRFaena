import { types } from '../types/types'

const initialState = {
    clientes: [],
    active: [],
    msg: '',
    save: true,
}

export const clientesReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.clientesAddNew:
            return {
                ...state,
                clientes: [ action.payload, ...state.clientes ]
            }

        case types.clientesLoad:
            return {
                ...state,
                clientes: [ ...action.payload ]
            }

        case types.clienteDelete:
            return {
                ...state,
                msg: action.payload,
            }
        
        case types.clienteActive:
            return {
                ...state,
                active: action.payload
            }

        case types.clienteCleanActive:
            return {
                ...state,
                active: action.payload
            }

        default:
            return state
    }
}