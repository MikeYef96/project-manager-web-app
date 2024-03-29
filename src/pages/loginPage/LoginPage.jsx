import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/auth-operations';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink } from 'react-router-dom';
import styles from './LoginPage.module.css';
import Loader from '../../shared/Loader/Loader';
import { authSelectors } from '../../redux/auth/auth-selectors';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('* Обов’язкове поле')
    .email('Введіть корректну адресу'),
  password: Yup.string().required('* Обов’язкове поле'),
});
export default function Login() {
  const loading = useSelector(authSelectors.authLoadingSelector);

  const dispatch = useDispatch();
  return (
    <main>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={values => {
          const { email, password } = values;
          dispatch(login({ email, password }));
        }}
      >
        <div className={styles.container}>
          <Form className={styles.registerForm}>
            <h2 className={styles.registerFormTitle}>Вхід</h2>
            <Field
              autoComplete="on"
              className={styles.registerFormInput}
              type="email"
              name="email"
              placeholder="E-mail"
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.errorMessageEmail}
            />
            <Field
              autoComplete="on"
              className={styles.registerFormInput}
              type="password"
              name="password"
              placeholder="Пароль"
            />
            <ErrorMessage
              name="password"
              component="span"
              className={styles.errorMessagePassword}
            />

            <button className={styles.registerPageButton} type="submit">
              Увійти
            </button>
            <p className={styles.registerFormText}>
              Маєте аккаунт?{' '}
              <NavLink className={styles.registerFormText} to="/registration">
                Зареєструватись
              </NavLink>
            </p>
          </Form>
        </div>
      </Formik>

      {loading && <Loader />}
    </main>
  );
}
