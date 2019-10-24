import React from "react";
import "./App.css";
import { Route, withRouter, Redirect } from "react-router-dom";
import styled from "styled-components";

// STATE MANAGEMENT

import * as reducers from "./state/reducers";
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// COMPONENTS

import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Container from "./components/Container";
import WorkerCard from "./components/WorkerCard";
import EditProfile from "./components/EditProfile";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import Marketing from "./components/Marketing";


const masterReducer = combineReducers({
  count: reducers.countReducer,
  currentUser: reducers.currentUserReducer,
  listServiceWorkers: reducers.listServiceWorkersReducer,
  tipSuccess: reducers.tipSuccessReducer,
  loginError: reducers.loginErrorReducer,
  error: reducers.errorReducer,
  sorted: reducers.sortReducer,
  ownTipHistory: reducers.ownTipHistoryReducer,
  arrayAvatars: reducers.arrayAvatarsReducer
});

const store = createStore(
  masterReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const StyledApp = styled.div`
  display: flex;
  flex-direction: row;
  .navbar {
    width: 25vw;
  }
  .content {
    width: 75vw;
  }
`;

function App(props) {
  return (
    <div className="App">
      <Provider store={store}>
        <StyledApp>
          <section className="navbar">
            <PrivateRoute path="/app" component={NavBar} />
          </section>
          <section className="content">
            <PrivateRoute exact path="/app/home" component={Container} />
            <PrivateRoute path="/app/profile/edit" component={EditProfile} />
            <PrivateRoute exact path="/app/profile" component={Profile} />
            <PrivateRoute
              path="/app/service-worker/:id"
              component={WorkerCard}
            />
          </section>
        </StyledApp>
        <LoginRedirectRoute path="/login" component={Login} />
        <Route path="/register" component={Registration} />
        <Route exact path="/" component={Marketing} />
      </Provider>
    </div>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("authorization") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const LoginRedirectRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("authorization") ? (
        <Redirect to="/app/home" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default withRouter(App);
