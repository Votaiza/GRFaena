import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newFaena = (  ) => {
    return async( dispatch ) => {

        const faena = {};
        const doc = await db.collection('faenas').add(faena);

        faena.id = doc.id;

        dispatch( setActiveFaena( faena ) )

    }

}

export const addNewFaena = ( id ) => {

    return {
        type: types.faenaAddNew,
        payload: {id}
    }
}

export const activeFaena = ( id ) => {

    return async ( dispatch ) => {

        const faenaSnap = await db.collection('faenas').doc(id).get();
        const faena = {
            id: faenaSnap.id,
            ...faenaSnap.data()
        }

        dispatch( setActiveFaena(faena) )
        
    }    
}

export const setActiveFaena = ( faena ) => ({
    type: types.faenaActive,
    payload: faena,
})

export const loadFaenas = async () => {

    const faenasSnap = await db.collection(`faenas`).get();
    const faenas = [];

    faenasSnap.forEach( snapHijo => {
        faenas.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return faenas;

}

export const startLoadingFaenas = () => {

    
    return async( dispatch ) => {

        const faenas = await loadFaenas();
        
        dispatch( setFaenas( faenas ) );
    }
}

export const setFaenas = ( faenas ) => ({
    type: types.faenaLoad,
    payload: faenas,
});

export const startDeleteFaena = ( id ) => {

    return async ( dispatch ) =>{

        await db.collection(`faenas`).doc( id ).delete();

        dispatch( deleteFaena( id ) )
        dispatch( startLoadingFaenas() )

    }    
}

export const deleteFaena = ( id ) => ({
    type: types.faenaDelete,
    payload: `Faena ${id} eliminado correctamente`,

})

export const cleanActiveFaena = () => ({
    type: types.faenaCleanActive,
    payload: {},
})