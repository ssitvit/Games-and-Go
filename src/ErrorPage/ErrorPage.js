import React from "react";
import "./ErrorPage.css";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div className="pg_not_found">
        <h1 className="error">
          4
          <span>
            0
          </span>
          4
        </h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
        <NavLink to="/">
          <h3 class="btn">
            <i class="bx bx-arrow-back bx-tada bx-flip-horizontal"></i> Go Back
          </h3>
        </NavLink>
      </div>

    </>
  );
};
export default ErrorPage;
