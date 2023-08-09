import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components"; // You can use a CSS-in-JS library for styling

const ErrorPageWrapper = styled.div`
  /* Add your CSS styles here */
`;

const ErrorPage = () => {
  return (
    <ErrorPageWrapper>
      <div className="page_not_found">
        <h1 className="error">
          4<span>0</span>4
        </h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
        <NavLink to="/">
          <h3 className="btn">
            <i className="bx bx-arrow-back bx-tada bx-flip-horizontal"></i> Go
            Back
          </h3>
        </NavLink>
      </div>
    </ErrorPageWrapper>
  );
};

export default ErrorPage;
