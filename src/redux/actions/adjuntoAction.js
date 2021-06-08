import firebase from 'firebase'

import { db } from '../../firebase/config';
import { types } from '../types/types';

export const newAdjunto = ( idFaena, file, atributo ) => {
    return async( dispatch ) => {

        const storageRef = firebase.storage().ref(`/faenas/${idFaena}/${file.name}`)
        await storageRef.put(file)
        const url = await storageRef.getDownloadURL()

        console.log(url)

        switch (atributo) {
            case 'vep':
                await db.collection('faenas').doc(idFaena).update({vep: url})
                dispatch( addNewVep( url ) )

                break;

            case 'guia':
                await db.doc(`/faenas/${idFaena}`).update({guia: url})
                dispatch( addNewGuia( url ) )

                break;

            case 'oficial':
                await db.doc(`/faenas/${idFaena}`).update({oficial: url})
                dispatch( addNewOficial( url ) )

                break;

            case 'interno':
                await db.doc(`/faenas/${idFaena}`).update({interno: url})
                dispatch( addNewInterno( url ) )

                break;
        
            default:
                break;
        }
        
    }
}

export const addNewVep = ( url ) => {
    console.log(url)

    return {
        type: types.adjuntoAddNew,
        payload: {
            vep : url
        }
    }
}

export const addNewGuia = ( url ) => {

    return {
        type: types.adjuntoAddNew,
        payload: {
            guia : url
        }
    }
}

export const addNewOficial = ( url ) => {

    return {
        type: types.adjuntoAddNew,
        payload: {
            oficial : url
        }
    }
}

export const addNewInterno = ( url ) => {

    return {
        type: types.adjuntoAddNew,
        payload: {
            interno : url
        }
    }
}