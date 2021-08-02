import { db } from '../../firebase/config';
import { types } from '../types/types';

export const loadStock = async () => {

    const stockSnap = await db.collection(`stock`).get();
    const items = [];

    stockSnap.forEach( snapHijo => {
        items.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return items;

}

export const startLoadingStock = () => {
    
    return async( dispatch ) => {

        const stock = await loadStock();
        
        dispatch( setStock( stock ) );
    }
}

export const setStock = ( stock ) => ({
    type: types.stockLoad,
    payload: stock,
});

export const addItems = ( cant, num ) => {

    return async (dispatch) => {
        let siguiente = num

        for (let x = 0; x < cant; x++) {

            let item = {
                correlativo: siguiente,
                producto: 'Capón',
                tipo: 'Completo'
            };
            await db.collection('stock').add(item);

            siguiente ++

        }

        dispatch ( startLoadingStock() )
    }
}

export const updateStock = ( id, valores ) => {
    return async ( dispatch ) =>{        
        await db.collection('stock').doc(id).update(valores)

        dispatch( startLoadingStock() )
    }
}

export const startDeleteStock = ( values ) => {    
    return async ( dispatch ) =>{
        
        await values.forEach( snapHijo => {
            db.collection(`stock`).doc( snapHijo ).delete();            
        })

        dispatch( startLoadingStock() )
    }    
}