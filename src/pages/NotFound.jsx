
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-4">
      <h1 className="text-9xl font-bold text-green-600 mb-6">404</h1>
      <p className="text-2xl mb-4">Oops! The page you're looking for does not exist.</p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
