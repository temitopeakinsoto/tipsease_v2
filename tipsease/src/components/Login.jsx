import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "../App.css";

// COMPONENTS

import Title from "./Title";

// STATE

import * as actionCreators from "../state/actionCreators";
import { connect } from "react-redux";

const initialValuesLogin = {
  username: "",
  password: "",
};

const loginEndpoint = "https://build-tipsease.herokuapp.com/auth/users/login";

const validationSchema = yup.object().shape({
  username: yup.string().required().min(2, "Too short"),
  password: yup.string().required(),
});

function Login({
  getCurrentUser,
  history,
  resetTipSuccess,
  activateErrorLogin,
  loginError,
  setError,
  clearError,
  error,
}) {
  useEffect(() => {
    resetTipSuccess();
  }, []);

  const onLoginFormSubmission = (values, action) => {
    axios
      .post(loginEndpoint, {
        username: values.username,
        password: values.password,
        isServiceWorker: false,
      })
      .then((res) => {
        clearError();
        localStorage.setItem("authorization", res.data.token);
        getCurrentUser(res.data.userInfo);
        history.push("/app/home");
      })
      .catch((error) => {
        activateErrorLogin();
        action.resetForm();
        setError(error.response.data.message);
      });
  };
  return (
    <>
      {/* <Title />
      {error[0] ? (
        <section>
          <h2>{error[1]}. Please try again.</h2>
        </section>
      ) : null} */}
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValuesLogin}
        onSubmit={onLoginFormSubmission}
        render={(props) => {
          return (
            <div className="login-container">
              <div className="login-wrapper">
                <form className="login-form">
                  <div>
                    <img src="" alt="" />
                    Welcome Back! Please Login to your account
                  </div>
                  <label htmlFor="name">username:</label>
                  <Field name="username" type="text" id="name" />
                  <ErrorMessage name="username" component="div" />
                  <label htmlFor="password">password:</label>
                  <Field name="password" type="password" id="password" />
                  <ErrorMessage name="password" component="div" />
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          );
        }}
      />
      {/*  */}
    </>
  );
}

export default connect((state) => state, actionCreators)(Login);
