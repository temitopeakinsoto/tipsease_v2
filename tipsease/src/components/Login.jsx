import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";
import "../App.css";
import lock from "../images/lock.png";
import user from "../images/user.png";

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
    console.log("on submit is: ", values);
    axios
      .post(loginEndpoint, {
        username: values.username,
        password: values.password,
        isServiceWorker: false,
      })
      .then((res) => {
        console.log("our ressss is ", res.data)
        localStorage.setItem("authorization", res.data.token);
        getCurrentUser(res.data.userInfo);
        clearError();
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
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValuesLogin}
        onSubmit={onLoginFormSubmission}
        render={(props) => {
          return (
            <div className="login-container">
              <Form className="login-form">
                <img src="" alt="" />
                <h2 style={{fontSize: "20px", fontWeight:"bold"}}>LOGIN</h2>
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
                  <img style={{width: "14px"}} src={lock} alt="" />
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
                { error[0] && <p style={{color: "red"}}>{error[1]}</p> } 
                <button type="submit" id="submit-btn">
                  Login
                </button>
                <p>
                  Don't have an account? <Link to="/register">Signup</Link> Here
                </p>
              </Form>
            </div>
          );
        }}
      />
      {/*  */}
    </>
  );
}

export default connect((state) => state, actionCreators)(Login);
