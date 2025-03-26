import React from "react";
import "/src/pages/components/styles/authBackground.css";

const AuthBackground = ({ children }) => {
  return (
    <div className="background-container">
      {children}
    </div>
  );
};

export default AuthBackground;
