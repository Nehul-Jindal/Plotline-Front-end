import React from "react";
import "../index.css";
import logoPNG from "../img/logo.png";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src={logoPNG} />
        <p>Data</p>
      </div>
    </div>
  );
}
export default Header;
