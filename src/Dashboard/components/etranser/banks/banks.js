import React from "react";
import { banks } from "./data";
import "./banks.css"; // optional CSS file

export default function BankGrid() {
  return (
    <div className="bank-grid-container">
      {banks.map((banks) => (
        <div
          key={banks.name}
          className="bank-card"
          onClick={() => window.open(banks.loginUrl, "_blank")}
        >
          <img src={banks.logo} alt={banks.name} className="bank-logo" />
          {/* <span className="bank-name">{banks.name}</span> */}
        </div>
      ))}
    </div>
  );
}
