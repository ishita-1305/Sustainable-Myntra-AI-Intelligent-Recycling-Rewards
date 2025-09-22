import React, { useEffect, useState } from "react";
import { loadState, saveState } from "../utils/storage";

export default function Dashboard() {
  const [pickups, setPickups] = useState([]);
  const [points, setPoints] = useState(0);
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    const data = loadState("pickups", []);
    setPickups(data);
    // compute points: completed pickups * 10
    const completed = data.filter((d) => d.status === "Collected").length;
    setPoints(completed * 10);
    const coupons = loadState("coupons", []);
    setCoupon(coupons[0] || null);
  }, []);

  const schedule = (id) => {
    const data = loadState("pickups", []);
    const updated = data.map((d) =>
      d.id === id ? { ...d, status: "Pickup scheduled" } : d
    );
    saveState("pickups", updated);
    setPickups(updated);
    alert("Pickup scheduled — a partner will collect soon (mock).");
  };

  const mockCollect = (id) => {
    // Simulate collector action
    const data = loadState("pickups", []);
    const updated = data.map((d) =>
      d.id === id ? { ...d, status: "Collected" } : d
    );
    saveState("pickups", updated);
    setPickups(updated);
    const completed = updated.filter((d) => d.status === "Collected").length;
    setPoints(completed * 10);
    // auto-create coupon if points >=50
    if (completed * 10 >= 50) {
      const coupons = loadState("coupons", []);
      if (coupons.length === 0) {
        const newC = {
          code: "MYNTRA-GREEN-10",
          discount: 10,
          createdAt: new Date().toISOString(),
        };
        saveState("coupons", [newC]);
        setCoupon(newC);
        alert("Congrats — you earned a 10% discount coupon!");
      }
    }
  };

  return (
    <div className="container">
      <div className="grid">
        <div>
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Your Recycling Requests</h2>
            {pickups.length === 0 ? (
              <div className="small">You haven't submitted any items yet.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Condition</th>
                    <th>Verification</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pickups.map((r) => (
                    <tr key={r.id}>
                      <td
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 52,
                            height: 52,
                            background: "#f8fafc",
                            borderRadius: 8,
                            overflow: "hidden",
                          }}
                        >
                          {r.photo ? (
                            <img
                              src={r.photo}
                              alt="thumb"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div style={{ padding: 12 }}>No Photo</div>
                          )}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{r.type}</div>
                          <div className="small">
                            {new Date(r.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </td>
                      <td>{r.condition}</td>
                      <td>{r.verification}</td>
                      <td>{r.status}</td>
                      <td>
                        {r.verification === "Verified" &&
                          r.status === "Awaiting pickup" && (
                            <button
                              className="btn"
                              onClick={() => schedule(r.id)}
                            >
                              Schedule Pickup
                            </button>
                          )}
                        {r.status === "Pickup scheduled" && (
                          <button
                            className="btn secondary"
                            onClick={() => mockCollect(r.id)}
                          >
                            Mark Collected
                          </button>
                        )}
                        {r.status === "Collected" && (
                          <span className="small">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h3 style={{ marginTop: 0 }}>Rewards & Redemption</h3>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div>
                <div className="small">Points</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{points}</div>
              </div>
              <div>
                <div className="small">Badge</div>
                <div className="badge" style={{ marginTop: 6 }}>
                  {points >= 100
                    ? "Sustainability Hero"
                    : points >= 50
                    ? "Green Shopper"
                    : "Eco Starter"}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12 }} className="small">
              Redeem 50 points → 10% discount.
            </div>
            {coupon ? (
              <div style={{ marginTop: 10 }}>
                <div className="small">Your coupon:</div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      background: "#eef2ff",
                      padding: 8,
                      borderRadius: 8,
                      fontWeight: 700,
                    }}
                  >
                    {coupon.code}
                  </div>
                  <div className="small">{coupon.discount}% off</div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 10 }} className="small">
                No coupons yet — keep recycling!
              </div>
            )}
          </div>
        </div>

        <aside>
          <div className="card">
            <h4 style={{ marginTop: 0 }}>Quick Stats</h4>
            <div className="small">Total Items Submitted: {pickups.length}</div>
            <div style={{ marginTop: 8 }} className="small">
              Collected:{" "}
              {pickups.filter((p) => p.status === "Collected").length}
            </div>
            <div style={{ marginTop: 8 }} className="small">
              Awaiting pickup:{" "}
              {
                pickups.filter(
                  (p) =>
                    p.status === "Awaiting pickup" ||
                    p.status === "Pickup scheduled"
                ).length
              }
            </div>
          </div>

          <div className="card" style={{ marginTop: 12 }}>
            <h4 style={{ marginTop: 0 }}>Next Steps</h4>
            <ol className="small">
              <li>Schedule pickup for verified items.</li>
              <li>Wait for collection (mock action available here).</li>
              <li>Points update after collection.</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
