import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newGeneral = ( idFaena, general ) => {
    return async( dispatch ) => {

        await db.doc(`/faenas/${idFaena}`).update(general)

        dispatch( addNewGeneral(  general ))
    }
}

export const addNewGeneral = ( general ) => {

    return {
        type: types.generalAddNew,
        payload: general
    }
}




