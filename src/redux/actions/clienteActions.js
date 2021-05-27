import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newCliente = ( cliente ) => {
    return async( dispatch ) => {

        const doc = await db.collection('clientes').add(cliente);

        dispatch( addNewCliente( cliente ) )

    }

}

export const addNewCliente = ( cliente ) => ({
    type: types.clientesAddNew,
    payload: {
        cliente,
    }
})