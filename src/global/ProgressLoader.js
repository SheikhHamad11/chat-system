// ProgressLoader.js
import React from "react";
import "./ProgressLoader.css";

const ProgressLoader = ({ value }) => {
  return (
    <div className="position-fixed top-0 w-100 p-5 h-100 blurBackground d-flex justify-content-center align-items-center">
      <div className="progress-container">
        <progress className="progress-bar" value={value} max="100" />
        <span className="progress-value">{value}%</span>
      </div>
    </div>
    // Your React Component
    // <div className="position-fixed top-0 left-0 w-100 h-100 blurBackground">
    //   <div className="progress-container">
    //     <progress className="progress-bar" value={value} max="100" />
    //     <span className="progress-value">{value}%</span>
    //   </div>
    // </div>
  );
};

export default ProgressLoader;
