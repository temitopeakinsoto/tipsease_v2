import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

// STATE
import { connect } from "react-redux";
import * as actionCreators from "../state/actionCreators";

// HELPERS
import { addDefaultSrc } from "../helpers/helpers";

// STYLED COMPONENTS
import { StyledCard } from '../styles';

const initialValueTip = {
  amount: 0
};

const initialValueRating = {
  stars: 0
};

const validationSchemaTip = yup.object().shape({
  amount: yup
    .number()
    .required("Amount required")
    .integer("Number needs to be an integer")
});

const validationSchemaRating = yup.object().shape({
  stars: yup
    .number()
    .required("Amount required")
    .integer("Number needs to be an integer")
});




function WorkerCard({
  currentUser,
  listServiceWorkers,
  match,
  onSubmitTip,
  history,
  tipSuccess,
  resetTipSuccess,
  onSubmitRating,
  arrayAvatars
}) {
  const selectedWorker = listServiceWorkers.find(worker => {
    return worker.id === Number(match.params.id);
  });

  const onAddTip = (values, action) => {
    action.resetForm();
    onSubmitTip(values.amount, selectedWorker.id, currentUser.username);
  };

  const onAddRating = (values, action) => {
    action.resetForm();
    onSubmitRating(values.stars, selectedWorker.id);
  };

  return (
    <StyledCard>
      <section className="header-worker-card">
        <h2>{selectedWorker.fullName}</h2>
        <div className="tip-form">
          <Formik
            validationSchema={validationSchemaTip}
            initialValues={initialValueTip}
            // onSubmit={(e) => onSubmitTip(e, selectedWorker.id, currentUser.username)}
            onSubmit={onAddTip}
            render={props => {
              return (
                <Form>
                  <div className="input-form">
                    <label htmlFor="amount">Input amount in EUR: </label>
                    <Field name="amount" type="number" id="amount" min="1" />
                  </div>
                  <div className="validation-field">
                    <ErrorMessage name="amount" component="div" />
                  </div>
                  <button type="submit">Tip</button>
                </Form>
              );
            }}
          />
        </div>
        <div className="tip-form">
          <Formik
            validationSchema={validationSchemaRating}
            initialValues={initialValueRating}
            // onSubmit={(e) => onSubmitTip(e, selectedWorker.id, currentUser.username)}
            onSubmit={onAddRating}
            render={props => {
              return (
                <Form>
                  <div className="input-form">
                    <label htmlFor="stars">Submit your rating: </label>
                    <Field
                      name="stars"
                      type="number"
                      id="stars"
                      min="1"
                      max="5"
                    />
                  </div>
                  <div className="validation-field">
                    <ErrorMessage name="stars" component="div" />
                  </div>
                  <button type="submit">Rate</button>
                </Form>
              );
            }}
          />
        </div>
      </section>
      {tipSuccess ? (
        <section className="tip-message">
          <h2>Thank you! You have tipped {selectedWorker.fullName}</h2>
        </section>
      ) : null}

      <section className="body-worker-card">
        <div className="img-container">
          <img
            src={
              !selectedWorker.photoUrl
                ? arrayAvatars[
                    Math.floor(Math.random() * Math.floor(arrayAvatars.length))
                  ]
                : selectedWorker.photoUrl
            }
            onError={e => {
              e.target.src =
                arrayAvatars[
                  Math.floor(Math.random() * Math.floor(arrayAvatars.length))
                ];
            }}
            alt="profile-pic"
          />
        </div>
        <div className="worker-details">
          <h3>Workplace: {selectedWorker.workplace}</h3>
          <h3>Rating: {selectedWorker.rating}</h3>
          <h3># of ratings: {selectedWorker.numOfRatings}</h3>
          <h3>Balance: {selectedWorker.accountBalance}</h3>
        </div>
      </section>
      <section>
        <Link to="/app/home" onClick={() => resetTipSuccess()}>
          Back
        </Link>
      </section>
    </StyledCard>
  );
}

export default connect(
  state => state,
  actionCreators
)(WorkerCard);
