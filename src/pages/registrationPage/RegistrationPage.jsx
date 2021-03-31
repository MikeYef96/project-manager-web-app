import React from "react";
import { Formik, Form, Field, /*ErrorMessage*/ } from "formik";
import {register} from '../../redux/auth/auth-operations'
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  registerForm,
  registerFormInput,
  registerFormTitle,
  registerPageButton,
  registerFormText,
  // errorMessage
} from './RegisterPage.module.css';
import { NavLink } from "react-router-dom";
import AuthBackground from "components/AuthBackground/AuthBackground";




const regSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
});
export default function Registration() {
  const dispatch = useDispatch();

  return (
    <main>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={regSchema}
        onSubmit={(values) => {
          const {email,password,confirmPassword} = values
          if (password === confirmPassword) {
          dispatch(register({email, password}));
          } else {
            alert("пароли не совпадают");
            return
          }
        }}
      >
        <Form className={registerForm}>
          <h2 className={registerFormTitle}>Регистрация</h2>
          <Field
            autoComplete="on"
            className={registerFormInput}
            type="email"
            name="email"
            placeholder="email"
          />
          {/* <ErrorMessage name="email" component="span" className={errorMessage}/> */}
          <Field
            autoComplete="on"
            className={registerFormInput}
            type="password"
            name="password"
            placeholder="password"
          />
          {/* <ErrorMessage name="password" component="span" className={errorMessage}/> */}
          <Field
            autoComplete="on"
            className={registerFormInput}
            type="password"
            name="confirmPassword"
            placeholder="confirm password"
          />
          {/* <ErrorMessage name="confirmPassword" component="span" className={errorMessage}/> */}
          <button className={registerPageButton} type="submit">
            Submit
          </button>
          <p className={registerFormText}>
            Уже есть аккаунт?{' '}
              <NavLink className={registerFormText} to="/login">Войти</NavLink>
          </p>
        </Form>
      </Formik>
      <AuthBackground/>
    </main>
  );
}
