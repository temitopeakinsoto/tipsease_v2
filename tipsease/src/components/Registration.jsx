import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import * as yup from "yup";

// COMPONENTS

import Title from "./Title";

// STATE

import * as actionCreators from "../state/actionCreators";
import { connect } from "react-redux";

const initialValuesLogin = {
  username: "",
  password: "",
  fullName: "",
  photoUrl: "",
};

const validationSchema = yup.object().shape({
  fullName: yup.string().required().min(5, "Too short"),
  username: yup.string().required().min(5, "Too short").max(15, "Too long"),
  password: yup.string().required().min(3, "Too short"),
  photoUrl: yup.string().required().min(5, "Too short"),
});

const userRegEndpoint =
  "https://build-tipsease.herokuapp.com/auth/users/register";

function Registration({ history, setTaskSucceded, tipSuccess, clearError }) {
  useEffect(() => {
    clearError();
  }, []);

  const onRegFormSubmission = (values, actions) => {
    axios
      .post(userRegEndpoint, values)
      .then((res) => {
        setTaskSucceded();
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    actions.resetForm();
  };
  return (
    <>
      {/* <Title className="title" /> */}
      {/* {tipSuccess ? (
        <section className="tip-message">
          <h2>
            Thank you! You have succesfully registered. You can now{" "}
            <Link to="/login">Log In</Link>
          </h2>
        </section>
      ) : null} */}

      <Formik
        validationSchema={validationSchema}
        initialValues={initialValuesLogin}
        onSubmit={onRegFormSubmission}
        render={(props) => {
          return (
            <div className="login-container">
              <form className="login-form">
                <img src="" alt="" />
                <h2 style={{color: "rgb(81, 147, 247)"}}>REGISTER</h2>
                <div className="input-box">
                  <label className="label" htmlFor="fullName">
                    Full Name:
                  </label>
                  <Field name="fullName" type="text" id="fullName" />
                  <ErrorMessage style={{color: "red"}} name="fullName" component="div" />
                </div>

                <div className="input-box">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <Field name="password" type="password" id="password" />
                  <ErrorMessage style={{color: "red"}} name="password" component="div" />
                </div>
                <div className="input-box">
                  <label className="label" htmlFor="username">
                    Username
                  </label>

                  <Field name="username" type="text" id="username" />
                  <ErrorMessage style={{color: "red"}} name="username" component="div" />
                </div>
                <div className="input-box">
                  <label className="label" htmlFor="photoUrl">
                    Photo URL
                  </label>

                  <Field name="photoUrl" type="text" id="photoUrl" />
                  <ErrorMessage style={{color: "red"}} name="photoUrl" component="div" />
                </div>
                <button type="submit" id="submit-btn">
                  register
                </button>
                <p>
                  If you are already registered, you can Login{" "}
                  <Link to="/login">Here</Link>
                </p>
              </form>
            </div>
          );
        }}
      />
    </>
  );
}

export default connect((state) => state, actionCreators)(Registration);
