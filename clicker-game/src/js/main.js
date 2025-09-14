// filepath: clicker-game/clicker-game/src/js/main.js
let points = 0;
let clicksPerSecond = 0;
let clickValue = 1;
let clickCost = 10;
let clickSecondCost = 50;
let lessCost= 0;
let LCCost= 500;

const pointsDisplay = document.getElementById('points');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const cpsButton = document.getElementById('cpsButton');
const clickCostDisplay = document.getElementById('upgradeCost');
const clicksPerSecondCostDisplay = document.getElementById('cpsCost');
const cpsDisplay = document.getElementById('cps')
const clicksValueDisplay = document.getElementById('pointsPerClick');
const LessCostButton = document.getElementById('LessCost');
const LessCostDisplay = document.getElementById('LCCost');

document.addEventListener('DOMContentLoaded', function() {
    clickButton.addEventListener('click', () => {
        points += clickValue;
        updatePointsDisplay();
        checkAchievements();
    });

    upgradeButton.addEventListener('click', () => {
        if (points >= clickCost) {
            points -= clickCost;
            clickValue++;
            clickCost = Math.floor(clickCost * 2.5);
            updatePointsDisplay();
            updateClickCostDisplay();
            updateClicksValueDisplay();
            upgrades++;
            checkAchievements();
        } else {
            alert("No tienes suficientes puntos para comprar una mejora!");
        }
    });

    cpsButton.addEventListener('click', () => {
        if (points >= clickSecondCost) {
            points -= clickSecondCost;
            clicksPerSecond++;
            clickSecondCost = Math.floor(clickSecondCost * 2.5);
            updatePointsDisplay();
            updateClickPerSecondCostDisplay();
            updatecpsDisplay();
            cps++;
            checkAchievements();
        } else {
            alert("No tienes suficientes puntos para comprar una mejora");
        }
    });

    LessCostButton.addEventListener('click', () => {
        if (points >= LCCost) {
            points -= LCCost;
            lessPoints= lessCost + 50;
            LCCost = Math.floor(LCCost * 1.5);
            updateLessCostDisplay();
            clickCost = Math.floor(clickCost - lessPoints);
            clickSecondCost = Math.floor(clickSecondCost - lessPoints);
            if (clickCost < 1) clickCost = 1;
            if (clickSecondCost < 1) clickSecondCost = 1;
            updatePointsDisplay();
            updateClickCostDisplay();
            updateClickPerSecondCostDisplay();
            lessCostBought = true;
            checkAchievements();
        }
        });
            

    function updatePointsDisplay() {
        pointsDisplay.innerText = `${points}`;
    }

    function updateClickCostDisplay() {
        clickCostDisplay.innerText = `${clickCost}`;
    }

    function updateClickPerSecondCostDisplay() {
        clicksPerSecondCostDisplay.innerText = `${clickSecondCost}`;
    }

    function updatecpsDisplay() {
        cpsDisplay.innerText = `${clicksPerSecond}`;
    }

    function updateClicksValueDisplay() {
        clicksValueDisplay.innerText = `${clickValue}`;
    }

    function updateLessCostDisplay() {
        LessCostDisplay.innerText = `${LCCost}`;
    }

    function createMovingButton() {
        const button = document.createElement('button');
        if (Math.random()*5 >4){
            button.style.backgroundColor = 'red';
            button.style.borderColor = 'darkred';
            button.textContent = 'No me hagas Click!';
        }else{
            button.textContent = 'Clickeame!';
        }
        
        button.className = 'btn btn-warning moving-button';

        // Set random position
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;

        // Add click event to button
        button.addEventListener('click', () => {
            if (button.style.backgroundColor === 'red'){
                points -= Math.floor(points/2); 
                updatePointsDisplay();
                button.remove();
                alert("Caiste. Perdiste la mitad de tus puntos.");
                return;
                
            }
            points += 5; // Add points
            updatePointsDisplay();
            button.remove(); // Remove button
        });

        // Remove button after 3 seconds and subtract points
        setTimeout(() => {
            if (document.body.contains(button)) {
                if (button.style.backgroundColor === 'red'){
                    button.remove();
                    return;
                }else{
                points -= Math.floor(points/3.5); // Subtract points
                updatePointsDisplay();
                button.remove();
            }
            }
        }, 3000);

        document.body.appendChild(button);
    }

    // Generate a moving button every 2 seconds
    setInterval(createMovingButton, 8000);

    setInterval(() => {
        points += clicksPerSecond;
        updatePointsDisplay();
    }, 1000);
});

// Definición de logros
const achievements = [
  { id: 'tenClicks', name: '¡10 Diamantes!', desc: 'Consigue 10 diamantes.', unlocked: false, check: () => points >= 10 },
  { id: 'hundredClicks', name: '¡100 Diamantes!', desc: 'Consigue 100 diamantes.', unlocked: false, check: () => points >= 100 },
  { id: 'thousandClicks', name: '¡1000 Diamantes!', desc: 'Consigue 1000 diamantes.', unlocked: false, check: () => points >= 1000 },
  { id: 'upgradeBought', name: '¡Mejora Comprada!', desc: 'Compra tu primera mejora.', unlocked: false, check: () => upgrades > 0 },
  { id: 'upgradeBought2', name: '¡Quiero maaaas!', desc: 'Compra 5 mejoras.', unlocked: false, check: () => upgrades > 4 },
  { id: 'upgradeBought3', name: '¡El pico mas fuerte!', desc: 'Compra 10 mejoras.', unlocked: false, check: () => upgrades > 9 },
  { id: 'cpsBought', name: '¡AutoClick!', desc: 'Compra tu primer click por segundo.', unlocked: false, check: () => cps > 0 },
  { id: 'cpsBought2', name: '¡No quiero laburo!', desc: 'Compra 5 clicks por segundo.', unlocked: false, check: () => cps > 4 },
  { id: 'cpsBought3', name: '¡Bien vago en un lunes!', desc: 'Compra 10 clicks por segundo.', unlocked: false, check: () => cps > 9 },
  { id: 'lessCostBought', name: '¡Costos Reducidos!', desc: 'Compra la reducción de costos.', unlocked: false, check: () => lessCostBought },
  { id: 'profe_aprobame_porfa', name: 'Se me acabaron las ideas para logros', desc: 'Obten todos los logros', unlocked: false, check: () => achievements.every(a => a.unlocked) },
];

// Variables para logros
let upgrades = 0;
let cps = 0;
let lessCostBought = false;

// Actualiza la lista de logros en el modal
function updateAchievementsList() {
  const list = document.getElementById('achievementsList');
  list.innerHTML = '';
  achievements.forEach(a => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <span>
        <strong>${a.name}</strong><br>
        <small>${a.desc}</small>
      </span>
      <span class="badge rounded-pill ${a.unlocked ? 'bg-success' : 'bg-secondary'}">
        ${a.unlocked ? '¡Obtenido!' : 'Bloqueado'}
      </span>
    `;
    list.appendChild(li);
  });
}

// Chequea y desbloquea logros
function checkAchievements() {
  achievements.forEach(a => {
    if (!a.unlocked && a.check()) {
      a.unlocked = true;
      // Opcional: notificación visual
      alert(`¡Logro desbloqueado: ${a.name}!`);
    }
  });
  updateAchievementsList();
}

// Actualiza la lista de logros al abrir el modal
document.getElementById('achievementsModal').addEventListener('show.bs.modal', updateAchievementsList);