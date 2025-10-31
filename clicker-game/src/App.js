import React, { useEffect, useState } from "react";

function App() {
  const [points, setPoints] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const [clickCost, setClickCost] = useState(10);
  const [clickSecondCost, setClickSecondCost] = useState(50);
  const [LCCost, setLCCost] = useState(500);
  const [lessCost, setLessCost] = useState(0);
  const [upgrades, setUpgrades] = useState(0);
  const [cps, setCps] = useState(0);
  const [lessCostBought, setLessCostBought] = useState(false);

  // 🕓 Auto click cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((p) => p + clicksPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [clicksPerSecond]);

  // 🔘 Click principal
  const handleClick = () => {
    setPoints(points + clickValue);
  };

  // 🪓 Mejorar Pico
  const upgradeClick = () => {
    if (points >= clickCost) {
      setPoints(points - clickCost);
      setClickValue(clickValue + 1);
      setClickCost(Math.floor(clickCost * 2.5));
      setUpgrades(upgrades + 1);
    } else {
      alert("No tienes suficientes puntos para comprar una mejora!");
    }
  };

  // ⚙️ Comprar Click por Segundo
  const upgradeCPS = () => {
    if (points >= clickSecondCost) {
      setPoints(points - clickSecondCost);
      setClicksPerSecond(clicksPerSecond + 1);
      setClickSecondCost(Math.floor(clickSecondCost * 2.5));
      setCps(cps + 1);
    } else {
      alert("No tienes suficientes puntos para comprar una mejora!");
    }
  };

  // 💸 Reducir Costos
  const reduceCosts = () => {
    if (points >= LCCost) {
      setPoints(points - LCCost);
      const lessPoints = lessCost + 50;
      setLCCost(Math.floor(LCCost * 1.5));
      setClickCost((c) => Math.max(1, c - lessPoints));
      setClickSecondCost((c) => Math.max(1, c - lessPoints));
      setLessCostBought(true);
    }
  };

  // 🔄 Botón aleatorio
  useEffect(() => {
    const createMovingButton = () => {
      const btn = document.createElement("button");
      const isTrap = Math.random() * 5 > 4;
      btn.textContent = isTrap ? "No me hagas Click!" : "Clickeame!";
      btn.className = "btn btn-warning moving-button";
      if (isTrap) {
        btn.style.backgroundColor = "red";
        btn.style.borderColor = "darkred";
      }

      btn.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
      btn.style.top = `${Math.random() * (window.innerHeight - 50)}px`;

      btn.onclick = () => {
        if (isTrap) {
          setPoints((p) => Math.floor(p / 2));
          alert("Caiste. Perdiste la mitad de tus puntos.");
        } else {
          setPoints((p) => p + 5);
        }
        btn.remove();
      };

      document.body.appendChild(btn);
      setTimeout(() => {
        if (document.body.contains(btn)) {
          if (!isTrap) setPoints((p) => Math.max(0, p - Math.floor(p / 3.5)));
          btn.remove();
        }
      }, 3000);
    };

    const interval = setInterval(createMovingButton, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1>Clicker Game</h1>

      <figure>
        <img
          id="clickButton"
          src="/img/piedra.png"
          alt="piedra"
          onClick={handleClick}
        />
      </figure>

      <h2 className="mt-3">Diamantes: {points}</h2>

      <div className="mt-4">
        <h3>Mejoras</h3>
        <button onClick={upgradeClick} className="btn btn-success">
          Mejorar Pico (Cost: {clickCost})
        </button>

        <h4 className="mt-4">Puntos por click: {clickValue}</h4>

        <button onClick={upgradeCPS} className="btn btn-warning">
          Comprar puntos por segundo (Cost: {clickSecondCost})
        </button>

        <h4 className="mt-3">Puntos por segundo: {clicksPerSecond}</h4>

        <button onClick={reduceCosts} className="btn btn-success">
          Reducir costos de mejoras (Cost: {LCCost})
        </button>
      </div>
    </div>
  );
}

export default App;
