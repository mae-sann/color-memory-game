import React from "react";

function ColorCard({ color, isFlipped, tempColor, onClick }) {
  // default teal → wrong click = blue → correct = reveal real color
  const displayColor = tempColor
    ? tempColor
    : isFlipped
    ? color
    : "teal";

  return (
    <div
      onClick={onClick}
      style={{
        width: "110px",
        height: "100px",
        backgroundColor: displayColor,
        borderRadius: "2px",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    ></div>
  );
}

export default ColorCard;
