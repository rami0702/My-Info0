// Initialize Globe
function initGlobeBasic() {
    const container = document.getElementById('globeContainer');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Earth
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const texture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_atmos_2048.jpg');
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 15;

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.0015;
        renderer.render(scene, camera);
    }
    animate();
}

// Language Management
let currentLang = localStorage.getItem('preferredLanguage') || 'ar';
const htmlElement = document.documentElement;

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    
    // Set HTML dir attribute for RTL languages
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all text content based on language
    const texts = window[lang];
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (texts[key]) {
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = texts[key];
            } else {
                element.textContent = texts[key];
            }
        }
    });

    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// Globe Animation Configuration
function initGlobe() {
    const container = document.getElementById('globeContainer');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Globe configuration
    const globe = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
        .showAtmosphere(true)
        .atmosphereColor('rgba(110, 69, 226, 0.2)')
        .atmosphereAltitude(0.25)
        .width(window.innerWidth)
        .height(window.innerHeight)
        .backgroundColor('rgba(0,0,0,0)')
        .enablePointerInteraction(false);

    globe(container);

    // Add animated arcs
    const N = 20;
    const arcsData = [...Array(N).keys()].map(() => ({
        startLat: (Math.random() - 0.5) * 180,
        startLng: (Math.random() - 0.5) * 360,
        endLat: (Math.random() - 0.5) * 180,
        endLng: (Math.random() - 0.5) * 360,
        color: [
            ['rgba(110, 69, 226, 0.6)', 'rgba(110, 69, 226, 0.3)'],
            ['rgba(136, 211, 206, 0.6)', 'rgba(136, 211, 206, 0.3)'],
            ['rgba(255, 126, 95, 0.6)', 'rgba(255, 126, 95, 0.3)']
        ][Math.floor(Math.random() * 3)]
    }));

    globe.arcsData(arcsData)
        .arcColor('color')
        .arcDashLength(0.4)
        .arcDashGap(1)
        .arcDashAnimateTime(2000)
        .arcStroke(1.5);

    // Add glowing dots for cities
    const cities = [
        { city: 'Berlin', lat: 52.52, lng: 13.405, size: 0.1 },
        { city: 'New York', lat: 40.7128, lng: -74.006, size: 0.15 },
        { city: 'Tokyo', lat: 35.6762, lng: 139.6503, size: 0.15 },
        { city: 'Dubai', lat: 25.2048, lng: 55.2708, size: 0.1 },
        { city: 'Sydney', lat: -33.8688, lng: 151.2093, size: 0.1 }
    ];

    globe.pointsData(cities)
        .pointColor(() => 'rgba(255, 126, 95, 0.8)')
        .pointAltitude(0.01)
        .pointRadius('size')
        .pointsMerge(true);

    // Auto-rotation
    globe.autoRotate(true)
        .autoRotateSpeed(0.3)
        .autoRotateLat(-10);

    // Handle window resize
    window.addEventListener('resize', () => {
        globe.width(window.innerWidth)
             .height(window.innerHeight);
    });
}

// Demo function
function showDemo() {
    const modal = document.querySelector('.demo-modal');
    const overlay = document.querySelector('.demo-overlay');
    const resultsPanel = document.querySelector('.demo-results');
    const closeBtn = document.querySelector('.close-demo');
    
    let scanInterval;
    let filesScanned = 0;
    let threatsFound = 0;

    function updateStats() {
        document.querySelector('.files-count').textContent = filesScanned;
        document.querySelector('.threats-count').textContent = threatsFound;
    }

    function appendLog(message, color = '#00ff00') {
        const timestamp = new Date().toLocaleTimeString();
        resultsPanel.innerHTML += `[${timestamp}] <span style="color: ${color}">${message}</span>\n`;
        resultsPanel.scrollTop = resultsPanel.scrollHeight;
    }

    function simulateScan(type) {
        clearInterval(scanInterval);
        filesScanned = 0;
        threatsFound = 0;
        resultsPanel.innerHTML = '';
        
        const scanMessages = {
            'quick': {
                start: currentLang === 'ar' ? 'بدء الفحص السريع...' : 'Starting Quick Scan...',
                progress: currentLang === 'ar' ? 'فحص الملفات...' : 'Scanning files...',
                complete: currentLang === 'ar' ? 'اكتمل الفحص السريع' : 'Quick Scan Complete'
            },
            'deep': {
                start: currentLang === 'ar' ? 'بدء التحليل العميق...' : 'Starting Deep Analysis...',
                progress: currentLang === 'ar' ? 'تحليل النظام...' : 'Analyzing system...',
                complete: currentLang === 'ar' ? 'اكتمل التحليل العميق' : 'Deep Analysis Complete'
            }
        };

        appendLog(scanMessages[type].start);
        document.querySelector('.status-text').textContent = 'Scanning';

        scanInterval = setInterval(() => {
            filesScanned += Math.floor(Math.random() * 100);
            if (Math.random() > 0.8) {
                threatsFound++;
                appendLog('⚠️ Potential threat detected!', '#ff0000');
            }
            appendLog(scanMessages[type].progress);
            updateStats();

            if (filesScanned >= 1000) {
                clearInterval(scanInterval);
                appendLog(scanMessages[type].complete, '#00ffff');
                document.querySelector('.status-text').textContent = 'Ready';
            }
        }, 1000);
    }

    // Event Listeners
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        clearInterval(scanInterval);
    });

    document.querySelector('.quick-scan').addEventListener('click', () => simulateScan('quick'));
    document.querySelector('.deep-analysis').addEventListener('click', () => simulateScan('deep'));
    
    document.querySelectorAll('.demo-button').forEach(btn => {
        if (!btn.classList.contains('quick-scan') && !btn.classList.contains('deep-analysis')) {
            btn.addEventListener('click', () => {
                appendLog(currentLang === 'ar' ? 
                    'هذه الميزة متوفرة فقط في النسخة الكاملة' : 
                    'This feature is only available in the full version', '#ffff00');
            });
        }
    });

    // Show modal
    modal.style.display = 'block';
    overlay.style.display = 'block';
    appendLog('CYBERSHIELD ELITE v4.0 initialized...', '#00ffff');
    appendLog('System ready for scan.', '#00ffff');
}

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    setLanguage(currentLang);
    
    // Initialize globe
    initGlobe();
    
    // Setup smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Setup scroll animations
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.animation = `fadeInUp 0.8s forwards`;
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});