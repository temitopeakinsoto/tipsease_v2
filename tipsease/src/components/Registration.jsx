import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";
import * as yup from "yup";

import lock from "../images/lock.png";
import user from "../images/user.png";
import photourl from "../images/photourl.png";
import fullname from "../images/fullname.png";

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
                <h2 style={{ color: "rgb(81, 147, 247)" }}>REGISTER</h2>
                <div className="input-box">
                  <img src={fullname} alt="" />
                  <Field
                    name="fullName"
                    type="text"
                    id="fullName"
                    placeHolder="Enter your full name"
                  />
                </div>
                  <ErrorMessage
                    style={{ color: "red" }}
                    name="fullName"
                    component="div"
                  />

                <div className="input-box">
                  <img style={{width: "14px"}} src={lock} alt="" />
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeHolder="Enter your password"
                  />
                </div>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="password"
                  component="div"
                />
                <div className="input-box">
                  <img src={user} alt="" />
                  <Field
                    name="username"
                    type="text"
                    id="username"
                    placeHolder="Enter your username"
                  />
                </div>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="username"
                  component="div"
                />
                <div className="input-box">
                  <img src={photourl} alt="" />
                  <Field
                    name="photoUrl"
                    type="text"
                    id="photoUrl"
                    placeHolder="Enter photo url"
                  />
                </div>
                <ErrorMessage
                  style={{ color: "red" }}
                  name="photoUrl"
                  component="div"
                />
                <button type="submit" id="submit-btn">
                  Register
                </button>
                <p>
                  If you are already registered, you can{" "}
                  <Link to="/login">Login </Link>{" "}
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
