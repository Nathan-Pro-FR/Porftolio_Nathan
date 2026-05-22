// --- CONFIGURATION DU CANVAS (PLUIE DE SAKURA) ---
const canvas = document.getElementById('sakura-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const petalCount = 40;
const petals = [];

class Petal {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 6; 
        this.speedY = Math.random() * 1.5 + 1; 
        this.speedX = Math.random() * 1 - 0.5; 
        this.opacity = Math.random() * 0.6 + 0.4;
        this.flip = Math.random();
        this.flipSpeed = Math.random() * 0.03 + 0.01;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 30) * 0.5; 
        this.flip += this.flipSpeed;

        if (this.y > canvas.height || this.x > canvas.width || this.x < -this.size) {
            this.reset();
            this.y = -this.size;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.flip);
        ctx.scale(Math.sin(this.flip), 1); 

        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 1.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 183, 197, ${this.opacity})`; 
        ctx.fill();
        
        ctx.restore();
    }
}

for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    requestAnimationFrame(animate);
}
animate();


// --- GESTION AUDIO & VISUALIZER ---
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const visualizer = document.getElementById('visualizer');
let toastTimeout; 

bgMusic.volume = 0; 

musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.classList.add('playing');
        visualizer.classList.add('active'); 
        
        // Déclenchement du popup en mode LECTURE avec ton SVG
        showMusicToast("play", "Lecture", "Sakura Serenity - Melodigne");

        let volumeInterval = setInterval(() => {
            if (bgMusic.volume < 0.2) { 
                bgMusic.volume += 0.02;
            } else {
                clearInterval(volumeInterval);
            }
        }, 200);

    } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        visualizer.classList.remove('active'); 
        bgMusic.volume = 0;

        // Déclenchement du popup en mode PAUSE avec ton SVG
        showMusicToast("pause", "Musique en pause", "À bientôt !");
    }
});


// --- CHARGEMENT DYNAMIQUE DES PROJETS VIA FICHIER JSON ---
const projectsGrid = document.getElementById('projects-grid');

async function loadProjects() {
    if (!projectsGrid) return;

    try {
        const response = await fetch('projets.json');
        const myProjects = await response.json();

        projectsGrid.innerHTML = ""; 

        myProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('glass-card', 'project-item');

            projectCard.innerHTML = `
                <div class="project-thumb">
                    <img src="${project.image}" alt="Miniature de ${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank" class="project-btn">Découvrir le projet</a>
                </div>
            `;

            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error("Erreur lors du chargement du fichier JSON :", error);
        projectsGrid.innerHTML = `<p style="text-align: center; opacity: 0.6; grid-column: 1/-1;">
            Impossible de charger les projets pour le moment.
        </p>`;
    }
}

loadProjects();


// --- FONCTION POUR LE POPUP AUDIO DYNAMIQUE (TOAST) ---
function showMusicToast(iconType, title, sub) {
    const toast = document.getElementById('music-toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastTitle = document.getElementById('toast-title');
    const toastSub = document.getElementById('toast-sub');
    
    if (!toast) return;

    // On nettoie les anciennes classes pour éviter les conflits
    toastIcon.classList.remove('play-mode', 'pause-mode');
    
    // On ajoute la classe correspondante ("play-mode" ou "pause-mode")
    if (iconType === 'play') {
        toastIcon.classList.add('play-mode');
    } else {
        toastIcon.classList.add('pause-mode');
    }

    if (title && toastTitle) toastTitle.textContent = title;
    if (sub && toastSub) toastSub.textContent = sub;

    // Réinitialisation du chronomètre et affichage du toast
    clearTimeout(toastTimeout);
    toast.classList.add('show');

    // Masquage automatique du popup après 3.5 secondes
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}