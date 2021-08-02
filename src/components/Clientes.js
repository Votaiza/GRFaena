import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, Redirect } from 'react-router-dom';

import { MyTextInput, MySelect } from './Formik'
import { newCliente, cleanActiveCliente, updateCliente } from '../redux/actions/clienteActions';
import { setSaveCliente } from '../redux/actions/ui';


export default function Clientes() {

  const dispatch = useDispatch();

  const { provincias, ciudades } = useSelector(state => state.localidades)
  const { active } = useSelector( state => state.clientes );
  const { saveCliente } = useSelector(state => state.ui)

  useEffect(() => {
    dispatch( setSaveCliente( false ) )
  }, [dispatch])
  
  const handleCancel = () => {
    dispatch( cleanActiveCliente() )
    dispatch( setSaveCliente( true ) )
  }

    return (
        <>
        <h3>Alta Usuario</h3>
        <Formik
          initialValues={{
            codFCM: active.codFCM ? active.codFCM : '',
            codFDZ: active.codFDZ ? active.codFDZ : '',
            nombreCompleto: active.nombreCompleto ? active.nombreCompleto : '',
            nombreFantasia: active.nombreFantasia ? active.nombreFantasia : '',
            provincia: active.provincia ? active.provincia : '',
            localidad: active.localidad ? active.localidad : '',
            telefono: active.telefono ? active.telefono : '',
            direccion: active.direccion ? active.direccion : '',
            altura: active.altura ? active.altura : '',
            encargado: active.encargado ? active.encargado : '',
            email: active.email ? active.email : '',
          }}

          validationSchema={Yup.object({
            nombreCompleto: Yup.string()
              .required('Required'),
            nombreFantasia: Yup.string()
              .required('Required'),
            encargado: Yup.string()
              .required('Required'),
          })}

          onSubmit={async (values, { setSubmitting }) => {         

            if(active.length === 0){
              await dispatch( newCliente(values) )
            }else{
              await dispatch( updateCliente( active.id, values ) )
            }

            dispatch( setSaveCliente( true ) )
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

              { saveCliente && <Redirect to="/ListadoCliente"></Redirect> }

              <Link to="/ListadoCliente" 
                    className="uk-button uk-button-danger uk-button-small"
                    onClick={ handleCancel }
              >Cancelar</Link>
            </div>

          </Form>
        </Formik>
      </>
    )
}
