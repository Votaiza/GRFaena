import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newCliente = ( cliente ) => {
    return async( dispatch ) => {

        const doc = await db.collection('clientes').add(cliente);

        dispatch( addNewCliente( doc.id, cliente ) )

    }

}

export const addNewCliente = ( id, cliente ) => {

    cliente.id = id;

    return {
        type: types.clientesAddNew,
        payload: cliente
    }
}

export const loadClientes = async () => {

    const clientesSnap = await db.collection(`clientes`).get();
    const clientes = [];

    clientesSnap.forEach( snapHijo => {
        clientes.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return clientes;

}

export const startLoadingClientes = () => {

    
    return async( dispatch ) => {

        const clientes = await loadClientes();
        
        dispatch( setClientes( clientes ) );
    }
}

export const setClientes = ( clientes ) => ({
    type: types.clientesLoad,
    payload: clientes,
});