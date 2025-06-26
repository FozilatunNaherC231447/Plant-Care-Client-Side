import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import plantAnimation from "../assets/plant-notfound.json"; 

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-4">
      <Lottie
        animationData={plantAnimation}
        loop={true}
        className="h-64 w-64"
      />
      <h1 className="text-4xl font-bold text-green-600 mt-4">Page Not Found</h1>
      <p className="text-lg mt-2 text-gray-600 text-center">
        Seems like this plant hasn’t sprouted here yet! 🌱
      </p>
      <Link
        to="/"
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition mt-4"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
