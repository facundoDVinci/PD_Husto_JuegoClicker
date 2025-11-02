import React, { useEffect, useState } from "react";
import AchievementsModal from "./AchievementsModal";

function ClickerGame() {

  const [points, setPoints] = useState(() => Number(localStorage.getItem("points")) || 0);
  const [clickValue, setClickValue] = useState(() => Number(localStorage.getItem("clickValue")) || 1);
  const [clicksPerSecond, setClicksPerSecond] = useState(() => Number(localStorage.getItem("clicksPerSecond")) || 0);
  const [clickCost, setClickCost] = useState(() => Number(localStorage.getItem("clickCost")) || 10);
  const [clickSecondCost, setClickSecondCost] = useState(() => Number(localStorage.getItem("clickSecondCost")) || 50);
  const [LCCost, setLCCost] = useState(() => Number(localStorage.getItem("LCCost")) || 500);
  const [lessCostBought, setLessCostBought] = useState(() => JSON.parse(localStorage.getItem("lessCostBought")) || false);


  const [damage, setDamage] = useState(() => Number(localStorage.getItem("damage")) || 1);
  const [attackCost, setAttackCost] = useState(() => Number(localStorage.getItem("attackCost")) || 15);


  const defaultEnemy = { name: "Slime", hp: 20, maxHp: 20, reward: 10, img: "/img/slime.png" };
  const [enemy, setEnemy] = useState(() => {
    const saved = localStorage.getItem("enemy");
    return saved ? JSON.parse(saved) : defaultEnemy;
  });
  const [enemyHP, setEnemyHP] = useState(() => {
    const savedHP = localStorage.getItem("enemyHP");
    return savedHP ? Number(savedHP) : defaultEnemy.hp;
  });

 
  const [achievements, setAchievements] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    localStorage.setItem("points", points);
    localStorage.setItem("clickValue", clickValue);
    localStorage.setItem("clicksPerSecond", clicksPerSecond);
    localStorage.setItem("clickCost", clickCost);
    localStorage.setItem("clickSecondCost", clickSecondCost);
    localStorage.setItem("LCCost", LCCost);
    localStorage.setItem("lessCostBought", JSON.stringify(lessCostBought));
    localStorage.setItem("damage", damage);
    localStorage.setItem("attackCost", attackCost);
    localStorage.setItem("enemy", JSON.stringify(enemy));
    localStorage.setItem("enemyHP", enemyHP);
  }, [
    points,
    clickValue,
    clicksPerSecond,
    clickCost,
    clickSecondCost,
    LCCost,
    lessCostBought,
    damage,
    attackCost,
    enemy,
    enemyHP,
  ]);


  useEffect(() => {
    const id = setInterval(() => {
      setPoints((p) => p + clicksPerSecond);
    }, 1000);
    return () => clearInterval(id);
  }, [clicksPerSecond]);


  const handleStoneClick = () => {

    setPoints((p) => p + clickValue);

    checkAchievements(points + clickValue);
  };

 
  const upgradeClick = () => {
    if (points >= clickCost) {
      setPoints((p) => p - clickCost);
      setClickValue((v) => v + 1);
      setClickCost((c) => Math.floor(c * 2.5));
    } else {
      alert("No tienes suficientes diamantes para mejorar el pico.");
    }
  };


  const upgradeCPS = () => {
    if (points >= clickSecondCost) {
      setPoints((p) => p - clickSecondCost);
      setClicksPerSecond((c) => c + 1);
      setClickSecondCost((c) => Math.floor(c * 2.5));
    } else {
      alert("No tienes suficientes diamantes para comprar CPS.");
    }
  };


  const reduceCosts = () => {
    if (points >= LCCost) {
      setPoints((p) => p - LCCost);
      const lessPoints = 50;
      setLCCost((c) => Math.floor(c * 1.5));
      setClickCost((c) => Math.max(1, Math.floor(c - lessPoints)));
      setClickSecondCost((c) => Math.max(1, Math.floor(c - lessPoints)));
      setLessCostBought(true);
    } else {
      alert("No tienes suficientes diamantes para reducir costos.");
    }
  };


  const upgradeAttack = () => {
    if (points >= attackCost) {
      setPoints((p) => p - attackCost);
      setDamage((d) => d + 1);
      setAttackCost((c) => Math.floor(c * 2.5));
    } else {
      alert("No tienes suficientes diamantes para mejorar el ataque.");
    }
  };


  const spawnNextEnemy = (currentPoints) => {
 
    let next = { ...defaultEnemy };

    if (currentPoints >= 5000) {
      next = { name: "Wither", hp: 2000, maxHp: 2000, reward: 1000, img: "/img/wither.png" };
    } else if (currentPoints >= 2000) {
      next = { name: "Enderman", hp: 800, maxHp: 800, reward: 350, img: "/img/enderman.png" };
    } else if (currentPoints >= 1000) {
      next = { name: "Esqueleto", hp: 300, maxHp: 300, reward: 120, img: "/img/skeleton.jpg" };
    } else if (currentPoints >= 500) {
      next = { name: "Araña", hp: 150, maxHp: 150, reward: 60, img: "/img/spider.jpg" };
    } else if (currentPoints >= 100) {
      next = { name: "Zombie", hp: 60, maxHp: 60, reward: 30, img: "/img/zombie.png" };
    } else {
      next = { ...defaultEnemy };
    }

    setEnemy(next);
    setEnemyHP(next.hp);
  };


  const achievementsList = [
    { id: "ten", name: "¡10 Diamantes!", check: (p, d) => p >= 10 },
    { id: "hundred", name: "¡100 Diamantes!", check: (p, d) => p >= 100 },
    { id: "sword5", name: "Espada +5", check: (p, d) => d >= 5 },
    { id: "sword10", name: "Espada +10", check: (p, d) => d >= 10 },
  ];

  const checkAchievements = (maybePoints = points) => {
    const unlocked = achievementsList.filter((a) => a.check(maybePoints, damage));
    setAchievements(unlocked);
  };

  useEffect(() => {
    checkAchievements(points);

  }, [points, damage]);


  useEffect(() => {
    const createMovingButton = () => {
      const b = document.createElement("button");
      const trap = Math.random() * 5 > 4;
      b.textContent = trap ? "No me hagas Click!" : "Clickeame!";
      b.className = "btn btn-warning moving-button";
      if (trap) {
        b.style.backgroundColor = "red";
        b.style.borderColor = "darkred";
      }
      b.style.left = `${Math.random() * (window.innerWidth - 120)}px`;
      b.style.top = `${Math.random() * (window.innerHeight - 80)}px`;

      b.onclick = () => {
        if (trap) {
          setPoints((p) => Math.max(0, Math.floor(p / 2)));
          alert("Caiste. Perdiste la mitad de tus puntos.");
        } else {
          setPoints((p) => p + 5);
        }
        b.remove();
      };

      document.body.appendChild(b);
      setTimeout(() => {
        if (document.body.contains(b)) {
          if (!trap) setPoints((p) => Math.max(0, p - Math.floor(p / 3.5)));
          b.remove();
        }
      }, 3000);
    };

    const id = setInterval(createMovingButton, 8000);
    return () => clearInterval(id);
  }, []);

 
  const resetProgress = () => {
    if (!window.confirm("¿Borrar todo el progreso?")) return;
    setPoints(0);
    setClickValue(1);
    setClicksPerSecond(0);
    setClickCost(10);
    setClickSecondCost(50);
    setLCCost(500);
    setLessCostBought(false);
    setDamage(1);
    setAttackCost(15);
    setEnemy(defaultEnemy);
    setEnemyHP(defaultEnemy.hp);
    localStorage.clear();
  };

 
  return (
    <div className="container text-center mt-5">
      <h1>Clicker Game</h1>

      {}
      <div className="enemy-container mt-3">
        <img
          src={enemy.img}
          alt={enemy.name}
          style={{ width: "160px", cursor: "pointer" }}
          onClick={() => {
           
            const newHp = enemyHP - damage;
            if (newHp <= 0) {
              setPoints((p) => p + enemy.reward);
              spawnNextEnemy(points + enemy.reward);
            } else {
              setEnemyHP(newHp);
            }
          }}
        />
        <h3 className="mt-2 text-light">{enemy.name}</h3>
        <div className="progress" style={{ height: "20px", margin: "10px auto", width: "60%" }}>
          <div
            className="progress-bar bg-danger"
            style={{ width: `${(enemyHP / enemy.maxHp) * 100}%` }}
          >
            {enemyHP} / {enemy.maxHp}
          </div>
        </div>
      </div>

      {}
      <figure>
        <img
          id="clickButton"
          src="/img/piedra.png"
          alt="piedra"
          style={{ width: "150px", cursor: "pointer" }}
          onClick={handleStoneClick}
        />
      </figure>

      <h2 className="mt-3 text-light">Diamantes: {points}</h2>

      {}
      <div className="mt-3 text-light">
        <h4>Puntos por click: {clickValue}</h4>
        <h4>Daño de arma (espada): {damage}</h4>
        <h4>Puntos por segundo: {clicksPerSecond}</h4>
      </div>

      {}
      <div className="mt-4 d-flex flex-column align-items-center" style={{ gap: "10px" }}>
        <button onClick={upgradeClick} className="btn btn-success">
          Mejorar Pico (Cost: {clickCost})
        </button>

        <button onClick={upgradeCPS} className="btn btn-warning">
          Comprar puntos por segundo (Cost: {clickSecondCost})
        </button>

        <button onClick={upgradeAttack} className="btn btn-primary">
          Mejorar Espada (Daño +1) (Cost: {attackCost})
        </button>

        <button onClick={reduceCosts} className="btn btn-success">
          Reducir costos de mejoras (Cost: {LCCost})
        </button>

        <button className="btn btn-info" onClick={() => setShowModal(true)}>
          Ver Logros
        </button>

        <button className="btn btn-outline-danger" onClick={resetProgress}>
          Reset Progreso
        </button>
      </div>

      {}
      <AchievementsModal show={showModal} onHide={() => setShowModal(false)} achievements={achievements} />
    </div>
  );
}

export default ClickerGame;
