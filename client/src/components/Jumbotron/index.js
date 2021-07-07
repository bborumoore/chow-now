import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 80, clear: "both", paddingTop: 20, paddingBottom: 20, textAlign: "center", color: "#2f2f2" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
