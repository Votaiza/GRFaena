import { useSelector } from 'react-redux';
import { db, firebase } from '../../firebase/config';
import { types } from '../types/types';
import { startLoadingStock } from './stockAction';
import dayjs from 'dayjs'

export const loadCtaCte = async () => {

    const ctaSnap = await db.collection(`cuentaCorriente`).get();
    const items = [];

    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    ctaSnap.forEach( snapHijo => {
        items.push({
            id: snapHijo.id,
            ...snapHijo.data(),
            // fechaMovimiento: new Date(parseInt(snapHijo.data().fechaMovimiento)).toLocaleDateString('es-ES', options)
        })
    })

    return items;

}

export const startLoadingCtaCte = () => {
    
    return async( dispatch ) => {

        const cuentas = await loadCtaCte();
        
        dispatch( setCtaCte( cuentas ) );
    }
}

export const setCtaCte = ( cuentas ) => ({
    type: types.ctaCteLoad,
    payload: cuentas,
});

export const addCuenta = ( idItems ) => {
    return async (dispatch) => {

        const items = []
        const stock = []
        const stockSnap = await db.collection(`stock`).get();
    
        stockSnap.forEach( snapHijo => {
            stock.push({
                id: snapHijo.id,
                ...snapHijo.data(),
            })
        })
    
        idItems.map( idItem => {
            items.push( stock.find( item => idItem == item.id ) )
        })
        
        dispatch(newCuenta( items ))
    }
}

const lastCuenta = async (idCliente) => {
    const cuentasSnap = await db.collection('cuentaCorriente').where('idCliente', '==', `${idCliente}`).orderBy('idCuenta', 'desc').limit(1).get();
    let cuentaSaldo = 0

    cuentasSnap.forEach( snapHijo => {

        if( snapHijo.data().saldo ) {
            cuentaSaldo = snapHijo.data().saldo
            
        }
    })

    return cuentaSaldo
} 

const newCuenta = (items) => {
    
    return async (dispatch) => {

        const contadores = await db.collection(`contadores`).doc('contadores').get();
        let idCtaCte = contadores.data().nroCtaCte;
        const fechaMovimiento = dayjs(Date.now()).format('DD/MM/YYYY')
        
        const cuentas = []
        
        
        
        items.map( item => {

            let indice = cuentas.findIndex( cuenta => 
                cuenta.idCliente === item.idCliente
            )

            // let saldoCuenta = lastCuenta( item.idCliente )
            
            if( indice<0 ){
                cuentas.push({
                    idCuenta: idCtaCte,
                    idCliente: item.idCliente,
                    fechaMovimiento: fechaMovimiento,
                    importeMovimiento: item.precio * item.peso,
                    // saldo: saldoCuenta + (item.precio * item.peso),
                    detalle: [item],
                })
                idCtaCte++
                db.collection('contadores').doc('contadores').update({nroCtaCte: idCtaCte})
                
            }
            else{
                cuentas[indice].detalle.push(item)
                cuentas[indice].importeMovimiento = cuentas[indice].importeMovimiento + (item.precio * item.peso)
                // cuentas[indice].saldo = cuentas[indice].saldo + (item.precio * item.peso)
            }
    
            db.collection('stock').doc(item.id).update({estado: 'C'})
            
        })
            
        calcularSaldoCuenta(cuentas)
        
        setTimeout(() => {
            cuentas.map( cuent => {
                db.collection('cuentaCorriente').add(cuent)
            })

            dispatch( startLoadingStock() )
            
        }, 2000);
    }
    
}

export const calcularSaldoCuenta = (cuentas) => {

    const movimiento = cuentas.map( async cuenta => {
        cuenta.saldo  = await lastCuenta( cuenta.idCliente ) + cuenta.importeMovimiento
    })

    return movimiento
}


export const newPago = (importe, observacion, idCliente) => {
    return async (dispatch) => {
        
        const contadores = await db.collection(`contadores`).doc('contadores').get();
        let idCtaCte = contadores.data().nroCtaCte;
        const fechaMovimiento = Date.now().toString()
        let saldoCuenta = await lastCuenta( idCliente )

        const cuenta = {
            idCuenta: idCtaCte,
            idCliente: idCliente,
            fechaMovimiento: fechaMovimiento,
            importeMovimiento: importe * -1,
            saldo: saldoCuenta + (importe * -1),
            observacion: observacion,
        }

        idCtaCte++
        await db.collection('contadores').doc('contadores').update({nroCtaCte: idCtaCte})

        await db.collection('cuentaCorriente').add(cuenta)

        dispatch( startLoadingCtaCte() )
    }
}
    
export const updateStock = ( id, valores ) => {
    return async ( dispatch ) =>{        
        await db.collection('stock').doc(id).update(valores)

        // dispatch( startLoadingStock() )
    }
}

export const startDeleteStock = ( values ) => {    
    return async ( dispatch ) =>{
        
        await values.forEach( snapHijo => {
            db.collection(`stock`).doc( snapHijo ).delete();            
        })

        // dispatch( startLoadingStock() )
    }    
}