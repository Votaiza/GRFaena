import React from 'react';
import { useDispatch } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { MyTextInput, MySelect } from './Formik'
import { newCliente } from '../redux/actions/clienteActions';

export default function Clientes() {

  const dispatch = useDispatch();

    return (
        <>
        <h3>Alta Usuario</h3>
        <Formik
          initialValues={{
            codFCM: '',
            codFDZ: '',
            nombreCompleto: '',
            nombreFantasia: '',
            provincia: '',
            localidad: '',
            telefono: '',
            direccion: '',
            altura: '',
            encargado: '',
            email: '',
          }}

          validationSchema={Yup.object({
            nombreCompleto: Yup.string()
              .required('Required'),
            nombreFantasia: Yup.string()
              .required('Required'),
            provincia: Yup.string()
              .required('Required'),
            localidad: Yup.boolean()
              .required('Required'),
            encargado: Yup.string()
              .required('Required'),
          })}

          onSubmit={(values, { setSubmitting }) => {
            dispatch( newCliente(values) )
          }}
        >

          <Form className="uk-form-stacked">
            
            <div uk-grid="true">

                <div className="uk-width-1-2">
                    <MyTextInput
                    label="Cod. Cliente FCM"
                    name="codFCM"
                    type="text"
                    placeholder=""
                    />
                </div>
    
                <div className="uk-width-1-2">
                    <MyTextInput
                    label="Cod. Cliente FDZ"
                    name="codFDZ"
                    type="text"
                    placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                    label="Nombre Completo"
                    name="nombreCompleto"
                    type="text"
                    placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">    
                    <MyTextInput
                    label="Nombre Fantasia"
                    name="nombreFantasia"
                    type="text"
                    placeholder=""
                    />
                </div>
    
                <div className="uk-width-1-2">
                    <MySelect label="Provincia" name="provincia">
                    <option value="">Seleccione una Provincia</option>
                    </MySelect>
                </div>
                
                <div className="uk-width-1-2">
                    <MySelect label="Localidad" name="localidad">
                    <option value="">Seleccione una Localidad</option>
                    </MySelect>
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                    label="Telefono"
                    name="telefono"
                    type="text"
                    placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                    label="Direccion"
                    name="direccion"
                    type="text"
                    placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                    label="Encargado"
                    name="encargado"
                    type="text"
                    placeholder=""
                    />
                </div>

                <div className="uk-width-1-2">
                    <MyTextInput
                    label="Correo Electronico"
                    name="email"
                    type="email"
                    placeholder=""
                    />
                </div>
            </div>


            <div className="uk-margin">
              <button type="submit" className="uk-button uk-button-primary uk-button-small">Guardar</button>
              <button className="uk-button uk-button-danger uk-button-small">Cancelar</button>
            </div>

          </Form>
        </Formik>
      </>
    )
}
