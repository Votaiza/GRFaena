import { types } from '../types/types'

const initialState = {
    cuentas: [],
}

export const ctaCteReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.ctaCteLoad:
            return {
                ...state,
                cuentas: action.payload,
            }

        default:
            return state
    }
}