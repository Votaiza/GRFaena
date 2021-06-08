import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { MyTextInput, MySelect } from './Formik'
import { newCliente } from '../redux/actions/clienteActions';


export default function Clientes() {

  const dispatch = useDispatch();

  const { provincias, ciudades } = useSelector(state => state.localidades)
  

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
                      {
                        provincias.map( provincia => (
                          <option value={provincia.nombre} key={provincia.id}>{ provincia.nombre }</option>
                        ))
                      }                      
                    </MySelect>
                </div>
                
                <div className="uk-width-1-2">
                    <MySelect label="Localidad" name="localidad">
                      <option value="">Seleccione una Localidad</option>
                      {
                        ciudades.map( ciudad => (
                          <option value={ciudad.nombre} key={ciudad.id}>{ ciudad.nombre }</option>
                        ))
                      }
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
              <Link to="/ListadoCliente" className="uk-button uk-button-danger uk-button-small">Cancelar</Link>
            </div>

          </Form>
        </Formik>
      </>
    )
}
