// filepath: clicker-game/clicker-game/src/js/main.js
let points = 0;
let clicksPerSecond = 0;
let clickValue = 1;

const pointsDisplay = document.getElementById('points');
const clickButton = document.getElementById('click-button');
const upgradeButton = document.getElementById('upgrade-button');
const cpsButton = document.getElementById('cps-button');

clickButton.addEventListener('click', () => {
    points += clickValue;
    updatePointsDisplay();
});

upgradeButton.addEventListener('click', () => {
    if (points >= 10) {
        points -= 10;
        clickValue++;
        updatePointsDisplay();
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
    pointsDisplay.innerText = `Points: ${points}`;
}

setInterval(() => {
    points += clicksPerSecond;
    updatePointsDisplay();
}, 1000);