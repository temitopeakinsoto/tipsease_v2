import React from "react";
import { Link } from "react-router-dom";

// STATE

import { connect } from "react-redux";

function Profile({ currentUser }) {
  return (
    <div>
      <div>
        <ul>
          <div>
            <img src={currentUser.photoUrl} alt="current-user-profile-pic" />
          </div>
          <li>{currentUser.fullName}</li>
          <li>{currentUser.username}</li>
        </ul>
      </div>
      <Link to="/app/home">back</Link>
      <Link to="/app/profile/edit">Edit profile</Link>
    </div>
  );
}

export default connect(state => state)(Profile);
