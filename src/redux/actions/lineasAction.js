import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newLinea = ( idFaena, linea ) => {
    return async( dispatch ) => {

        await db.collection(`/faenas/${idFaena}/lineas/`).add(linea)

        dispatch( startLoadingLineas( idFaena ))

    }
}


export const loadLineas = async ( idFaena ) => {

    const lineasSnap = await db.collection(`/faenas/${ idFaena }/lineas/`).get();
    const lineas = [];

    lineasSnap.forEach( snapHijo => {
        lineas.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return lineas;

}

export const startLoadingLineas = ( idFaena ) => {
    
    return async( dispatch ) => {

        const lineas = await loadLineas( idFaena );
        
        dispatch( setLineas( lineas ) );
    }
}

export const setLineas = ( lineas ) => ({
    type: types.lineaLoad,
    payload: lineas,
});