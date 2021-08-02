import { types } from '../types/types'

const initialState = {
    frigorificos: [],
}

export const frigorificoReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.frigorificoLoad:
            return {
                ...state,
                frigorificos: action.payload,
            }

        default:
            return state
    }
}