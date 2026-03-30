// ==================== COSMIC VISUALIZATION ====================
// 3D Solar System Simulator with No-Code Simulation Interface

// ==================== ONBOARDING VARIABLES ====================
let onboardingComplete = false;
let launchSequenceRunning = false;
let countdownValue = 10;
let countdownInterval;
let flightInterval;

// ==================== ONBOARDING INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌌 Cosmic Visualization Loading...');
    
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem('cosmicOnboardingComplete');
    
    if (!hasCompletedOnboarding) {
        startOnboarding();
        // Initialize 3D scenes in background
        setTimeout(() => {
            initSolarSystem();
            initSimulationCanvas();
        }, 100);
    } else {
        // Skip onboarding, show main app
        document.body.classList.remove('onboarding-active');
        const onboarding = document.getElementById('onboarding');
        if (onboarding) {
            onboarding.style.display = 'none';
        }
        // Initialize everything
        initSolarSystem();
        initSimulationCanvas();
        populateBodyList();
        initCharts();
    }
    
    console.log('✅ Cosmic Visualization Ready');
});

// ==================== ONBOARDING FUNCTIONS ====================
function startOnboarding() {
    document.body.classList.add('onboarding-active');
    showStep(1);
    createStars();
}

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.onboarding-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const currentStep = document.getElementById(`step${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
    }
}

// ==================== MOBILE MENU FUNCTIONS ====================
function toggleMobileMenu() {
    const menu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileMenuToggle');
    
    if (menu && toggle) {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
        
        // Toggle aria-expanded
        const isExpanded = menu.classList.contains('active');
        toggle.setAttribute('aria-expanded', isExpanded);
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('navMenu');
    const toggle = document.getElementById('mobileMenuToggle');
    
    if (menu && toggle) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
    }
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            document.querySelectorAll('.mobile-nav-item').forEach(item => {
                item.classList.remove('active');
                const mobileItem = document.querySelector(`.mobile-nav-item[href="#${sectionId}"]`);
                if (mobileItem) {
                    mobileItem.classList.add('active');
                }
            });
        }
    });
}

// Add scroll listener for active nav
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

function startLaunchSequence() {
    if (launchSequenceRunning) return;
    
    launchSequenceRunning = true;
    
    // Activate rocket flame
    const flame = document.getElementById('rocketFlame');
    if (flame) {
        flame.classList.add('active');
    }
    
    // Create exhaust particles
    createExhaustParticles();
    
    // Move to countdown after delay
    setTimeout(() => {
        showStep(2);
        startCountdown();
    }, 2000);
}

function startCountdown() {
    countdownValue = 10;
    const countdownNumber = document.getElementById('countdownNumber');
    const progressFill = document.getElementById('launchProgress');
    const statusLight = document.querySelector('.status-light');
    const statusText = document.querySelector('.launch-status span');
    
    countdownInterval = setInterval(() => {
        countdownValue--;
        
        if (countdownNumber) {
            countdownNumber.textContent = countdownValue;
        }
        
        // Update progress bar
        if (progressFill) {
            const progress = ((10 - countdownValue) / 10) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        // Change status at T-3
        if (countdownValue <= 3 && countdownValue > 0) {
            if (statusLight) {
                statusLight.classList.remove('green');
                statusLight.classList.add('red');
                statusLight.style.background = 'var(--warning)';
                statusLight.style.boxShadow = '0 0 20px var(--warning)';
            }
            if (statusText) {
                statusText.textContent = 'IGNITION SEQUENCE START';
                statusText.style.color = 'var(--warning)';
            }
        }
        
        // Launch at T-0
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            setTimeout(startLiftoff, 500);
        }
    }, 1000);
}

function startLiftoff() {
    showStep(3);
    
    // Create stars for space view
    createSpaceStars();
    
    // Create speed lines
    createSpeedLines();
    
    // Start flight simulation
    startFlightSimulation();
}

function startFlightSimulation() {
    let altitude = 0;
    let velocity = 0;
    let distance = 0;
    let time = 0;
    
    const altitudeEl = document.getElementById('altitude');
    const velocityEl = document.getElementById('velocity');
    const distanceEl = document.getElementById('distance');
    
    flightInterval = setInterval(() => {
        time += 0.1;
        
        // Simulate acceleration
        altitude += 100 + (time * 10);
        velocity += 50 + (time * 5);
        distance += 0.001 + (time * 0.0001);
        
        if (altitudeEl) altitudeEl.textContent = `${Math.floor(altitude).toLocaleString()} km`;
        if (velocityEl) velocityEl.textContent = `${Math.floor(velocity).toLocaleString()} km/h`;
        if (distanceEl) distanceEl.textContent = `${distance.toFixed(4)} AU`;
        
        // Move to welcome screen after 6 seconds
        if (time >= 6) {
            clearInterval(flightInterval);
            setTimeout(() => {
                showStep(4);
            }, 1000);
        }
    }, 100);
}

function enterApp() {
    console.log('🚀 Entering Mission Control...');
    
    // Fade out onboarding
    const onboarding = document.getElementById('onboarding');
    if (onboarding) {
        onboarding.style.opacity = '0';
        onboarding.style.transition = 'opacity 1s ease';
        
        setTimeout(() => {
            onboarding.style.display = 'none';
            document.body.classList.remove('onboarding-active');
            
            // Show main content
            const navbar = document.querySelector('.navbar');
            const hero = document.querySelector('.hero');
            const sections = document.querySelectorAll('section');
            const footer = document.querySelector('footer');
            
            if (navbar) navbar.style.display = 'block';
            if (hero) hero.style.display = 'flex';
            sections.forEach(section => {
                section.style.display = 'block';
            });
            if (footer) footer.style.display = 'block';
            
            // Save onboarding completion
            localStorage.setItem('cosmicOnboardingComplete', 'true');
            
            // Populate body list and initialize charts if not done
            populateBodyList();
            initCharts();
            
            // Re-render solar system
            if (renderer && scene && camera) {
                renderer.render(scene, camera);
            }
            
            console.log('🚀 Welcome to Mission Control!');
        }, 1000);
    }
}

function skipOnboarding() {
    console.log('⏭️ Skipping onboarding...');
    localStorage.setItem('cosmicOnboardingComplete', 'true');
    
    const onboarding = document.getElementById('onboarding');
    if (onboarding) {
        onboarding.style.opacity = '0';
        onboarding.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            onboarding.style.display = 'none';
            document.body.classList.remove('onboarding-active');
            
            // Show all content
            document.querySelectorAll('.navbar, .hero, section, footer').forEach(el => {
                el.style.display = '';
            });
            document.querySelector('.hero').style.display = 'flex';
            
            // Initialize everything
            initSolarSystem();
            initSimulationCanvas();
            populateBodyList();
            initCharts();
            
            console.log('🚀 Welcome to Mission Control!');
        }, 500);
    }
}

// ==================== ANIMATION HELPERS ====================
function createStars() {
    // Stars for background effect
    const container = document.querySelector('.rocket-platform');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.opacity = Math.random();
        container.appendChild(star);
    }
}

function createExhaustParticles() {
    const container = document.getElementById('exhaustParticles');
    if (!container) return;
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            bottom: 0;
            left: ${40 + Math.random() * 20}%;
            width: ${5 + Math.random() * 10}px;
            height: ${20 + Math.random() * 30}px;
            background: linear-gradient(180deg, #ff6b35, #ffd700, transparent);
            border-radius: 50%;
            animation: exhaustRise 0.5s ease-out forwards;
        `;
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 500);
    }, 50);
}

function createSpaceStars() {
    const container = document.getElementById('starsBg');
    if (!container) return;
    
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            width: ${1 + Math.random() * 2}px;
            height: ${1 + Math.random() * 2}px;
            animation-delay: ${Math.random() * 2}s;
            opacity: ${Math.random()};
        `;
        container.appendChild(star);
    }
}

function createSpeedLines() {
    const container = document.getElementById('speedLines');
    if (!container) return;
    
    setInterval(() => {
        const line = document.createElement('div');
        line.className = 'speed-line';
        line.style.cssText = `
            left: ${Math.random() * 100}%;
            animation-duration: ${0.3 + Math.random() * 0.3}s;
        `;
        container.appendChild(line);
        
        setTimeout(() => line.remove(), 600);
    }, 50);
}

// Add exhaust animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes exhaustRise {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== GLOBAL VARIABLES ====================
let scene, camera, renderer;
let celestialBodies = {};
let orbits = {};
let labels = {};
let simulationRunning = false;
let simulationPaused = false;
let simulationTime = 0;
let simulationData = [];
let animationId;
let chartInstances = {};

// Celestial body data (realistic values scaled for visualization)
const celestialData = {
    sun: {
        name: 'Sun',
        type: 'star',
        radius: 30,
        distance: 0,
        speed: 0,
        color: '#ff6b35',
        texture: 'sun',
        description: 'The star at the center of our Solar System. It contains 99.86% of the system\'s total mass.',
        mass: '1.989 × 10³⁰ kg',
        temperature: '5,505°C (surface)',
        age: '4.6 billion years'
    },
    mercury: {
        name: 'Mercury',
        type: 'planet',
        radius: 2,
        distance: 50,
        speed: 0.04,
        color: '#9ca3af',
        description: 'The smallest planet in our Solar System and closest to the Sun.',
        mass: '3.285 × 10²³ kg',
        dayLength: '59 Earth days',
        yearLength: '88 Earth days',
        moons: 0
    },
    venus: {
        name: 'Venus',
        type: 'planet',
        radius: 3.5,
        distance: 70,
        speed: 0.015,
        color: '#e9c46a',
        description: 'Second planet from the Sun. Hottest planet due to greenhouse effect.',
        mass: '4.867 × 10²⁴ kg',
        dayLength: '243 Earth days',
        yearLength: '225 Earth days',
        moons: 0
    },
    earth: {
        name: 'Earth',
        type: 'planet',
        radius: 3.5,
        distance: 100,
        speed: 0.01,
        color: '#4361ee',
        description: 'Our home planet. The only known planet to support life.',
        mass: '5.972 × 10²⁴ kg',
        dayLength: '24 hours',
        yearLength: '365.25 days',
        moons: 1
    },
    mars: {
        name: 'Mars',
        type: 'planet',
        radius: 2.5,
        distance: 130,
        speed: 0.008,
        color: '#ef233c',
        description: 'The Red Planet. Dusty, cold, desert world with a very thin atmosphere.',
        mass: '6.39 × 10²³ kg',
        dayLength: '24.6 hours',
        yearLength: '687 Earth days',
        moons: 2
    },
    jupiter: {
        name: 'Jupiter',
        type: 'planet',
        radius: 12,
        distance: 180,
        speed: 0.004,
        color: '#d4a373',
        description: 'Largest planet in our Solar System. A gas giant with a Great Red Spot.',
        mass: '1.898 × 10²⁷ kg',
        dayLength: '10 hours',
        yearLength: '12 Earth years',
        moons: 79
    },
    saturn: {
        name: 'Saturn',
        type: 'planet',
        radius: 10,
        distance: 240,
        speed: 0.003,
        color: '#e9c46a',
        hasRings: true,
        description: 'Adorned with a dazzling system of icy rings.',
        mass: '5.683 × 10²⁶ kg',
        dayLength: '10.7 hours',
        yearLength: '29 Earth years',
        moons: 82
    },
    uranus: {
        name: 'Uranus',
        type: 'planet',
        radius: 6,
        distance: 300,
        speed: 0.002,
        color: '#4cc9f0',
        description: 'Ice giant that rotates at a nearly 90-degree angle from the plane of its orbit.',
        mass: '8.681 × 10²⁵ kg',
        dayLength: '17 hours',
        yearLength: '84 Earth years',
        moons: 27
    },
    neptune: {
        name: 'Neptune',
        type: 'planet',
        radius: 6,
        distance: 360,
        speed: 0.001,
        color: '#3a0ca3',
        description: 'Dark, cold, and whipped by supersonic winds. The most distant major planet.',
        mass: '1.024 × 10²⁶ kg',
        dayLength: '16 hours',
        yearLength: '165 Earth years',
        moons: 14
    },
    moon: {
        name: 'Moon',
        type: 'moon',
        radius: 1,
        distance: 8,
        speed: 0.05,
        color: '#d1d5db',
        parent: 'earth',
        description: 'Earth\'s only natural satellite.',
        mass: '7.342 × 10²² kg',
        dayLength: '27.3 Earth days',
        distanceFromEarth: '384,400 km'
    },
    io: {
        name: 'Io',
        type: 'moon',
        radius: 0.8,
        distance: 15,
        speed: 0.08,
        color: '#fcd34d',
        parent: 'jupiter',
        description: 'Most volcanically active body in the Solar System.',
        mass: '8.93 × 10²² kg'
    },
    europa: {
        name: 'Europa',
        type: 'moon',
        radius: 0.7,
        distance: 18,
        speed: 0.06,
        color: '#9ca3af',
        parent: 'jupiter',
        description: 'Icy moon that may harbor an ocean beneath its surface.',
        mass: '4.8 × 10²² kg'
    },
    titan: {
        name: 'Titan',
        type: 'moon',
        radius: 1.2,
        distance: 20,
        speed: 0.04,
        color: '#d4a373',
        parent: 'saturn',
        description: 'Saturn\'s largest moon with a thick atmosphere.',
        mass: '1.34 × 10²³ kg'
    }
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌌 Cosmic Visualization - Initializing...');
    
    initNavbar();
    initSolarSystem();
    initSimulationCanvas();
    populateBodyList();
    initCharts();
    
    console.log('✅ Cosmic Visualization Ready');
});

// ==================== NAVBAR ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY >= sectionTop) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink?.classList.add('active');
        }
    });
}

// ==================== SOLAR SYSTEM 3D VIEW ====================
function initSolarSystem() {
    const canvas = document.getElementById('solarSystemCanvas');
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0f);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        10000
    );
    camera.position.set(0, 200, 400);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 2, 1000);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);
    
    // Create starfield background
    createStarfield();
    
    // Create celestial bodies
    Object.keys(celestialData).forEach(key => {
        createCelestialBody(key, celestialData[key]);
    });
    
    // Create orbit paths
    Object.keys(celestialData).forEach(key => {
        if (celestialData[key].type === 'planet') {
            createOrbit(key, celestialData[key]);
        }
    });
    
    // Animation loop
    animateSolarSystem();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
}

function createStarfield() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 10000; i++) {
        vertices.push(
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000)
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
}

function createCelestialBody(key, data) {
    const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.type === 'star' ? data.color : 0x000000,
        emissiveIntensity: data.type === 'star' ? 1 : 0
    });
    
    const body = new THREE.Mesh(geometry, material);
    body.position.x = data.distance;
    body.userData = { ...data, key, angle: Math.random() * Math.PI * 2 };
    
    // Add rings for Saturn
    if (data.hasRings) {
        const ringGeometry = new THREE.RingGeometry(data.radius * 1.4, data.radius * 2.2, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: data.color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
        });
        const rings = new THREE.Mesh(ringGeometry, ringMaterial);
        rings.rotation.x = Math.PI / 2;
        body.add(rings);
    }
    
    scene.add(body);
    celestialBodies[key] = body;
}

function createOrbit(key, data) {
    const points = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(
            Math.cos(angle) * data.distance,
            0,
            Math.sin(angle) * data.distance
        ));
    }
    
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: 0x4361ee,
        transparent: true,
        opacity: 0.3
    });
    
    const orbit = new THREE.Line(geometry, material);
    scene.add(orbit);
    orbits[key] = orbit;
}

function animateSolarSystem() {
    animationId = requestAnimationFrame(animateSolarSystem);
    
    // Rotate planets around the sun
    Object.keys(celestialBodies).forEach(key => {
        const body = celestialBodies[key];
        const data = body.userData;
        
        if (data.type === 'planet') {
            data.angle += data.speed;
            body.position.x = Math.cos(data.angle) * data.distance;
            body.position.z = Math.sin(data.angle) * data.distance;
        } else if (data.type === 'moon' && celestialBodies[data.parent]) {
            const parent = celestialBodies[data.parent];
            data.angle += data.speed;
            body.position.x = parent.position.x + Math.cos(data.angle) * data.distance;
            body.position.z = parent.position.z + Math.sin(data.angle) * data.distance;
        }
        
        // Self-rotation
        body.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
}

// ==================== SIMULATION CANVAS ====================
function initSimulationCanvas() {
    const canvas = document.getElementById('simulationCanvas');
    
    const simScene = new THREE.Scene();
    simScene.background = new THREE.Color(0x0a0a0f);
    
    const simCamera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        10000
    );
    simCamera.position.set(0, 150, 300);
    simCamera.lookAt(0, 0, 0);
    
    const simRenderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    simRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    
    // Add lighting
    const simLight = new THREE.PointLight(0xffffff, 2, 500);
    simLight.position.set(0, 0, 0);
    simScene.add(simLight);
    
    // Store simulation objects
    window.simulationObjects = {
        scene: simScene,
        camera: simCamera,
        renderer: simRenderer,
        bodies: {},
        trails: []
    };
    
    // Create initial display
    createSimulationDisplay();
    
    // Animation loop
    animateSimulation();
}

function createSimulationDisplay() {
    const { scene } = window.simulationObjects;
    
    // Create sun at center
    const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6b35,
        emissive: 0xff6b35
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    window.simulationObjects.bodies.sun = sun;
}

function animateSimulation() {
    requestAnimationFrame(animateSimulation);
    
    const { renderer, scene, camera, bodies } = window.simulationObjects;
    
    // Rotate sun
    if (bodies.sun) {
        bodies.sun.rotation.y += 0.005;
    }
    
    // Update trails
    if (simulationRunning && !simulationPaused) {
        updateSimulation();
    }
    
    renderer.render(scene, camera);
}

// ==================== SIMULATION CONTROLS ====================
function updateSimulationParams() {
    const simType = document.getElementById('simType').value;
    console.log('Simulation type changed:', simType);
}

function startSimulation() {
    const primaryBody = document.getElementById('primaryBody').value;
    const secondaryBody = document.getElementById('secondaryBody').value;
    const timeScale = parseInt(document.getElementById('timeScale').value);
    const duration = parseInt(document.getElementById('simDuration').value);
    const accuracy = document.getElementById('accuracyLevel').value;
    const showTrails = document.getElementById('showTrails').checked;
    
    console.log('Starting simulation:', {
        primaryBody,
        secondaryBody,
        timeScale,
        duration,
        accuracy,
        showTrails
    });
    
    // Update status
    document.querySelector('.status-text').textContent = 'Running';
    document.querySelector('.status-indicator').style.background = '#06d6a0';
    
    simulationRunning = true;
    simulationPaused = false;
    simulationTime = 0;
    simulationData = [];
    
    // Create simulation bodies
    setupSimulationBodies(primaryBody, secondaryBody);
    
    // Start data collection
    collectSimulationData();
}

function pauseSimulation() {
    simulationPaused = !simulationPaused;
    
    const statusText = document.querySelector('.status-text');
    const indicator = document.querySelector('.status-indicator');
    
    if (simulationPaused) {
        statusText.textContent = 'Paused';
        indicator.style.background = '#ffd166';
    } else {
        statusText.textContent = 'Running';
        indicator.style.background = '#06d6a0';
    }
}

function resetSimulation() {
    simulationRunning = false;
    simulationPaused = false;
    simulationTime = 0;
    simulationData = [];
    
    // Clear trails
    window.simulationObjects.trails.forEach(trail => {
        window.simulationObjects.scene.remove(trail);
    });
    window.simulationObjects.trails = [];
    
    // Reset display
    createSimulationDisplay();
    
    // Update status
    document.querySelector('.status-text').textContent = 'Ready';
    document.querySelector('.status-indicator').style.background = '#06d6a0';
    
    // Reset overlays
    document.getElementById('timeElapsed').textContent = '0 days';
    document.getElementById('currentDistance').textContent = '0 AU';
    document.getElementById('currentVelocity').textContent = '0 km/s';
}

function setupSimulationBodies(primary, secondary) {
    const { scene, bodies } = window.simulationObjects;
    
    // Remove existing bodies except sun
    Object.keys(bodies).forEach(key => {
        if (key !== 'sun') {
            scene.remove(bodies[key]);
        }
    });
    
    // Add primary body
    if (primary !== 'sun' && celestialData[primary]) {
        const data = celestialData[primary];
        const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: data.color });
        const body = new THREE.Mesh(geometry, material);
        body.position.x = data.distance;
        body.userData = { ...data, angle: 0 };
        scene.add(body);
        bodies[primary] = body;
    }
    
    // Add secondary body
    if (secondary !== 'none' && celestialData[secondary]) {
        const data = celestialData[secondary];
        const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({ color: data.color });
        const body = new THREE.Mesh(geometry, material);
        body.position.x = data.distance;
        body.userData = { ...data, angle: 0 };
        scene.add(body);
        bodies[secondary] = body;
    }
}

function updateSimulation() {
    const timeScale = parseInt(document.getElementById('timeScale').value);
    const { bodies } = window.simulationObjects;
    
    simulationTime += timeScale * 0.001;
    
    // Update body positions
    Object.keys(bodies).forEach(key => {
        if (key !== 'sun') {
            const body = bodies[key];
            const data = body.userData;
            
            data.angle += data.speed * timeScale * 0.01;
            body.position.x = Math.cos(data.angle) * data.distance;
            body.position.z = Math.sin(data.angle) * data.distance;
            
            // Add trail point
            if (document.getElementById('showTrails').checked) {
                addTrailPoint(body, data);
            }
        }
    });
    
    // Update overlay
    document.getElementById('timeElapsed').textContent = `${Math.floor(simulationTime * 100)} days`;
    
    if (bodies.earth) {
        const distance = bodies.earth.position.length() / 100;
        const velocity = (2 * Math.PI * bodies.earth.position.length() / 365).toFixed(2);
        document.getElementById('currentDistance').textContent = `${distance.toFixed(2)} AU`;
        document.getElementById('currentVelocity').textContent = `${velocity} km/s`;
    }
}

function addTrailPoint(body, data) {
    const { scene, trails } = window.simulationObjects;
    
    const geometry = new THREE.SphereGeometry(0.5, 8, 8);
    const material = new THREE.MeshBasicMaterial({
        color: body.userData.color,
        transparent: true,
        opacity: 0.6
    });
    const point = new THREE.Mesh(geometry, material);
    point.position.copy(body.position);
    scene.add(point);
    trails.push({ mesh: point, age: 0 });
    
    // Limit trail length
    if (trails.length > 500) {
        const oldTrail = trails.shift();
        scene.remove(oldTrail.mesh);
    }
}

function collectSimulationData() {
    if (!simulationRunning || simulationPaused) return;
    
    const { bodies } = window.simulationObjects;
    
    if (bodies.earth || Object.keys(bodies).length > 1) {
        const bodyKey = bodies.earth ? 'earth' : Object.keys(bodies).find(k => k !== 'sun');
        const body = bodies[bodyKey];
        
        if (body) {
            const data = {
                time: simulationTime * 100,
                distance: body.position.length() / 100,
                velocity: (2 * Math.PI * body.position.length() / 365).toFixed(2),
                position: {
                    x: body.position.x.toFixed(2),
                    y: body.position.y.toFixed(2),
                    z: body.position.z.toFixed(2)
                },
                energy: (body.position.length() * 1000).toFixed(2)
            };
            
            simulationData.push(data);
            
            // Update charts
            updateCharts(simulationData);
            
            // Update table
            updateResultsTable(simulationData);
        }
    }
    
    setTimeout(collectSimulationData, 100);
}

// ==================== BODY LIST & INFO ====================
function populateBodyList() {
    const bodyList = document.getElementById('bodyList');
    
    Object.keys(celestialData).forEach(key => {
        const data = celestialData[key];
        const item = document.createElement('div');
        item.className = 'body-item';
        item.innerHTML = `
            <div class="body-icon" style="background: ${data.color}"></div>
            <span>${data.name}</span>
        `;
        item.onclick = () => selectBody(key);
        bodyList.appendChild(item);
    });
}

function selectBody(key) {
    const data = celestialData[key];
    const infoContent = document.getElementById('infoContent');
    const infoTitle = document.getElementById('infoTitle');
    
    // Update active state
    document.querySelectorAll('.body-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Build info HTML
    let infoHTML = `
        <p><strong>Type:</strong> ${data.type.charAt(0).toUpperCase() + data.type.slice(1)}</p>
        <p>${data.description}</p>
        <p><strong>Mass:</strong> ${data.mass || 'N/A'}</p>
    `;
    
    if (data.temperature) {
        infoHTML += `<p><strong>Temperature:</strong> ${data.temperature}</p>`;
    }
    
    if (data.dayLength) {
        infoHTML += `<p><strong>Day Length:</strong> ${data.dayLength}</p>`;
    }
    
    if (data.yearLength) {
        infoHTML += `<p><strong>Year Length:</strong> ${data.yearLength}</p>`;
    }
    
    if (data.moons !== undefined) {
        infoHTML += `<p><strong>Moons:</strong> ${data.moons}</p>`;
    }
    
    if (data.distanceFromEarth) {
        infoHTML += `<p><strong>Distance from Earth:</strong> ${data.distanceFromEarth}</p>`;
    }
    
    infoTitle.textContent = data.name;
    infoContent.innerHTML = infoHTML;
    
    // Focus camera on selected body
    focusOnBody(key);
}

function focusOnBody(key) {
    const body = celestialBodies[key];
    if (body) {
        const targetPosition = body.position.clone();
        targetPosition.y += 50;
        
        // Smooth camera transition
        const startPos = camera.position.clone();
        const startTime = Date.now();
        const duration = 1000;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            camera.position.lerpVectors(startPos, targetPosition, progress);
            camera.lookAt(body.position);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        animate();
    }
}

function closeBodyInfo() {
    document.getElementById('infoTitle').textContent = 'Select a celestial body';
    document.getElementById('infoContent').innerHTML = '<p>Click on any celestial body to view detailed information</p>';
    document.querySelectorAll('.body-item').forEach(item => {
        item.classList.remove('active');
    });
}

// ==================== CANVAS CONTROLS ====================
function zoomIn() {
    camera.position.multiplyScalar(0.8);
}

function zoomOut() {
    camera.position.multiplyScalar(1.2);
}

function resetView() {
    camera.position.set(0, 200, 400);
    camera.lookAt(0, 0, 0);
}

function toggleOrbits() {
    Object.values(orbits).forEach(orbit => {
        orbit.visible = !orbit.visible;
    });
}

function toggleLabels() {
    // Label toggle functionality
    console.log('Toggle labels');
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// ==================== CHARTS ====================
function initCharts() {
    // Distance Chart
    const distanceCtx = document.getElementById('distanceChart').getContext('2d');
    chartInstances.distance = new Chart(distanceCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Distance (AU)',
                data: [],
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#9ca3af' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
    
    // Velocity Chart
    const velocityCtx = document.getElementById('velocityChart').getContext('2d');
    chartInstances.velocity = new Chart(velocityCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Velocity (km/s)',
                data: [],
                borderColor: '#06d6a0',
                backgroundColor: 'rgba(6, 214, 160, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#9ca3af' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
    
    // Orbit Chart
    const orbitCtx = document.getElementById('orbitChart').getContext('2d');
    chartInstances.orbit = new Chart(orbitCtx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Orbital Path',
                data: [],
                backgroundColor: '#4361ee'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#9ca3af' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
    
    // Period Chart
    const periodCtx = document.getElementById('periodChart').getContext('2d');
    chartInstances.period = new Chart(periodCtx, {
        type: 'bar',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3'],
            datasets: [{
                label: 'Orbital Period',
                data: [365, 365, 365],
                backgroundColor: '#7b2cbf'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#9ca3af' }
                }
            },
            scales: {
                y: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                x: {
                    ticks: { color: '#9ca3af' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

function updateCharts(data) {
    if (data.length === 0) return;
    
    // Update distance chart
    chartInstances.distance.data.labels = data.map(d => Math.floor(d.time));
    chartInstances.distance.data.datasets[0].data = data.map(d => d.distance);
    chartInstances.distance.update('none');
    
    // Update velocity chart
    chartInstances.velocity.data.labels = data.map(d => Math.floor(d.time));
    chartInstances.velocity.data.datasets[0].data = data.map(d => d.velocity);
    chartInstances.velocity.update('none');
    
    // Update orbit chart
    chartInstances.orbit.data.datasets[0].data = data.map(d => ({
        x: parseFloat(d.position.x),
        y: parseFloat(d.position.z)
    }));
    chartInstances.orbit.update('none');
}

function updateResultsTable(data) {
    const tbody = document.getElementById('resultsTableBody');
    
    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Run a simulation to see results</td></tr>';
        return;
    }
    
    // Show last 10 data points
    const recentData = data.slice(-10);
    tbody.innerHTML = recentData.map(d => `
        <tr>
            <td>${Math.floor(d.time)}</td>
            <td>${d.distance.toFixed(4)}</td>
            <td>${d.velocity}</td>
            <td>(${d.position.x}, ${d.position.y}, ${d.position.z})</td>
            <td>${d.energy}</td>
        </tr>
    `).join('');
}

// ==================== EXPORT FUNCTIONS ====================
function exportResults() {
    exportData('csv');
}

function exportData(format) {
    if (simulationData.length === 0) {
        alert('No simulation data to export. Run a simulation first!');
        return;
    }
    
    if (format === 'csv') {
        const headers = ['Time (days)', 'Distance (AU)', 'Velocity (km/s)', 'Position X', 'Position Y', 'Position Z', 'Energy (J)'];
        const rows = simulationData.map(d => [
            d.time,
            d.distance,
            d.velocity,
            d.position.x,
            d.position.y,
            d.position.z,
            d.energy
        ]);
        
        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        downloadFile(csv, 'simulation-data.csv', 'text/csv');
    } else if (format === 'json') {
        const json = JSON.stringify(simulationData, null, 2);
        downloadFile(json, 'simulation-data.json', 'application/json');
    } else if (format === 'png') {
        alert('Chart export coming soon!');
    }
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function clearResults() {
    simulationData = [];
    
    // Clear charts
    Object.values(chartInstances).forEach(chart => {
        chart.data.labels = [];
        chart.data.datasets.forEach(dataset => {
            dataset.data = [];
        });
        chart.update();
    });
    
    // Clear table
    document.getElementById('resultsTableBody').innerHTML = `
        <tr>
            <td colspan="5" class="empty-state">Run a simulation to see results</td>
        </tr>
    `;
}

// ==================== HELP FUNCTIONS ====================
function showHelp() {
    alert(`
🌌 COSMIC VISUALIZATION - Help Guide

1. SOLAR SYSTEM VIEW
   - Click on any planet to view details
   - Use zoom controls to get closer/farther
   - Toggle orbits to see orbital paths

2. SIMULATION
   - Select primary and secondary bodies
   - Adjust time scale for faster/slower simulation
   - Click "Start Simulation" to begin
   - Export results as CSV or JSON

3. RESULTS
   - View real-time charts and data
   - Export simulation data
   - Analyze orbital mechanics

For more information, visit the About section.
    `);
}

function showAbout() {
    alert(`
🌌 ABOUT COSMIC VISUALIZATION

This interactive 3D solar system simulator allows you to:
- Explore all major celestial bodies in our solar system
- Run realistic orbital mechanics simulations
- Visualize gravitational interactions
- Analyze simulation data with charts

Built with Three.js for 3D rendering and Chart.js for data visualization.

Perfect for education, research, and space enthusiasts!
    `);
}

function showCredits() {
    alert(`
👨‍💻 CREDITS

Developed by: Thando Hlomuka
Built with: Three.js, Chart.js
Data Source: NASA Public Data

© 2026 Cosmic Visualization
Built for space exploration and education
    `);
}

console.log('🚀 Ready to explore the cosmos!');
