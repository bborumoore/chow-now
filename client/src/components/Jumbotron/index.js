import React from "react";
import "./style.css";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 80, clear: "both" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
