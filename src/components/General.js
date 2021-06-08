import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput } from './Formik'
import { newGeneral } from '../redux/actions/generalAction';

export default function General() {

    const dispatch = useDispatch();

    const faena = useSelector(state => state.faena.active)

    return (
        <div>
            <Formik
                initialValues={{
                    fechaProduccion: (faena.fechaProduccion) ? faena.fechaProduccion : '',
                    nroTropa: (faena.fechaProduccion) ? faena.fechaProduccion : '',
                    caponDescarteKg: (faena.caponDescarteKg) ? faena.caponDescarteKg : '',
                    caponKg: (faena.caponKg) ? faena.caponKg : '',
                    chanchaKg: (faena.chanchaKg) ? faena.chanchaKg : '',
                    padrilloKg: (faena.padrilloKg) ? faena.padrilloKg : '',
                    caponDescarteFaena: (faena.caponDescarteFaena) ? faena.caponDescarteFaena : '',
                    caponFaena: (faena.caponFaena) ? faena.caponFaena : '',
                    chanchaFaena: (faena.chanchaFaena) ? faena.chanchaFaena : '',
                    padrilloFaena: (faena.padrilloFaena) ? faena.padrilloFaena : '',
                    caponDescarteCabeza: (faena.caponDescarteCabeza) ? faena.caponDescarteCabeza : '',
                    caponCabeza: (faena.caponCabeza) ? faena.caponCabeza : '',
                    chanchaCabeza: (faena.chanchaCabeza) ? faena.chanchaCabeza : '',
                    padrilloCabeza: (faena.padrilloCabeza) ? faena.padrilloCabeza : '',
                }}

                // validationSchema={Yup.object({
                //     fechaProduccion: Yup.date()
                //     .required('Required'),
                //     nroTropa: Yup.number()
                //     .required('Required'),
                //     caponDescarteKg: Yup.number()
                //     .required('Required'),
                //     caponKg: Yup.number()
                //     .required('Required'),
                //     chanchaKg: Yup.number()
                //     .required('Required'),
                //     padrilloKg: Yup.number()
                //     .required('Required'),
                //     caponDescarteFaena: Yup.number()
                //     .required('Required'),
                //     caponFaena: Yup.number()
                //     .required('Required'),
                //     chanchaFaena: Yup.number()
                //     .required('Required'),
                //     padrilloFaena: Yup.number()
                //     .required('Required'),
                //     caponDescarteCabeza: Yup.number()
                //     .required('Required'),
                //     caponCabeza: Yup.number()
                //     .required('Required'),
                //     chanchaCabeza: Yup.number()
                //     .required('Required'),
                //     padrilloCabeza: Yup.number()
                //     .required('Required'),
                // })}

                onSubmit={(values, { setSubmitting }) => {
                    dispatch( newGeneral( faena.id, values ) )
                }}
                >

                <Form className="uk-form-stacked">
                    
                    <div uk-grid="true">

                        <div className="uk-width-1-1" uk-grid="true">

                            <div className="uk-width-1-1">
                                <h4>Numero de Cliente</h4>
                            </div>

                            <div className="uk-width-1-1" uk-grid="true">
                                <div className="uk-width-1-4">
                                    <MyTextInput
                                    label="Fecha de Produccion"
                                    name="fechaProduccion"
                                    type="date"
                                    placeholder=""
                                    />
                                </div>
                    
                                <div className="uk-width-1-4">
                                    <MyTextInput
                                    label="Nro de Tropa"
                                    name="nroTropa"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="uk-width-1-1" uk-grid="true">
                            <div className="uk-width-1-1">
                                <h3>Precio por Kilos</h3>
                            </div>

                            <div className="uk-width-1-1" uk-grid="true">                                
                                <div className="uk-width-1-4">
                                    <MyTextInput
                                    label="Capon Descarte"
                                    name="caponDescarteKg"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>

                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Capon"
                                    name="caponKg"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>

                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Chancha"
                                    name="chanchaKg"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>

                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Padrillo"
                                    name="padrilloKg"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="uk-width-1-1" uk-grid="true">
                            <div className="uk-width-1-1">
                                <h3>Precio por Faena</h3>
                            </div>

                            <div className="uk-width-1-1" uk-grid="true">

                                <div className="uk-width-1-4">
                                    <MyTextInput
                                    label="Capon Descarte"
                                    name="caponDescarteFaena"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>

                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Capon"
                                    name="caponFaena"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>
                    
                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Chancha"
                                    name="chanchaFaena"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>

                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Padrillo"
                                    name="padrilloFaena"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>
                            </div>

                        </div>
                        
                        <div className="uk-width-1-1" uk-grid="true">
                            <div className="uk-width-1-1">
                                <h3>Precio por Cabeza</h3>
                            </div>

                            <div className="uk-width-1-1" uk-grid="true">
                                <div className="uk-width-1-4">
                                    <MyTextInput
                                    label="Capon Descarte"
                                    name="caponDescarteCabeza"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>

                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Capon"
                                    name="caponCabeza"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>
                    
                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Chancha"
                                    name="chanchaCabeza"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>

                                <div className="uk-width-1-4">    
                                    <MyTextInput
                                    label="Padrillo"
                                    name="padrilloCabeza"
                                    type="text"
                                    placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="uk-margin">
                        <button type="submit" 
                                className="uk-button uk-button-primary uk-button-small">
                            GUARDAR GENERALES
                        </button>
                    </div>

                </Form>
            </Formik>
        </div>
    )
}
