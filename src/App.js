import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [windowHeight, setWindowHeight] = useState();
  const [windowWidth, setWindowWidth] = useState();

  const [randomPoints, setRandomPoints] = useState({
    x1: undefined,
    y1: undefined,
    x2: undefined,
    y2: undefined,
    x3: undefined,
    y3: undefined,
    x4: undefined,
    y4: undefined,
  });

  const [mouseMovement, setMouseMovement] = useState({
    x: undefined,
    y: undefined,
  });

  const mouseCallback = (res) => {
    setMouseMovement({ x: res.pageX, y: res.pageY });
  };

  function getRandomInteger(max) {
    return Math.floor(Math.random() * max);
  }

  const Line = () => {
    return (
      <svg width="100%" height="100vh">
        <line
          x1={mouseMovement.x}
          y1={mouseMovement.y}
          x2={randomPoints.x1}
          y2={randomPoints.y1}
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1={mouseMovement.x}
          y1={mouseMovement.y}
          x2={randomPoints.x2}
          y2={randomPoints.y2}
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1={mouseMovement.x}
          y1={mouseMovement.y}
          x2={randomPoints.x3}
          y2={randomPoints.y3}
          stroke="black"
          strokeWidth="2"
        />
        <line
          x1={mouseMovement.x}
          y1={mouseMovement.y}
          x2={randomPoints.x4}
          y2={randomPoints.y4}
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    );
  };

  const timerCallback = () => {
    const randIntX1 = getRandomInteger(windowWidth);
    const randIntY1 = getRandomInteger(windowHeight);
    const randIntX2 = getRandomInteger(windowWidth);
    const randIntY2 = getRandomInteger(windowHeight);
    const randIntX3 = getRandomInteger(windowWidth);
    const randIntY3 = getRandomInteger(windowHeight);
    const randIntX4 = getRandomInteger(windowWidth);
    const randIntY4 = getRandomInteger(windowHeight);
    console.log("Timer updated");
    setRandomPoints({
      x1: randIntX1,
      y1: randIntY1,
      x2: randIntX2,
      y2: randIntY2,
      x3: randIntX3,
      y3: randIntY3,
      x4: randIntX4,
      y4: randIntY4,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseCallback);
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    const interval = setInterval(timerCallback, 1000);
    return () => {
      window.removeEventListener("mousemove", () => {});
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ position: "abolute", height: "100vh" }}>
      <Line />
    </div>
  );
}

export default App;
