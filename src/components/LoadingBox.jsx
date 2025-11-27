import React from "react";

const LoadingBox = () => {
  return (
    <div className="d-flex justify-content-center align-items-center my-5 py-5">
      <div
        className={"spinner-grow text-warning"}
        style={{ width: "4rem", height: "4rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingBox;
