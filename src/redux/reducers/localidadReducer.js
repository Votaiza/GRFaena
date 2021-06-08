import { types } from '../types/types'

const initialState = {
    provincias: [],
    ciudades: [],
}

export const localidadesReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.ciudadLoad:
            return {
                ...state,
                ciudades: action.payload,
            }

            case types.provinciaLoad:
                return {
                    ...state,
                    provincias: action.payload,
            }

        default:
            return state
    }
}