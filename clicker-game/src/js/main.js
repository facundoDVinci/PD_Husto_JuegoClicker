// filepath: clicker-game/clicker-game/src/js/main.js
let points = 0;
let clicksPerSecond = 0;
let clickValue = 1;
let clickCost = 10;

const pointsDisplay = document.getElementById('points');
const clickButton = document.getElementById('clickButton');
const upgradeButton = document.getElementById('upgradeButton');
const cpsButton = document.getElementById('cps-button');
const clickCostDisplay = document.getElementById('upgradeCost');

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
            alert("Not enough points for upgrade!");
        }
    });

    cpsButton.addEventListener('click', () => {
        if (points >= 20) {
            points -= 20;
            clicksPerSecond++;
            updatePointsDisplay();
        } else {
            alert("Not enough points for CPS purchase!");
        }
    });

    function updatePointsDisplay() {
        pointsDisplay.innerText = `${points}`;
    }

    function updateClickCostDisplay() {
        clickCostDisplay.innerText = `${clickCost}`;
    }

    setInterval(() => {
        points += clicksPerSecond;
        updatePointsDisplay();
    }, 1000);
});