import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, Redirect } from "react-router-dom";

import { MyTextInput, MySelect } from './Formik'
import { newLinea } from '../redux/actions/lineasAction';


export default function AltaFaena() {

    const dispatch = useDispatch();

    const [save, setSave] = useState(false)
    
    const { id } = useSelector(state => state.faena.active)
    const { clientes } = useSelector(state => state.clientes)
    const { ciudades } = useSelector(state => state.localidades)

    return (
        <>
        {
            save &&
            <Redirect to="/newfaena"></Redirect>
        }

        <Formik
          initialValues={{
            producto: '',
            correlativo: '',
            peso: '',
            estado: '',
            idCliente: '',
            apellido: '',
            ciudad: '',
            ruta: '',
            precio: '',
            transporte: '',
            tocino: '',
            proveedor: '',
            costo: '',
          }}

          validationSchema={Yup.object({
            producto: Yup.string()
              .required('Required'),
            correlativo: Yup.string()
              .required('Required'),
            peso: Yup.string()
              .required('Required'),
            estado: Yup.string()
              .required('Required'),
          })}

          onSubmit={(values, { setSubmitting }) => {
            dispatch( newLinea( id, values ) );
            setSave( true );
          }}
        >

          <Form className="uk-form-stacked">
            
            <div uk-grid="true">

                <div className="uk-width-1-2">
                    <MySelect label="Producto" name="producto">
                        <option value="">Seleccione un Producto</option>
                        <option value="Capon de Descarte">Capon de Descarte</option>
                        <option value="Capon">Capon</option>
                        <option value="Chancha">Chancha</option>
                        <option value="Padrillo">Padrillo</option>
                    </MySelect>
                </div>
    
                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Correlativo"
                        name="correlativo"
                        type="text"
                        placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Peso"
                        name="peso"
                        type="text"
                        placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">    
                    <MyTextInput
                        label="Estado"
                        name="estado"
                        type="text"
                        placeholder=""
                    />
                </div>
    
                <div className="uk-width-1-2">
                    <MySelect label="Cliente" name="idCliente">
                        <option value="">Seleccione un Cliente</option>
                        {
                            clientes.map( cliente => (
                                <option value={cliente.id}>{ cliente.nombreCompleto }</option>
                            ))
                        }
                    </MySelect>
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Apellido"
                        name="apellido"
                        type="text"
                        placeholder=""
                    />
                </div>
                
                <div className="uk-width-1-2">
                    <MySelect label="Ciudad" name="ciudad">
                        <option value="">Seleccione una Ciudad</option>
                        {
                            ciudades.map( ciudad => (
                                <option value={ciudad.id}>{ ciudad.nombre }</option>
                            ))
                        }
                    </MySelect>
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Ruta"
                        name="ruta"
                        type="text"
                        placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Precio"
                        name="precio"
                        type="text"
                        placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Transporte"
                        name="transporte"
                        type="text"
                        placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                    label="Tocino"
                    name="tocino"
                    type="text"
                    placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Proveedor"
                        name="proveedor"
                        type="text"
                        placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Costo"
                        name="costo"
                        type="text"
                        placeholder=""
                    />
                </div>
            </div>

            <div className="uk-margin">    
                <button type="submit" className="uk-button uk-button-primary uk-button-small" >Guardar</button>
                <Link to="/newfaena" className="uk-button uk-button-danger uk-button-small">Cancelar</Link>
            </div>
  

          </Form>
        </Formik>
      </>
    )
}
