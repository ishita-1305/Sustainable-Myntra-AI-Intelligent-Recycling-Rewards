import React from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Organic Cotton Tee",
    price: "₹599",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b8e9f6f1e9f8c6a3b6e",
  },
  {
    id: 2,
    name: "Recycled Denim Jeans",
    price: "₹1299",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b8e9f6f1e9f8c6a3b6e",
  },
  {
    id: 3,
    name: "Upcycled Jacket",
    price: "₹1899",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=6b8e9f6f1e9f8c6a3b6e",
  },
];

export default function Market() {
  return (
    <div className="container">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Myntra Renewed — Sustainable Picks</h2>
        <p className="small">
          Curated selection of upcycled, organic and recycled products.
        </p>
      </div>

      <div style={{ marginTop: 12 }} className="market-grid">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="product card">
            <img src={p.img} alt={p.name} />
            <h4 style={{ margin: "8px 0 4px" }}>{p.name}</h4>
            <div style={{ fontWeight: 700 }}>{p.price}</div>
            <div style={{ marginTop: 8 }}>
              <button className="btn">Buy</button>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">Built for demo — MVP sustainable program UI</div>
    </div>
  );
}
