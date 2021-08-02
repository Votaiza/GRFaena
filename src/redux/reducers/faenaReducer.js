import { types } from '../types/types'

const initialState = {
    faenas: [],
    active: {},
    msg: '',
    save: true,
}

export const faenaReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.faenaAddNew:
            return {
                ...state,
                faenas: [ action.payload, ...state.faenas ]
            }

        case types.lineaLoad:
            return {
                ...state,
                active: {
                    ...state.active,
                    lineas: [ ...action.payload ]
                }
            }

        case types.faenaLoad:
            return {
                ...state,
                faenas: [ ...action.payload ]
            }

        case types.faenaActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.generalAddNew:

            return {       
                ...state,         
                active: {
                    ...state.active,
                    ...action.payload
                }
            }

        case types.adjuntoAddNew:
            return {
                ...state,
                active: {
                    ...state.active,
                    ...action.payload,
                }
            }

        case types.faenaDelete:
            return {
                ...state,
                msg: action.payload,
            }

        case types.faenaCleanActive:
            return {
                ...state,
                active: action.payload
            }

        default:
            return state
    }
}