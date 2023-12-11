import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ErrorPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <img
            src="https://www.example.com/error-image.png" // Replace with your own image URL
            alt="Error"
            className="img-fluid"
          />
          <h1 className="display-4 mt-3">404 Not Found</h1>
          <p className="lead">The page you are looking for was not Found</p>
        </div>
      </div>
    </div>
  );
};


