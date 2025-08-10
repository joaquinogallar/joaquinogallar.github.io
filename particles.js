const container = document.getElementById('particle-container');
const bubbleCount = 30;
const minSpeed = 15000;   // in ms
const maxSpeed = 25000;
const maxDelay = 14000;

for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    // random position
    bubble.style.left = Math.random() * 100 + '%';

    // random animation duration and delay
    const duration = Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
    const delay = Math.floor(Math.random() * maxDelay);

    bubble.style.animationDuration = `${duration}ms`;
    bubble.style.animationDelay = `${delay}ms`;

    container.appendChild(bubble);
}