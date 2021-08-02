import { db } from '../../firebase/config';
import { types } from '../types/types';

export const loadFrigorifico = async () => {

    const stockSnap = await db.collection(`frigorifico`).get();
    const items = [];

    stockSnap.forEach( snapHijo => {
        items.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return items;

}

export const startLoadingFrigorifico = () => {
    
    return async( dispatch ) => {

        const frigorificos = await loadFrigorifico();
        
        dispatch( setFrigorifico( frigorificos ) );
    }
}

export const setFrigorifico = ( stock ) => ({
    type: types.frigorificoLoad,
    payload: stock,
});

export const addFrigorifico = ( value ) => {

    return async (dispatch) => {
        await db.collection('frigorifico').add(value);
        
        dispatch ( startLoadingFrigorifico() )
    }
}

