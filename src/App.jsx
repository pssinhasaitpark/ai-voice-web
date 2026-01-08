// import { useState } from "react";
// import AIWidget from "./components/AIWidget";

// function SummaryPanel({ data }) {
//   if (!data.city && !data.property_type && !data.budget) return null;

//   return (
//     <div
//       style={{
//         marginTop: "24px",
//         padding: "16px",
//         background: "#0f172a",
//         borderRadius: "12px",
//         border: "1px solid #1e293b",
//         textAlign: "left"
//       }}
//     >
//       <h3 style={{ color: "#4ade80", marginBottom: "8px" }}>
//         🤖 AI Insights (🏠 Property Preferences)
//       </h3>

//       {data.city && <p>🏙 City: {data.city}</p>}
//       {data.purpose && <p>🎯 Purpose: {data.purpose}</p>}
//       {data.plot_type && <p>🎯 Plot Type: {data.plot_type}</p>}
//       {data.office_type && <p>🏢 Office Type: {data.office_type}</p>}
//       {data.bhk && <p>🏠 BHK: {data.bhk}</p>}
//       {data.showroom_floor && <p>🏢 Showroom Floor: {data.showroom_floor}</p>}
//       {data.property_type && <p>🏠 Property: {data.property_type}</p>}
//       {data.budget && <p>💰 Budget: {data.budget}</p>}
//     </div>
//   );
// }

// export default function App() {
//   const [extracted, setExtracted] = useState({});

//   return (
//     <>
//       {/* CENTER PAGE UI */}
//       <div
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           textAlign: "center",
//           color: "#fff",
//           maxWidth: "600px",
//           width: "90%"
//         }}
//       >
//         <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
//           Estate AI Agent
//         </h1>

//         <p style={{ fontSize: "18px", color: "#b5b5b5" }}>
//           Find the best properties using AI
//         </p>

//         <SummaryPanel data={extracted} />
//       </div>

//       {/* CHAT WIDGET */}
//       <AIWidget onExtractUpdate={setExtracted} />
//     </>
//   );
// }


import { useState } from "react";
import AIWidget from "./components/AIWidget";
import SummaryPanel from "./components/SummaryPanel";

export default function App() {
  const [extracted, setExtracted] = useState({});

  return (
    <>
      {/* CENTER PAGE UI */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#fff",
          maxWidth: "600px",
          width: "90%",
        }}
      >
        <h1 style={{ fontSize: "42px", marginBottom: "12px" }}>
          Estate AI Agent
        </h1>

        <p style={{ fontSize: "18px", color: "#b5b5b5" }}>
          Find the best properties using AI
        </p>

        {/* ✅ Summary from component */}
        <SummaryPanel summary={extracted} />
      </div>

      {/* CHAT WIDGET */}
      <AIWidget onExtractUpdate={setExtracted} />
    </>
  );
}
