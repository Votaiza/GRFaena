import { types } from '../types/types'

const initialState = {
    lineas: [],
    active: null
}

export const lineaReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.lineaAddNew:
            return {
                ...state,
                lineas: [ action.payload, ...state.lineas ]
            }

        case types.lineasLoad:
            return {
                ...state,
                lineas: [ ...action.payload ]
            }

        default:
            return state
    }
}