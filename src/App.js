import "./App.css";
import { useState, useEffect, useRef } from "react";
import Line from "./Line";

function App() {
  // using useRef to persist values between renders
  const windowHeight = useRef(window.innerHeight);
  const windowWidth = useRef(window.innerWidth);

  const [randomPoints, setRandomPoints] = useState([]);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });

  // Generates a random integer up to the provided maximum value.
  function getRandomInteger(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Generates new random points within the window dimensions
   * and updates the state with these points.
   */
  const generateRandomPoints = () => {
    const points = [];
    for (let i = 0; i < 4; i++) {
      // get random offsets within the window dimensions
      const xOffset = getRandomInteger(windowWidth.current);
      const yOffset = getRandomInteger(windowHeight.current);
      points.push({ xOffset, yOffset });
    }
    setRandomPoints(points);
  };

  // Updates the cursor position state based on mouse movement.
  const handleMouseMove = (event) => {
    setCursorOffset({ x: event.pageX, y: event.pageY });
  };

  useEffect(() => {
    // Set up event listener for mouse movement
    window.addEventListener("mousemove", handleMouseMove);

    // Start interval for generating random points every 2 seconds
    const interval = setInterval(generateRandomPoints, 2000);

    return () => {
      // Clean up event listener and interval on component unmount
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {cursorOffset.x && (
        <svg width="100%" height="100vh">
          {randomPoints.map((point, index) => (
            <Line
              key={index} // Add a key for each line
              x1={cursorOffset?.x}
              y1={cursorOffset?.y}
              x2={point.xOffset}
              y2={point.yOffset}
            />
          ))}
        </svg>
      )}
    </div>
  );
}

export default App;
