import React, { useState, useEffect } from "react";

function ColorGame() {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F1C40F",
    "#8E44AD",
    "#1ABC9C",
  ];

  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [shuffledColors, setShuffledColors] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    newGame();
  }, []);

  const shuffleColors = (array) => {
    return [...array].sort(() => Math.random() - 0.5); // Ensures a new array is created
  };

  const newGame = () => {
    if (score > highScore) {
      setHighScore(score);
    }

    setTimeout(() => {
      setGameStatus(""); // Clears game status after 1 second
    }, 1000);

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
    setShuffledColors(shuffleColors(colors)); // Shuffles correctly
  };

  const checkGuess = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setGameStatus("🎉 Correct! Well done.");
      setTimeout(newGame, 1000); // Automatically starts a new round after 1 second
    } else {
      setGameStatus("❌ Wrong! Try again.");
      setHighScore((prevHigh) => Math.max(prevHigh, score)); // Retain the highest score
      setScore(0); // Reset score to 0 after failure
    }
  };

  if (showInstructions) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#282c34",
          color: "white",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1 data-testid="gameInstructions" style={{ fontSize: "2rem" }}>
          🎨 Welcome to the Color Guessing Game!
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
          Guess the correct color by clicking on the right option.
        </p>
        <button
          onClick={() => setShowInstructions(false)}
          style={{
            padding: "12px 20px",
            fontSize: "1.2rem",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Okay, Let's Play!
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#282c34",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        🎨 Color Guessing Game
      </h1>
      <p
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#f1c40f",
        }}
      >
        🏆 High Score: {highScore}
      </p>
      <div
        data-testid="colorBox"
        style={{
          backgroundColor: targetColor,
          height: "150px",
          width: "150px",
          border: "4px solid #fff",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        {shuffledColors.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            style={{
              backgroundColor: color,
              height: "60px",
              width: "60px",
              border: "3px solid #fff",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onClick={() => checkGuess(color)}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          />
        ))}
      </div>
      <p
        data-testid="gameStatus"
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          margin: "10px 0",
          color: gameStatus.includes("Correct") ? "#2ecc71" : "#e74c3c",
        }}
      >
        {gameStatus}
      </p>
      <p data-testid="score" style={{ fontSize: "1.3rem" }}>
        Score: {score}
      </p>
      <button
        data-testid="newGameButton"
        onClick={newGame}
        style={{
          padding: "12px 20px",
          marginTop: "15px",
          border: "none",
          backgroundColor: "#3498db",
          color: "#fff",
          fontSize: "1.1rem",
          fontWeight: "bold",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
      >
        🔄 New Game
      </button>
    </div>
  );
}

export default ColorGame;
