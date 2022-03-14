import { types } from '../types/types';

export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err
});

export const removeError = () => ({
    type: types.uiRemoveError
});

export const startLoading = () => ({
    type: types.uiStartLoading
})
export const finishLoading = () => ({
    type: types.uiFinishLoading
})

export const setSaveCliente = ( value ) => ({
    type: types.uiSaveCliente,
    payload: value,
})

export const setSaveProveedor = ( value ) => ({
    type: types.uiSaveProveedor,
    payload: value,
})

export const setSaveFaena = ( value ) => ({
    type: types.uiSaveFaena,
    payload: value,
})

export const setMenu = ( value ) => ({
    type: types.uiSetMenu,
    payload: value,
})
