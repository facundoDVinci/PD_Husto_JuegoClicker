// filepath: clicker-game/clicker-game/src/js/main.js
let points = 0;
let clicksPerSecond = 0;
let clickValue = 1;
let clickCost = 10;
let clickSecondCost = 50;

const pointsDisplay = document.getElementById('points');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const cpsButton = document.getElementById('cpsButton');
const clickCostDisplay = document.getElementById('upgradeCost');
const clicksPerSecondCostDisplay = document.getElementById('cpsCost');
const cpsDisplay = document.getElementById('cps')

document.addEventListener('DOMContentLoaded', function() {
    clickButton.addEventListener('click', () => {
        points += clickValue;
        updatePointsDisplay();
    });

    upgradeButton.addEventListener('click', () => {
        if (points >= clickCost) {
            points -= clickCost;
            clickValue++;
            clickCost = Math.floor(clickCost * 2.5);
            updatePointsDisplay();
            updateClickCostDisplay();
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
        } else {
            alert("No tienes suficientes puntos para comprar una mejora");
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

    setInterval(() => {
        points += clicksPerSecond;
        updatePointsDisplay();
    }, 1000);
});