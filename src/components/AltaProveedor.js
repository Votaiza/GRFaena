import { Form, Formik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Container } from '@material-ui/core';

import { cleanActiveProveedor, newProveedor, updateProveedor } from '../redux/actions/proveedoresAction';
import { setSaveProveedor } from '../redux/actions/ui';
import { MyTextInput } from './Formik';

export default function AltaProveedor() {

    const dispatch = useDispatch();

    const { active } = useSelector( state => state.proveedores );
    const { saveProveedor } = useSelector(state => state.ui)

    useEffect(() => {
        dispatch( setSaveProveedor( false ) )
    }, [dispatch])

    const handleCancel = () => {
        dispatch( cleanActiveProveedor() )
        dispatch( setSaveProveedor( true ) )
    }

    return (
        <Container>
            <h3>Alta Proveedor</h3>
            <Formik
                initialValues={{
                    proveedor: active.proveedor ? active.proveedor : '',
                    email: active.email ? active.email : '',
                    telefono: active.telefono ? active.telefono : '',
                }}

                validationSchema={Yup.object({
                    proveedor: Yup.string()
                    .required('Required'),
                })}

                onSubmit={async (values, { setSubmitting }) => {

                    if(active.length === 0){
                        await dispatch( newProveedor(values) )
                    }else{
                        await dispatch( updateProveedor( active.id, values ) )
                    }

                    dispatch( setSaveProveedor( true ) )
                }}
            >

                <Form className="">
                    
                    <div >

                        <div >
                            <MyTextInput
                                label="Proveedor"
                                name="proveedor"
                                type="text"
                                placeholder=""
                            />
                        </div>
            
                        <div >
                            <MyTextInput
                                label="Email"
                                name="email"
                                type="email"
                                placeholder=""
                            />
                        </div>

                        <div >
                            <MyTextInput
                                label="Telefono"
                                name="telefono"
                                type="text"
                                placeholder=""
                            />
                        </div>

                        <div >
                            <MyTextInput
                                label="Ciudad"
                                name="ciudad"
                                type="text"
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div >
                        <button type="submit" className="uk-button uk-button-primary uk-button-small">Guardar</button>

                        { saveProveedor && <Redirect to="/listadoproveedores"></Redirect> }

                        <Link to="/listadoproveedores" 
                                className="uk-button uk-button-danger uk-button-small"
                                onClick={ handleCancel }
                        >Cancelar</Link>
                    </div>

                </Form>
            </Formik>
        </Container>
    )
}
