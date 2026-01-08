export default function SummaryPanel({ summary }) {
  if (
    !summary.city &&
    !summary.property_type &&
    !summary.budget
  )
    return null;

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "16px",
        background: "#0f172a",
        borderRadius: "12px",
        border: "1px solid #1e293b",
        textAlign: "left",
      }}
    >
      <h3 style={{ color: "#4ade80", marginBottom: "8px" }}>
         Your Preferences(AI Extracted)
      </h3>

      {summary.city && <p>🏙 City: {summary.city}</p>}
      {summary.purpose && <p>🎯 Purpose: {summary.purpose}</p>}
      {summary.plot_type && <p>🎯 Plot Type: {summary.plot_type}</p>}
      {summary.office_type && <p>🏢 Office Type: {summary.office_type}</p>}
      {summary.bhk && <p>🏠 BHK: {summary.bhk}</p>}
      {summary.showroom_floor && (
        <p>🏢 Showroom Floor: {summary.showroom_floor}</p>
      )}
      {summary.property_type && (
        <p>🏠 Property: {summary.property_type}</p>
      )}
      {summary.budget && <p>💰 Budget: {summary.budget}</p>}
    </div>
  );
}
