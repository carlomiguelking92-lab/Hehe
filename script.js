const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bg-music');
const popupOverlay = document.getElementById('popupOverlay');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

function moveNoButton() {
    const maxMove = window.innerWidth < 600 ? 40 : 70;
    const randomX = Math.floor(Math.random() * (maxMove * 2)) - maxMove;
    const randomY = Math.floor(Math.random() * (maxMove * 2)) - maxMove;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

yesBtn.addEventListener('click', () => {
    popupOverlay.style.opacity = '0';
    popupOverlay.style.visibility = 'hidden';
    
    createHeartBurst();
    
    bgMusic.play()
        .then(() => {
            musicBtn.innerText = "⏸️ Pause Music";
        })
        .catch((error) => {
            console.error("Audio playback failed:", error);
        });
});

musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play()
            .then(() => {
                musicBtn.innerText = "⏸️ Pause Music";
            })
            .catch((error) => {
                console.error("Audio playback failed:", error);
            });
    } else {
        bgMusic.pause();
        musicBtn.innerText = "🎵 Play Her Song";
    }
});

function createHeartBurst() {
    const heartEmojis = ['💖', '💕', '✨', '🌸', '❤️'];
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.setProperty('--random-x', (Math.random() * 200 - 100) + 'px');
        
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 2;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, (delay + duration) * 1000);
    }
}

const startDate = new Date('March 13, 2023 00:00:00').getTime();

function updateCounter() {
    const now = new Date().getTime();
    const difference = now - startDate;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCounter, 1000);
updateCounter();
