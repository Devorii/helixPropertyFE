import React, { useState } from "react";

export default function EmbeddedDashboard() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openStripeDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_HELIX_API}/stripe/view-account`,
        {
          method: "POST",
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch Stripe dashboard link: ${response.status}`);
      }

      const data = await response.json();

      if (!data.account_url) {
        throw new Error("Stripe account URL not returned from backend");
      }

      console.log(data)
    } catch (err) {
      console.error("Error opening Stripe dashboard:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Stripe Account Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={openStripeDashboard}
        disabled={loading}
        style={{
          padding: "12px 24px",
          fontSize: "1rem",
          backgroundColor: "#6772e5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Opening Dashboard..." : "Open Stripe Dashboard"}
      </button>
    </div>
  );
}
