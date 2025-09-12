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
    });

    upgradeButton.addEventListener('click', () => {
        if (points >= clickCost) {
            points -= clickCost;
            clickValue++;
            clickCost = Math.floor(clickCost * 2.5);
            updatePointsDisplay();
            updateClickCostDisplay();
            updateClicksValueDisplay();
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

    LessCostButton.addEventListener('click', () => {
        if (points >= LCCost) {
            points -= LCCost;
            lessPoints= lessCost + 15;
            LCCost = Math.floor(LCCost * 3);
            updateLessCostDisplay();
            clickCost = Math.floor(clickCost - lessPoints);
            clickSecondCost = Math.floor(clickSecondCost - lessPoints);
            if (clickCost < 1) clickCost = 1;
            if (clickSecondCost < 1) clickSecondCost = 1;
            updatePointsDisplay();
            updateClickCostDisplay();
            updateClickPerSecondCostDisplay();
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
            button.textContent = 'DONT CLICK ME!';
        }else{
            button.textContent = 'Catch Me!';
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
                points -= Math.floor(points/3); // Subtract points
                updatePointsDisplay();
                button.remove();
            }
            }
        }, 3000);

        document.body.appendChild(button);
    }

    // Generate a moving button every 2 seconds
    setInterval(createMovingButton, 2000);

    setInterval(() => {
        points += clicksPerSecond;
        updatePointsDisplay();
    }, 1000);
});