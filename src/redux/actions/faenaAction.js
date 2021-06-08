import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newFaena = (  ) => {
    return async( dispatch ) => {

        const faena = {};
        const doc = await db.collection('faenas').add(faena);

        dispatch( activeFaena( doc.id ) )

    }

}

export const addNewFaena = ( id ) => {

    return {
        type: types.faenaAddNew,
        payload: {id}
    }
}

export const activeFaena = ( id ) => ({
    type: types.faenaActive,
    payload: id,
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