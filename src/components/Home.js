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
    <>
      <h3>LOGIN</h3>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="email"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <button type="submit">Enviar</button>
      </form>
    </>
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
