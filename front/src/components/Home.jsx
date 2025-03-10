import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome to the Authentication System
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Get started by signing up or logging in!
      </p>
      <div className="mt-6">
        <Link
          to="/signup"
          className="text-lg font-medium text-blue-600 hover:text-blue-800 mr-4"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="text-lg font-medium text-blue-600 hover:text-blue-800"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Home;
