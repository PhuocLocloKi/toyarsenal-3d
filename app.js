let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seemore');
let backButton = document.getElementById('back');
// Modal Elements
let homeNavLink = document.getElementById('homeNavLink');
let modelsNavLink = document.getElementById('modelsNavLink');
let modelsModal = document.getElementById('modelsModal');
let closeModal = document.getElementById('closeModal');
let modalOverlay = document.querySelector('.modal-overlay');
let gridItems = document.querySelectorAll('.grid-item');
let sparklesContainer = document.getElementById('sparklesContainer');
// Update main carousel background glow color
const updateGlowColor = () => {
    let firstItem = document.querySelector('.carousel .list .item:first-child');
    if (firstItem) {
        let glowColor = firstItem.style.getPropertyValue('--item-glow') || '#6f2cfc';
        carousel.style.setProperty('--active-glow', glowColor);
    }
}
// Initial update on page load
window.addEventListener('DOMContentLoaded', () => {
    updateGlowColor();
});
if (nextButton) {
    nextButton.onclick = function(){
        showSlider('next');
    }
}
if (prevButton) {
    prevButton.onclick = function(){
        showSlider('prev');
    }
}
let unAcceptClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';
    carousel.classList.remove('showDetail');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    updateGlowColor();
    clearTimeout(unAcceptClick);
    unAcceptClick = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);
}
// See details logic
const setupEventListeners = () => {
    seeMoreButtons = document.querySelectorAll('.seemore');
    seeMoreButtons.forEach((button) => {
        button.onclick = function(){
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
            carousel.classList.add('showDetail');
            updateGlowColor();
        }
    });
}
setupEventListeners();
// Observe list mutations to rebind buttons
const observer = new MutationObserver(() => {
    setupEventListeners();
});
observer.observe(listHTML, { childList: true });
if (backButton) {
    backButton.onclick = function(){
        carousel.classList.remove('showDetail');
    }
}

let sparklesInterval;
// Sparkle/Star Generator inside Modal
const createSparkle = () => {
    if (!modelsModal.classList.contains('active')) return;
    
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle-dot');
    
    // Random position inside modal
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    // Color palettes for sparks
    const colors = ['#00ff66', '#ff0055', '#00f2fe', '#ffa200', '#2b7fff', '#e02cff', '#00ffd5', '#ffea00', '#ff00b7'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 4 + 2;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.backgroundColor = randomColor;
    sparkle.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`;
    
    sparklesContainer.appendChild(sparkle);
    
    // Auto remove after animation completes
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
};
// Open Modal
if (modelsNavLink && modelsModal) {
    modelsNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        modelsModal.classList.add('active');
        
        // Start sparkling interval
        clearInterval(sparklesInterval);
        sparklesInterval = setInterval(createSparkle, 80);
    });
}
// Close Modal
const hideModal = () => {
    if (modelsModal) modelsModal.classList.remove('active');
    clearInterval(sparklesInterval);
    if (sparklesContainer) sparklesContainer.innerHTML = ''; // clear all active sparkles
};
if (closeModal) closeModal.addEventListener('click', hideModal);
if (modalOverlay) modalOverlay.addEventListener('click', hideModal);
// Home Navigation Click: Return to main homepage screen
if (homeNavLink) {
    homeNavLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (carousel) carousel.classList.remove('showDetail');
        hideModal();
    });
}
// Go to specific slide index directly
const goToSlide = (targetIndex) => {
    carousel.classList.remove('showDetail');
    
    // Get currently loaded DOM items
    let currentItems = Array.from(document.querySelectorAll('.carousel .list .item'));
    
    // Find item with data-index matching target
    let targetItem = currentItems.find(item => parseInt(item.getAttribute('data-index')) === targetIndex);
    if (!targetItem) return;
    
    // Re-order DOM elements
    let allElements = Array.from(listHTML.children);
    let targetPos = allElements.indexOf(targetItem);
    
    if (targetPos > 0) {
        for (let i = 0; i < targetPos; i++) {
            listHTML.appendChild(allElements[i]);
        }
    }
    
    // Update visual aesthetics
    updateGlowColor();
    setupEventListeners();
};
// Bind grid click selection items
gridItems.forEach((card) => {
    card.addEventListener('click', () => {
        let targetIndex = parseInt(card.getAttribute('data-target'));
        goToSlide(targetIndex);
        hideModal();
    });
});

const initParticles = () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    let embersArray = [];
    let tracersArray = [];
    let smokeArray = [];
    let explosionFlash = 0; // opacity of screen flash
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Class for Battlefield Spark Embers (Tàn lửa chiến trường bay lên)
    class Ember {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height; // initial random spread
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 50;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = -(Math.random() * 1.5 + 0.5); // drift upwards
            this.alpha = Math.random() * 0.8 + 0.2;
            this.decay = Math.random() * 0.005 + 0.002;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.alpha -= this.decay;
            
            // Re-spawn if faded or went off-screen
            if (this.alpha <= 0 || this.y < -10) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            let activeColor = carousel.style.getPropertyValue('--active-glow') || '#6f2cfc';
            // Mix active color with charcoal-orange embers for fire/plasma vibe
            ctx.fillStyle = Math.random() > 0.4 ? activeColor : '#ff5500';
            ctx.shadowBlur = 10;
            ctx.shadowColor = activeColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Class for Combat Tracer Bullets (Đường đạn vạch đường bắn vút qua)
    class Tracer {
        constructor() {
            this.reset();
        }
        
        reset() {
            // Spawn from left, right, or top edges
            let side = Math.floor(Math.random() * 3);
            if (side === 0) { // left
                this.x = -50;
                this.y = Math.random() * canvas.height * 0.7;
                this.angle = Math.random() * 30 * Math.PI / 180; // shoot down-right
            } else if (side === 1) { // right
                this.x = canvas.width + 50;
                this.y = Math.random() * canvas.height * 0.7;
                this.angle = (180 - Math.random() * 30) * Math.PI / 180; // shoot down-left
            } else { // top
                this.x = Math.random() * canvas.width;
                this.y = -50;
                this.angle = (45 + Math.random() * 90) * Math.PI / 180; // shoot downwards
            }
            
            this.speed = Math.random() * 15 + 10; // high speed
            this.length = Math.random() * 80 + 40; // tracer trail length
            this.size = Math.random() * 1.5 + 1;
            this.alpha = Math.random() * 0.7 + 0.3;
        }
        
        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;
            
            // Check boundary
            if (this.x < -100 || this.x > canvas.width + 100 || this.y > canvas.height + 100) {
                this.reset();
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            let activeColor = carousel.style.getPropertyValue('--active-glow') || '#6f2cfc';
            ctx.strokeStyle = activeColor;
            ctx.lineWidth = this.size;
            ctx.shadowBlur = 15;
            ctx.shadowColor = activeColor;
            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x - Math.cos(this.angle) * this.length, this.y - Math.sin(this.angle) * this.length);
            ctx.stroke();
            ctx.restore();
        }
    }
    
    // Class for Mysterious Smoke/Fog (Làn khói sương ma mị)
    class Smoke {
        constructor() {
            this.reset();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 150 + 100; // large smoke clouds
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.1 - 0.05;
            this.alpha = 0;
            this.maxAlpha = Math.random() * 0.08 + 0.02; // very faint
            this.phase = 'grow';
            this.fadeSpeed = Math.random() * 0.0005 + 0.0002;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.phase === 'grow') {
                this.alpha += this.fadeSpeed;
                if (this.alpha >= this.maxAlpha) {
                    this.phase = 'fade';
                }
            } else {
                this.alpha -= this.fadeSpeed;
                if (this.alpha <= 0) {
                    this.reset();
                }
            }
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            let activeColor = carousel.style.getPropertyValue('--active-glow') || '#6f2cfc';
            
            // Create a radial gradient for soft smoke edges
            let gradient = ctx.createRadialGradient(this.x, this.y, 10, this.x, this.y, this.size);
            gradient.addColorStop(0, activeColor);
            gradient.addColorStop(1, 'rgba(5, 6, 8, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    // Initialize Arrays
    const init = () => {
        embersArray = [];
        tracersArray = [];
        smokeArray = [];
        
        // Spawn 45 embers
        for (let i = 0; i < 45; i++) {
            embersArray.push(new Ember());
        }
        // Spawn 5 tracers
        for (let i = 0; i < 5; i++) {
            tracersArray.push(new Tracer());
        }
        // Spawn 8 smoke clouds
        for (let i = 0; i < 8; i++) {
            smokeArray.push(new Smoke());
        }
    };
    init();
    
    // Animate loop
    const animate = () => {
        // Clear with dark overlay to create slight trailing motion blur
        ctx.fillStyle = 'rgba(5, 6, 8, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Occasional distant battlefield explosion flash
        if (Math.random() < 0.003 && explosionFlash <= 0) {
            explosionFlash = Math.random() * 0.15 + 0.05;
        }
        if (explosionFlash > 0) {
            ctx.save();
            let activeColor = carousel.style.getPropertyValue('--active-glow') || '#6f2cfc';
            ctx.fillStyle = activeColor;
            ctx.globalAlpha = explosionFlash;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
            explosionFlash -= 0.01; // fade flash out
        }
        
        // Update & Draw Smoke
        for (let i = 0; i < smokeArray.length; i++) {
            smokeArray[i].update();
            smokeArray[i].draw();
        }
        
        // Update & Draw Embers
        for (let i = 0; i < embersArray.length; i++) {
            embersArray[i].update();
            embersArray[i].draw();
        }
        
        // Update & Draw Tracers
        for (let i = 0; i < tracersArray.length; i++) {
            tracersArray[i].update();
            tracersArray[i].draw();
        }
        
        requestAnimationFrame(animate);
    };
    animate();
};
window.addEventListener('DOMContentLoaded', initParticles);

const initCustomCursor = () => {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Dot instantly snaps
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });
    
    const updateCursor = () => {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        
        // Damped spring interpolation logic
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    };
    updateCursor();
    
    // Interactive hover triggers
    const addCursorHover = (elements) => {
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorDot.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorDot.classList.remove('hover');
            });
        });
    };
    
    const bindCursorHoverables = () => {
        let interactive = document.querySelectorAll('button, a, .arrows button, .grid-item');
        addCursorHover(interactive);
    };
    
    bindCursorHoverables();
    
    // Watch for dynamic list mutations to rebind dynamic buttons
    const hoverObserver = new MutationObserver(() => {
        bindCursorHoverables();
    });
    hoverObserver.observe(listHTML, { childList: true });
};
window.addEventListener('DOMContentLoaded', initCustomCursor);

let shotCount = 0;
const initMuzzleFiring = () => {
    // Firing interval loop
    setInterval(() => {
        // Find the currently active slide's particle container
        let activeItem = document.querySelector('.carousel .list .item:first-child');
        if (!activeItem) return;
        
        let container = activeItem.querySelector('.hud-particles-container');
        if (!container) return;
        
        // Spawn muzzle flash and flying energy projectile
        // Randomize muzzle height slightly
        let muzzleTop = (45 + Math.random() * 6) + '%';
        let muzzleLeft = '25%';
        
        // 1. Spawn flying energy projectile
        const bullet = document.createElement('div');
        bullet.classList.add('muzzle-bullet');
        // Barrel muzzle position (approx. left-center of viewport)
        bullet.style.top = (45 + Math.random() * 6) + '%';
        bullet.style.left = '25%';
        bullet.style.top = muzzleTop;
        bullet.style.left = muzzleLeft;
        container.appendChild(bullet);
        
        // Auto remove bullet element
        setTimeout(() => {
            bullet.remove();
        }, 600);
        
        // Spawn ejected shell casing (flies rightwards and drops down)
        // 2. Spawn muzzle flash flare blast
        const flash = document.createElement('div');
        flash.classList.add('muzzle-flash');
        flash.style.top = muzzleTop;
        flash.style.left = muzzleLeft;
        container.appendChild(flash);
        
        // Auto remove flash element
        setTimeout(() => {
            flash.remove();
        }, 1200);
        
        // 3. Spawn ejected shell casing (flies rightwards and drops down)
        const shell = document.createElement('div');
        shell.classList.add('ejected-shell');
        shell.style.top = (46 + Math.random() * 4) + '%';
        shell.style.left = '48%'; // chamber position
        container.appendChild(shell);
        
        // Auto remove shell casing
        setTimeout(() => {
            shell.remove();
        }, 1200);
        
        // 4. Trigger expanding shockwave every 3 shots
        shotCount++;
        if (shotCount % 3 === 0) {
            const wave = document.createElement('div');
            wave.classList.add('energy-shockwave');
            container.appendChild(wave);
            setTimeout(() => {
                wave.remove();
            }, 1600);
        }
        
    }, 450); // Fast rapid-fire rate (450ms)
};
window.addEventListener('DOMContentLoaded', initMuzzleFiring);