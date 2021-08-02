import { useDispatch } from "react-redux";
import { useFormik } from 'formik';

import { startLogin } from '../redux/actions/authActions'

export const Home = () => {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => {
      dispatch( startLogin( values.email, values.password) )
    },
  });

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle backgroud-gray" uk-height-viewport="true">
      <div className="" >
        <div className="uk-flex uk-flex-center">
          <img className="" src="" alt="Logo" />
        </div>
        
        <form onSubmit={formik.handleSubmit} className="uk-form">

          <div className="uk-margin">
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: user"></span>
              <input
                className="uk-input"
                id="email"
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

            </div>
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

          </div>

          <div className="uk-margin">
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: lock"></span>
              <input
                  className="uk-input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  autoComplete="off"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

            </div>
            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}

          </div>



          <button type="submit" className="uk-button uk-button-primary uk-button-small">Enviar</button>
        </form>

      </div>
    </div>
  );
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Requerido';
  }

  if (!values.password) {
    errors.password = 'Requerido';
  }

  return errors;
};
