import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "../App.css";
import lock from "../images/lock.png";
import user from "../images/user.png";

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
              <form className="login-form">
                <img src="" alt="" />
                <h2 style={{ color: "rgb(81, 147, 247)" }}>LOGIN</h2>
                <div className="input-box">
                  <img src={user} alt="" />
                  <Field
                    className="input"
                    name="username"
                    type="text"
                    id="name"
                    placeHolder="Username"
                  />
                </div>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="username"
                  component="div"
                />
                <div className="input-box">
                  <img src={lock} alt="" />
                  <Field
                    className="input"
                    name="password"
                    type="password"
                    id="password"
                    placeHolder="*********"
                  />
                </div>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="password"
                  component="div"
                />
                <button type="submit" id="submit-btn">
                  Login
                </button>
                <p>
                  Don't have an account? <Link to="/register">Signup</Link> Here
                </p>
              </form>
            </div>
          );
        }}
      />
      {/*  */}
    </>
  );
}

export default connect((state) => state, actionCreators)(Login);
