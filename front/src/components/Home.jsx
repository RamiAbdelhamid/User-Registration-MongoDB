import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <h1 className="text-5xl font-extrabold text-white text-center leading-tight mb-4">
        Welcome to the Authentication System
      </h1>
      <p className="text-xl text-white mb-8">
        Get started by signing up or logging in!
      </p>
      <div className="flex space-x-6">
        <Link
          to="/signup"
          className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}

export default Home;
