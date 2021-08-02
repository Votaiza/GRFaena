import { types } from '../types/types'

const initialState = {
    items: [],
}

export const stockReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.stockLoad:
            return {
                ...state,
                items: action.payload,
            }

        default:
            return state
    }
}