import { types } from '../types/types'

const initialState = {
    clientes: [],
    active: null
}

export const clientesReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.clientesAddNew:
            return {
                ...state,
                clientes: [ action.payload, ...state.clientes ]
            }

        default:
            return state
    }
}