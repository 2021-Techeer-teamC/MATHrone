import * as React from "react";
import { Link } from "react-router-dom";
import "../Assets/styles/components.css";

function Logo() {
  return (
    <div className="headerTitle">
      <Link to="/" style={{ textDecoration: "none", color: "#151515" }}>
        MATHRONE
        <span style={{ color: "#315C72", fontSize: "40px" }}>
          <strong>.</strong>
        </span>
      </Link>
    </div>
  );
}

export default Logo;
