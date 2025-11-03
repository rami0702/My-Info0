// Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000); // 2 seconds loading time
});

// Theme Toggle
const body = document.body;
let themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
}

// Theme toggle functionality - attach when DOM is ready
function initThemeToggle() {
    themeToggle = themeToggle || document.getElementById('themeToggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        // Save theme preference
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);

        // Add rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 400);
    });
}

// Statistics Count Up Animation with Easing
function animateCountUp(element, target, duration = 2500) {
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    const startTime = performance.now();
    
    // Easing function for smooth animation
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(easedProgress * target);
        
        element.textContent = prefix + current + suffix;
        
        // Add pulse effect during counting
        element.style.transform = `scale(${1 + (1 - progress) * 0.1})`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.style.transform = 'scale(1)';
        }
    }
    
    requestAnimationFrame(update);
}

// Track if stats have been animated and stats observer
let statsAnimated = false;
let statsObserver = null;

// Function to start stats animation
function startStatsAnimation() {
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
        const statNumbers = statsSection.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCountUp(stat, target);
        });
        statsAnimated = true;
    }
}

// Initialize Intersection Observer for Statistics
function initStatsObserver() {
    statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                startStatsAnimation();
            }
        });
    }, { threshold: 0.5 });
}

// Observe stats section when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initStatsObserver();
    const statsSection = document.getElementById('stats-section');
    if (statsSection && statsObserver) {
        statsObserver.observe(statsSection);
    }
});

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

// Make setLanguage globally available
window.setLanguage = setLanguage;

// Initialize current language from localStorage or default to 'en'
let currentLang = localStorage.getItem('preferredLanguage') || 'en';

// Get HTML element for direction changes
const htmlElement = document.documentElement;

function setLanguage(lang) {
    if (!lang) {
        console.error('No language provided to setLanguage');
        return;
    }
    currentLang = lang;
    window.currentLang = lang; // Make it globally available
    localStorage.setItem('preferredLanguage', lang);
    
    // Set HTML dir attribute for RTL languages
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update current language button text
    const langNames = {
        'ar': 'عربي',
        'en': 'English',
        'de': 'Deutsch'
    };
    const currentLangBtn = document.querySelector('.lang-text');
    if (currentLangBtn) {
        currentLangBtn.textContent = langNames[lang];
    }
    
    // Update all text content based on language
    const texts = window[lang];
    if (!texts) {
        console.warn(`Language pack for '${lang}' not found.`);
        return;
    }

    // Helper to set element text or value safely
    const applyText = (el, value) => {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (el.type === 'submit' || el.type === 'button') el.value = value;
            else el.placeholder = value;
        } else if (el.tagName === 'IMG') {
            // set alt and title if provided
            if (el.hasAttribute('data-i18n')) el.alt = value;
            else el.title = value;
        } else {
            // Check if this element has a child span with data-i18n
            const textSpan = el.querySelector('span[data-i18n]');
            if (textSpan) {
                // Update only the span's text content
                textSpan.textContent = value;
            } else {
                // For elements without child spans, use innerHTML to preserve icons
                const icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = icon.outerHTML + ' ' + value;
                } else {
                    el.textContent = value;
                }
            }
        }
    };

    // Apply to elements with data-i18n (يشمل عناصر المودال الخاصة بـ Image Compressor)
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key && (key in texts)) {
            applyText(element, texts[key]);
        }
    });

    // تحديث ترجمة زر وضغط الصورة داخل المودال إذا كان موجوداً
    var imgCompressorModal = document.getElementById('imgCompressorModal');
    if (imgCompressorModal) {
        var modalTitle = imgCompressorModal.querySelector('.demo-modal-title[data-i18n="imgCompressorTitle"]');
        var modalDesc = imgCompressorModal.querySelector('.img-compressor-desc[data-i18n="imgCompressorDesc"]');
        var compressBtn = imgCompressorModal.querySelector('.img-btn span[data-i18n="imgCompressorCompress"]');
        if (modalTitle && texts.imgCompressorTitle) modalTitle.textContent = texts.imgCompressorTitle;
        if (modalDesc && texts.imgCompressorDesc) modalDesc.textContent = texts.imgCompressorDesc;
        if (compressBtn && texts.imgCompressorCompress) compressBtn.textContent = texts.imgCompressorCompress;
    }

    // Support translating attributes via data-i18n-attr="attrName:key"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
        // multiple mappings separated by semicolons: attr:langKey;attr2:langKey2
        const mappings = el.getAttribute('data-i18n-attr').split(';').map(s => s.trim()).filter(Boolean);
        mappings.forEach(map => {
            const [attr, k] = map.split(':').map(s => s.trim());
            if (attr && k && (k in texts)) {
                el.setAttribute(attr, texts[k]);
            }
        });
    });

    // Update placeholders on inputs with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key in texts) el.placeholder = texts[key];
    });

    // Update images alt/title by data-i18n-alt or data-i18n-title
    document.querySelectorAll('img[data-i18n-alt], img[data-i18n-title]').forEach(img => {
        const altKey = img.getAttribute('data-i18n-alt');
        const titleKey = img.getAttribute('data-i18n-title');
        if (altKey && altKey in texts) img.alt = texts[altKey];
        if (titleKey && titleKey in texts) img.title = texts[titleKey];
    });

    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Reset and re-animate statistics if they were already animated
    if (statsAnimated) {
        statsAnimated = false;
        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                startStatsAnimation();
            }
        }
    }
}

// Initialize language immediately
setLanguage(currentLang);

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
// دوال فتح وإغلاق نافذة العرض التجريبي الخاصة بـ RAM CYBER DEFENSE Elite
// نافذة العرض التفاعلي القديمة الخاصة بـ RAM CYBER DEFENSE Elite
function showRamDemoModal() {
    const modal = document.getElementById('ramDemoModal');
    const overlay = document.querySelector('.demo-overlay');
    const resultsPanel = modal.querySelector('.demo-results');
    const closeBtn = modal.querySelector('.close-demo');
    let scanInterval;
    let filesScanned = 0;
    let threatsFound = 0;

    function updateStats() {
        modal.querySelector('.files-count').textContent = filesScanned;
        modal.querySelector('.threats-count').textContent = threatsFound;
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
        modal.querySelector('.status-text').textContent = 'Scanning';
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
                modal.querySelector('.status-text').textContent = 'Ready';
            }
        }, 1000);
    }

    // Event Listeners
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        clearInterval(scanInterval);
    };
    modal.querySelector('.quick-scan').onclick = function() { simulateScan('quick'); };
    modal.querySelector('.deep-analysis').onclick = function() { simulateScan('deep'); };
    modal.querySelectorAll('.demo-button').forEach(btn => {
        if (!btn.classList.contains('quick-scan') && !btn.classList.contains('deep-analysis')) {
            btn.onclick = function() {
                appendLog(currentLang === 'ar' ? 'هذه الميزة متوفرة فقط في النسخة الكاملة' : 'This feature is only available in the full version', '#ffff00');
            };
        }
    });
    // Show modal
    modal.style.display = 'block';
    overlay.style.display = 'block';
    resultsPanel.innerHTML = '';
    appendLog('CYBERSHIELD ELITE v4.0 initialized...', '#00ffff');
    appendLog('System ready for scan.', '#00ffff');
    updateStats();
    modal.querySelector('.status-text').textContent = 'Ready';
}
function closeRamDemoModal() {
    var modal = document.getElementById('ramDemoModal');
    var overlay = document.querySelector('.demo-overlay');
    if (modal && overlay) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
}
// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    setLanguage(currentLang);
    // Initialize theme toggle (attach handlers now that DOM exists)
    try { initThemeToggle(); } catch (err) { /* ignore if not defined */ }
    // Initialize globe with safe fallback.
    try {
        if (typeof Globe === 'function') {
            initGlobe();
        } else {
            // Globe library not available, use basic three.js fallback
            console.warn('Globe() not available, falling back to basic globe.');
            initGlobeBasic();
        }
    } catch (err) {
        console.warn('initGlobe failed, falling back to basic globe:', err);
        try {
            initGlobeBasic();
        } catch (err2) {
            console.error('Both globe initializers failed:', err2);
        }
    }
    
    // Setup smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    // Top-left nav: click to smooth-scroll and focus globe if possible
    const topNavLinks = document.querySelectorAll('#topNav a');
    topNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && document.querySelector(href)) {
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }

            // If globe is initialized and supports pointOfView, fly to given lat/lng
            const lat = parseFloat(this.getAttribute('data-globe-lat'));
            const lng = parseFloat(this.getAttribute('data-globe-lng'));
            try {
                if (typeof globe !== 'undefined' && typeof globe.pointOfView === 'function' && !isNaN(lat) && !isNaN(lng)) {
                    // use a short animation to move the globe camera
                    globe.pointOfView({ lat, lng, altitude: 1.5 }, 1000);
                }
            } catch (err) {
                // ignore if globe API isn't available yet
            }
        });
    });

    // Highlight active section in top-left nav on scroll
    const sectionsForNav = document.querySelectorAll('section, header');
    const setActiveNav = () => {
        let currentId = null;
        sectionsForNav.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.2) {
                currentId = sec.id || 'about';
            }
        });
        topNavLinks.forEach(a => {
            const href = a.getAttribute('href');
            a.classList.toggle('active', href === `#${currentId}`);
        });
    };
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
    
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

    // Add a small footer inside each project modal (if present)
    try {
        const modalIds = ['qrModal','imgCompressorModal','passwordGeneratorModal','webVulnScannerModal','gameOptimizerModal','memoryOptimizerModal','ramDemoModal'];
        modalIds.forEach(id => {
            const modal = document.getElementById(id);
            if (!modal) return;
            // don't add if a modal-footer already exists or the GitHub link is already present
            if (modal.querySelector('.modal-footer') || modal.querySelector('a[href*="github.com/rami0702"]')) return; // already added
            const footer = document.createElement('div');
            footer.className = 'modal-footer';
            footer.style.textAlign = 'center';
            footer.style.marginTop = '12px';
            footer.style.color = 'var(--accent)';
            const year = new Date().getFullYear();
            footer.innerHTML = '&copy; RAM ' + year + ' | <a href="https://github.com/rami0702" target="_blank">GitHub</a>';
            // Append to modal content area (prefer inside modal body if exists)
            const body = modal.querySelector('.img-modal-body') || modal.querySelector('.demo-modal') || modal;
            body.appendChild(footer);
        });
    } catch (err) {
        // ignore
    }
});

