import React from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput, MySelect } from './Formik'

export default function AltaFaena() {
    return (
        <>
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
            idCliente: Yup.string()
              .required('Required'),
            precio: Yup.string()
              .required('Required'),
            proveedor: Yup.string()
              .required('Required'),
            costo: Yup.string()
              .required('Required'),
          })}

          onSubmit={(values, { setSubmitting }) => {
            
          }}
        >

          <Form className="uk-form-stacked">
            
            <div uk-grid="true">

                <div className="uk-width-1-2">
                    <MyTextInput
                        label="Producto"
                        name="producto"
                        type="text"
                        placeholder=""
                    />
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
                    <MySelect label="Cliente" name="cliente">
                    <option value="">Seleccione un Cliente</option>
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

            <div>    
                <button type="submit" className="uk-button uk-button-primary">Guardar</button>
                <button className="uk-button uk-button-danger">Cancelar</button>
            </div>
  

          </Form>
        </Formik>
      </>
    )
}
