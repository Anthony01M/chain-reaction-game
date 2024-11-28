document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const resultModal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');
    const restartButton = document.getElementById('restart-button');
    const numCircles = 20;
    const circles = [];
    let startTime;
    let endTime;

    function createCircles() {
        for (let i = 0; i < numCircles; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');
            circle.style.top = `${Math.random() * 570}px`;
            circle.style.left = `${Math.random() * 570}px`;
            gameContainer.appendChild(circle);
            circles.push(circle);
        }

        circles.forEach(circle => {
            circle.addEventListener('click', () => {
                if (!startTime) {
                    startTime = new Date();
                }
                startChainReaction(circle);
            });
        });
    }

    function startChainReaction(circle) {
        circle.style.transform = 'scale(2)';
        circle.style.opacity = '0';
        setTimeout(() => {
            circle.remove();
            circles.splice(circles.indexOf(circle), 1);
            checkForCollisions(circle);
            if (circles.length === 0) {
                endTime = new Date();
                showResult();
            }
        }, 500);
    }

    function checkForCollisions(triggerCircle) {
        const triggerRect = triggerCircle.getBoundingClientRect();
        circles.forEach(circle => {
            const circleRect = circle.getBoundingClientRect();
            if (isColliding(triggerRect, circleRect)) {
                startChainReaction(circle);
            }
        });
    }

    function isColliding(rect1, rect2) {
        return !(
            rect1.top > rect2.bottom ||
            rect1.bottom < rect2.top ||
            rect1.left > rect2.right ||
            rect1.right < rect2.left
        );
    }

    function showResult() {
        const timeTaken = (endTime - startTime) / 1000;
        resultText.textContent = `Time taken: ${timeTaken.toFixed(2)} seconds`;
        resultModal.style.display = 'flex';
    }

    restartButton.addEventListener('click', () => {
        resultModal.style.display = 'none';
        gameContainer.innerHTML = '';
        circles.length = 0;
        startTime = null;
        endTime = null;
        createCircles();
    });

    createCircles();
});