// import React, { useState } from "react";
// import { saveState, loadState } from "../utils/storage";

// export default function Recycle() {
//   const [photo, setPhoto] = useState(null);
//   const [type, setType] = useState("");
//   const [condition, setCondition] = useState("Good");
//   const [message, setMessage] = useState("");

//   const handlePhoto = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     const url = URL.createObjectURL(f);
//     setPhoto(url);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!type) {
//       setMessage("Please select item type");
//       return;
//     }
//     // Mock verification logic - basic rules
//     let verification = "Rejected";
//     if (condition === "Good") verification = "Verified";
//     else if (condition === "Fair" && (type === "tshirt" || type === "jeans"))
//       verification = "Verified";

//     const requests = loadState("pickups", []);
//     const id = Date.now().toString(36);
//     const entry = {
//       id,
//       type,
//       condition,
//       photo,
//       verification,
//       status: verification === "Verified" ? "Awaiting pickup" : "Rejected",
//       createdAt: new Date().toISOString(),
//     };
//     requests.unshift(entry);
//     saveState("pickups", requests);
//     setMessage(
//       verification === "Verified"
//         ? "Item verified ✅ You can schedule pickup from Dashboard"
//         : "Item rejected — please check condition"
//     );
//     setPhoto(null);
//     setType("");
//     setCondition("Good");
//   };

//   return (
//     <div className="container">
//       <div className="grid">
//         <div>
//           <div className="card">
//             <h2 style={{ marginTop: 0 }}>Upload item for verification</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="small">Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhoto}
//                   className="form-input"
//                 />
//               </div>
//               {photo && (
//                 <div className="item-preview">
//                   <div className="img-thumb">
//                     <img
//                       src={photo}
//                       alt="preview"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         borderRadius: 8,
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <div className="small">Preview</div>
//                     <div style={{ marginTop: 6 }} className="small">
//                       Please ensure the item is visible and clean
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="small">Category</label>
//                 <select
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   className="form-input"
//                 >
//                   <option value="">Select</option>
//                   <option value="tshirt">T-Shirt</option>
//                   <option value="jeans">Jeans</option>
//                   <option value="shoes">Shoes</option>
//                   <option value="jacket">Jacket</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="small">Condition</label>
//                 <select
//                   value={condition}
//                   onChange={(e) => setCondition(e.target.value)}
//                   className="form-input"
//                 >
//                   <option>Good</option>
//                   <option>Fair</option>
//                   <option>Poor</option>
//                 </select>
//               </div>

//               <div style={{ display: "flex", gap: 8 }}>
//                 <button className="btn" type="submit">
//                   Verify Item
//                 </button>
//                 <button
//                   type="button"
//                   className="btn secondary"
//                   onClick={() => {
//                     setPhoto(null);
//                     setType("");
//                     setCondition("Good");
//                     setMessage("");
//                   }}
//                 >
//                   Reset
//                 </button>
//               </div>

//               {message && (
//                 <div style={{ marginTop: 10 }} className="small">
//                   {message}
//                 </div>
//               )}
//             </form>
//           </div>

//           <div className="card" style={{ marginTop: 16 }}>
//             <h3 style={{ marginTop: 0 }}>Tips for verification</h3>
//             <ul className="small">
//               <li>Place the item on a clean background.</li>
//               <li>Make sure tags, logos, or defects are visible.</li>
//               <li>Take one full-view and one close-up photo (optional).</li>
//             </ul>
//           </div>
//         </div>

//         <aside>
//           <div className="card">
//             <h3 style={{ marginTop: 0 }}>Quick actions</h3>
//             <p className="small">
//               After verification, items will appear in your Dashboard where you
//               can schedule pickup.
//             </p>
//             <div style={{ marginTop: 12 }}>
//               <a href="/dashboard" className="btn">
//                 Go to Dashboard
//               </a>
//             </div>
//           </div>

//           <div className="card" style={{ marginTop: 12 }}>
//             <h4 style={{ marginTop: 0 }}>Program Rules</h4>
//             <div className="small">
//               Verified items earn points after pickup completion. Points convert
//               into discounts at thresholds.
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { saveState, loadState } from "../utils/storage";

export default function Recycle() {
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("Good");
  const [purpose, setPurpose] = useState(""); // NEW STATE
  const [message, setMessage] = useState("");

  const handlePhoto = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPhoto(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) {
      setMessage("Please select item type");
      return;
    }
    if (!purpose) {
      setMessage("Please select purpose (Recycle/Donate/Resell)");
      return;
    }

    // Mock verification logic - basic rules
    let verification = "Rejected";
    if (condition === "Good") verification = "Verified";
    else if (condition === "Fair" && (type === "tshirt" || type === "jeans"))
      verification = "Verified";

    const requests = loadState("pickups", []);
    const id = Date.now().toString(36);
    const entry = {
      id,
      type,
      condition,
      purpose, // store new field
      photo,
      verification,
      status: verification === "Verified" ? "Awaiting pickup" : "Rejected",
      createdAt: new Date().toISOString(),
    };
    requests.unshift(entry);
    saveState("pickups", requests);
    setMessage(
      verification === "Verified"
        ? "Item verified ✅ You can schedule pickup from Dashboard"
        : "Item rejected — please check condition"
    );
    setPhoto(null);
    setType("");
    setCondition("Good");
    setPurpose("");
  };

  return (
    <div className="container">
      <div className="grid">
        <div>
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Upload item for verification</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="small">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="form-input"
                />
              </div>
              {photo && (
                <div className="item-preview">
                  <div className="img-thumb">
                    <img
                      src={photo}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </div>
                  <div>
                    <div className="small">Preview</div>
                    <div style={{ marginTop: 6 }} className="small">
                      Please ensure the item is visible and clean
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="small">Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="tshirt">T-Shirt</option>
                  <option value="jeans">Jeans</option>
                  <option value="shoes">Shoes</option>
                  <option value="jacket">Jacket</option>
                </select>
              </div>

              <div>
                <label className="small">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="form-input"
                >
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </div>

              {/* NEW DROPDOWN for Purpose */}
              <div>
                <label className="small">Purpose</label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="Recycle">Recycle ♻️</option>
                  <option value="Donate">Donate ❤️</option>
                  <option value="Resell">Resell 💸</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" type="submit">
                  Verify Item
                </button>
                <button
                  type="button"
                  className="btn secondary"
                  onClick={() => {
                    setPhoto(null);
                    setType("");
                    setCondition("Good");
                    setPurpose("");
                    setMessage("");
                  }}
                >
                  Reset
                </button>
              </div>

              {message && (
                <div style={{ marginTop: 10 }} className="small">
                  {message}
                </div>
              )}
            </form>
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h3 style={{ marginTop: 0 }}>Tips for verification</h3>
            <ul className="small">
              <li>Place the item on a clean background.</li>
              <li>Make sure tags, logos, or defects are visible.</li>
              <li>Take one full-view and one close-up photo (optional).</li>
            </ul>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Quick actions</h3>
            <p className="small">
              After verification, items will appear in your Dashboard where you
              can schedule pickup.
            </p>
            <div style={{ marginTop: 12 }}>
              <a href="/dashboard" className="btn">
                Go to Dashboard
              </a>
            </div>
          </div>

          <div className="card" style={{ marginTop: 12 }}>
            <h4 style={{ marginTop: 0 }}>Program Rules</h4>
            <div className="small">
              Verified items earn points after pickup completion. Points convert
              into discounts at thresholds. The purpose you choose helps Myntra
              manage items better: <strong>Recycle</strong> for fabric recovery,
              <strong> Donate</strong> to NGOs, <strong>Resell</strong> in the
              Renewed Market.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
