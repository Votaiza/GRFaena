import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newCliente = ( cliente ) => {
    return async( dispatch ) => {

        // BUSCO EL NUMERADOR DE LOS CODIGOS DE CLIENTES Y LE AUTOINCREMENTO 1
        const contadores = await db.collection(`contadores`).doc('contadores').get();
        const idCliente = ++contadores.data().nroCliente;
        await db.collection('contadores').doc('contadores').update({nroCliente: idCliente})

        // AGREGO EL ID AL OBJETO CLIENTE
        cliente.idCliente = idCliente;

        const doc = await db.collection('clientes').add(cliente);

        dispatch( addNewCliente( cliente ) )

    }

}

export const addNewCliente = ( cliente ) => {

    return {
        type: types.clientesAddNew,
        payload: cliente
    }
}

export const updateCliente = ( id, valores ) => {
    return async ( dispatch ) =>{
        
        await db.collection('clientes').doc(id).update(valores)
        dispatch( startLoadingClientes() )

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


export const startDeleteCliente = ( id ) => {

    return async ( dispatch ) =>{

        await db.collection(`clientes`).doc( id ).delete();

        dispatch( deleteCliente( id ) )
        dispatch( startLoadingClientes() )

    }    
}

export const deleteCliente = ( id ) => ({
    type: types.clienteDelete,
    payload: `Cliente ${id} eliminado correctamente`,

})

export const activeCliente = ( id ) => {

    return async ( dispatch ) => {

        const clienteSnap = await db.collection('clientes').doc(id).get();
        const cliente = {
            id: clienteSnap.id,
            ...clienteSnap.data()
        }

        dispatch( setActiveCliente(cliente) )
        
    }    
}

export const setActiveCliente = ( cliente ) => ({
    type: types.clienteActive,
    payload: cliente
})

export const cleanActiveCliente = () => ({
    type: types.clienteCleanActive,
    payload: [],
})