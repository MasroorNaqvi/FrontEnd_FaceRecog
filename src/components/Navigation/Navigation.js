import React from "react";
import "./Navigation.css";

const Navigaton = ({ routeChange, reset }) => {
  return (
    <nav>
      <p
        onClick={() => {
          routeChange("SignIn");
          reset();
        }}
        className="f3 link dim black pa3 pointer"
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigaton;
