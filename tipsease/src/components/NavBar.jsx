import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { StyledNavBar } from '../StyledComponents';

// COMPONENTS

import Title from "./Title";

// STATE
import { connect } from "react-redux";
import * as actionCreators from "../state/actionCreators";

function NavBar({ history, clearCurrentUser, currentUser }) {
  // LOGOUT FUNCTIONALITY
  const logout = (e) => {
    localStorage.clear();
    clearCurrentUser();
    history.replace("/login");
  };

  return (
    <StyledNavBar>
      <Title />
      <section>
        <NavLink to="/app/home">
          <h2>Home</h2>
        </NavLink>

        <NavLink to="/app/profile">
          <h2>Profile</h2>
        </NavLink>
        <h2 onClick={logout} className="action-button-big">
          Log out
        </h2>
      </section>
      <section>
        <div>
          <p>Need help?</p>
          <p>hello@tipsease.com</p>
        </div>
      </section>
    </StyledNavBar>
  );
}

export default withRouter(connect((state) => state, actionCreators)(NavBar));
