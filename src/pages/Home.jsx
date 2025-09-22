import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div
        className="card"
        style={{ display: "flex", gap: 20, alignItems: "center" }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>
            Make fashion circular with Myntra ♻️
          </h1>
          <p className="small">
            Upload your old clothes, schedule a free pickup and earn
            sustainability points redeemable as discounts.
          </p>
          <div style={{ marginTop: 14 }}>
            <Link to="/recycle" className="btn">
              Start Recycling
            </Link>
            <Link
              to="/market"
              className="btn secondary"
              style={{ marginLeft: 12 }}
            >
              Shop Renewed
            </Link>
          </div>
        </div>
        <div style={{ width: 280 }}>
          <img
            src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4a7c3f8e3f0f9d4f6fb0d5a9b8b6b5a0"
            alt="sustainable"
            style={{ width: "100%", borderRadius: 12 }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 18,
        }}
      >
        <div className="card">
          <h3 style={{ marginTop: 0 }}>How it works</h3>
          <ol className="small">
            <li>Upload photos & describe the item.</li>
            <li>System verifies the item (mock AI in MVP).</li>
            <li>Schedule pickup — our partner collects it.</li>
            <li>Earn points → Redeem discounts.</li>
          </ol>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Why recycle?</h3>
          <p className="small">
            Textile waste is one of the fastest growing waste streams. Recycling
            reduces environmental footprint, saves water and supports circular
            fashion.
          </p>
          <div style={{ marginTop: 12 }}>
            <span className="badge">Save water</span>{" "}
            <span style={{ marginLeft: 8 }} className="badge">
              Reduce waste
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
