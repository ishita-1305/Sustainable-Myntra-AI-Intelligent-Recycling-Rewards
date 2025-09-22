import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const loc = useLocation();
  return (
    <header className="nav container">
      <Link
        to="/"
        className="logo"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <span className="mark" />
        <div>
          Myntra{" "}
          <span style={{ fontWeight: 400, color: "#374151", fontSize: 13 }}>
            Sustainable
          </span>
        </div>
      </Link>
      <nav className="nav-links">
        <Link
          to="/"
          className="small"
          style={{ color: loc.pathname === "/" ? "var(--myntra-purple)" : "" }}
        >
          Home
        </Link>
        <Link
          to="/recycle"
          className="small"
          style={{
            color: loc.pathname === "/recycle" ? "var(--myntra-purple)" : "",
          }}
        >
          Recycle
        </Link>
        <Link
          to="/dashboard"
          className="small"
          style={{
            color: loc.pathname === "/dashboard" ? "var(--myntra-purple)" : "",
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/market"
          className="small"
          style={{
            color: loc.pathname === "/market" ? "var(--myntra-purple)" : "",
          }}
        >
          Market
        </Link>
        <Link to="/recycle" style={{ marginLeft: 12 }}>
          <button className="btn">Get Involved</button>
        </Link>
      </nav>
    </header>
  );
}
