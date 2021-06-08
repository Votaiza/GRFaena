import { db } from '../../firebase/config';
import { types } from '../types/types';

export const loadProvincias = async () => {

    const provinciasSnap = await db.collection(`provincias`).get();
    const provincias = [];

    provinciasSnap.forEach( snapHijo => {
        provincias.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return provincias;

}

export const startLoadingProvincias = () => {

    
    return async( dispatch ) => {

        const provincias = await loadProvincias();
        
        dispatch( setProvincias( provincias ) );
    }
}

export const setProvincias = ( ciudades ) => ({
    type: types.provinciaLoad,
    payload: ciudades,
});