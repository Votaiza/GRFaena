import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newProveedor = ( proveedor ) => {
    return async( dispatch ) => {

        // BUSCO EL NUMERADOR DE LOS CODIGOS DE CLIENTES Y LE AUTOINCREMENTO 1
        const contadores = await db.collection(`contadores`).doc('contadores').get();
        const idProveedor = ++contadores.data().nroProveedor;
        await db.collection('contadores').doc('contadores').update({nroProveedor: idProveedor})

        // AGREGO EL ID AL OBJETO CLIENTE
        proveedor.nroProveedor = idProveedor;

        await db.collection('proveedores').add(proveedor);

    }

}

export const addNewProveedor = ( proveedor ) => {

    return {
        type: types.proveedorAddNew,
        payload: proveedor
    }
}

export const updateProveedor = ( id, valores ) => {
    return async ( dispatch ) =>{
        
        await db.collection('proveedores').doc(id).update(valores)
        dispatch( startLoadingProveedores() )

    }
}

export const loadProveedores = async () => {

    const proveeoresSnap = await db.collection(`proveedores`).get();
    const proveedores = [];

    proveeoresSnap.forEach( snapHijo => {
        proveedores.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return proveedores;

}

export const startLoadingProveedores = () => {
    
    return async( dispatch ) => {

        const proveedores = await loadProveedores();
        
        dispatch( setProveedores( proveedores ) );
    }
}

export const setProveedores = ( proveedores ) => ({
    type: types.proveedorLoad,
    payload: proveedores,
});


export const startDeleteProveedor = ( id ) => {

    return async ( dispatch ) =>{

        await db.collection(`proveedores`).doc( id ).delete();

        dispatch( deleteProveedor( id ) )
        dispatch( startLoadingProveedores() )

    }    
}

export const deleteProveedor = ( id ) => ({
    type: types.proveedorDelete,
    payload: `Proveedor ${id} eliminado correctamente`,

})

export const activeProveedor = ( id ) => {

    return async ( dispatch ) => {

        const proveedorSnap = await db.collection('proveedores').doc(id).get();
        const proveedor = {
            id: proveedorSnap.id,
            ...proveedorSnap.data()
        }

        dispatch( setActiveProveedor(proveedor) )
        
    }    
}

export const setActiveProveedor = ( proveedor ) => ({
    type: types.proveedorActive,
    payload: proveedor
})

export const cleanActiveProveedor = () => ({
    type: types.proveedorCleanActive,
    payload: [],
})