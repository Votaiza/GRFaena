import { db } from '../../firebase/config';
import { types } from '../types/types';

export const loadCiudades = async () => {

    const ciudadesSnap = await db.collection(`ciudades`).get();
    const ciudades = [];

    ciudadesSnap.forEach( snapHijo => {
        ciudades.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return ciudades;

}

export const startLoadingCiudades = () => {

    
    return async( dispatch ) => {

        const ciudades = await loadCiudades();
        
        dispatch( setCiudades( ciudades ) );
    }
}

export const setCiudades = ( ciudades ) => ({
    type: types.ciudadLoad,
    payload: ciudades,
});