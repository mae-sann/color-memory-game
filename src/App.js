import React, { useState } from "react";
import ColorCard from "./ColorCard";

function shuffleColors(colors) {
  return [...colors].sort(() => Math.random() - 0.5).slice(0, 9);
}

function App() {
  // vibrant colors
  const colors = [
    "crimson",
    "darkorange",
    "gold",
    "limegreen",
    "deepskyblue",
    "mediumslateblue",
    "violet",
    "deeppink",
    "aqua",
  ];

  // generate random sequence
  const [sequence, setSequence] = useState(() => shuffleColors(colors));

  // 3x3 grid with shuffled positions
  const [cards, setCards] = useState(
    shuffleColors(colors).map((color, index) => ({
      id: index,
      color,
      isFlipped: false,
    }))
  );

  const [currentIdx, setCurrentIdx] = useState(0);

  const handleCardClick = (id) => {
    const clickedCard = cards.find((c) => c.id === id);
    if (!clickedCard || clickedCard.isFlipped) return;

    if (clickedCard.color === sequence[currentIdx]) {
      // ✅ correct card → flip permanently
      const newCards = cards.map((c) =>
        c.id === id ? { ...c, isFlipped: true } : c
      );
      setCards(newCards);

      if (currentIdx === sequence.length - 1) {
        setTimeout(() => {
          alert("🎉 Congratulations! You completed the sequence!");
          window.location.reload(); // restart game
        }, 300);
      } else {
        setCurrentIdx(currentIdx + 1);
      }
    } else {
      // ❌ wrong card → show blue briefly then reset all
      const tempCards = cards.map((c) =>
        c.id === id ? { ...c, tempColor: "blue" } : c
      );
      setCards(tempCards);

      setTimeout(() => {
        setCards(
          cards.map((c) => ({
            ...c,
            isFlipped: false,
            tempColor: null,
          }))
        );
        setCurrentIdx(0);
      }, 800);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        padding: "20px",
      }}
    >
      {/* sequence panel */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
          gap: "2px",
        }}
      >
        {sequence.map((c, idx) => (
          <div
            key={idx}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: c,
              borderRadius: "1px",
            }}
          ></div>
        ))}
      </div>

      {/* grid of cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <ColorCard
            key={card.id}
            color={card.color}
            isFlipped={card.isFlipped}
            tempColor={card.tempColor}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
