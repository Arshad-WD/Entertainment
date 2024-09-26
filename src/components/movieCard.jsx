// src/components/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import tempImg from "../assets/temperory.jpeg";

const MovieCard = ({ id, title, imageUrl, rating }) => {
  return (
    <Link to={`/movie/${id}`} className="no-underline">
      <div
        className="bg-gray-900 p-4 m-4 rounded-lg shadow-lg"
        style={{ width: "200px", height: "320px" }}
      >
        <div className="relative w-full" style={{ height: "60%" }}>
          <img
            src={imageUrl || tempImg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
            style={{ borderRadius: "8px" }}
          />
        </div>
        <div
          className="mt-4 flex flex-col justify-between"
          style={{ height: "35%" }}
        >
          <h3
            className="text-white text-md font-semibold truncate"
            style={{ height: "40px", overflow: "hidden" }}
          >
            {title}
          </h3>
          <p
            className="text-gray-400 mt-1"
            style={{ height: "40px", overflow: "hidden" }}
          >
            Description goes here
          </p>
          <div className="flex justify-between items-center mt-2">
            <span
              className="text-green-400 font-bold"
              style={{ fontSize: "14px" }}
            >
              {rating}
            </span>
            <button
              onClick={null}
              className="p-2 rounded-full flex justify-center items-center bg-gray-600 hover:bg-gray-700"
              style={{ width: "32px", height: "32px" }}
            >
              <FaStar color="white " />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
