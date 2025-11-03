const en = {
    imgCompressorTitle: "Image Compressor & Optimizer",
    imgCompressorDesc: "A tool to compress and optimize images directly in the browser. Supports drag & drop, shows size before and after compression, and allows downloading the compressed image.",
    imgCompressorTry: "Live Demo",
    imgCompressorCode: "Code & Library",
    imgCompressorCompress: "Compress Image",
    // New expertise section translations
    expertiseGamer: "Veteran Gamer",
    expertiseGamerDesc: "Passionate about gaming technology and performance optimization",
    expertiseServer: "Server Dev",
    expertiseServerDesc: "Building and optimizing high-performance server infrastructure",
    expertiseCode: "Code Crafter",
    expertiseCodeDesc: "Crafting elegant solutions for complex technical challenges",
    expertiseNetwork: "Network Architect",
    expertiseNetworkDesc: "Designing robust and secure network infrastructures",
    expertiseAutomation: "Automation Expert",
    expertiseAutomationDesc: "Optimizing gameplay and server performance through automation",
    expertiseData: "Data Driven",
    expertiseDataDesc: "Using data analytics for performance optimization and bug hunting",

    imgCompressorTitle: "Image Compressor & Optimizer",
    imgCompressorDesc: "A tool to compress and optimize images directly in the browser. Supports drag & drop, shows size before and after compression, and allows downloading the compressed image.",
    imgCompressorTry: "Live Demo",
    imgCompressorCode: "Code & Library",
    imgCompressorCompress: "Compress Image",
    title: "RAM Security",
    subtitle: "Creative Developer & Digital Designer",
    contactMe: "Contact Me",
    scrollDown: "Scroll Down",

    // Navigation
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",

    // About Section
    aboutTitle: "About Me",
    aboutText1: "I am a passionate developer focused on creating exceptional digital experiences. With years of experience in various technologies, I combine technical expertise with creative design.",
    aboutText2: "My journey began with simple scripts and has evolved into complex applications, interactive websites, and immersive games. I love solving problems and creating beautiful, functional solutions.",
    aboutText3: "In addition, I have continuously developed my technical programming skills and immersed myself in several programming languages. I have challenged myself by implementing complex projects that would normally require a large team in a company. One of my most significant projects was the development of a security system to protect against data theft via QR codes. This system detects and prevents unauthorized access to smartphone data and thus actively contributes to protecting user privacy.",
    aboutText4: "I have been working intensively with computers for over 15 years and have extensive experience in the field of hardware. Furthermore, I have developed my own remote access server, similar to Remote Desktop, which I have extended with applications I programmed myself. These allow me to access devices and systems on my private network securely and efficiently.",

    // Skills Section
    // Skills Section
    skillsTitle: "Skills & Technologies",
    frontend: "Frontend",
    backend: "Backend",
    gameDev: "Game Development",
    tools: "Tools & Others",

    // Projects Section
    projectsTitle: "My Projects",
    projectsIntro: "Here is a selection of my recent works. Each project represents a unique challenge and showcases my abilities in different areas.",

    // Security Project
    securityProjectTitle: "Advanced Security Tool",
    securityProjectDesc: "Advanced tool for detecting and removing security threats. Focuses on the principle that security is a collective responsibility and awareness is the best protection.",
    viewDemo: "View Demo",
    viewCode: "View Code",
    // QR Project
    qrProjectTitle: "QR Code Generator & Scanner",
    qrProjectDesc: "A professional QR code generator and scanner that works entirely in the browser. Create QR codes for any text or link, and scan codes directly from the camera or image with no setup or registration required.",
    qrTry: "Live Demo",
    qrCodeLib: "Code & Library",

    // Contact Section
    contactTitle: "Contact",
    contactText: "Have an exciting project or want to collaborate? I look forward to hearing from you!",
    sendMessage: "Send Message",

    // Footer
    copyright: "All Rights Reserved",
    allRightsReserved: "All Rights Reserved"
};

// Missing project and UI keys
Object.assign(en, {
    ramSecurityTitle: 'RAM CYBER DEFENSE Elite',
    ramSecurityDesc: 'An advanced security tool with a PowerShell interface for threat detection and removal. Focused on data protection and security awareness.',
    downloadText: 'Download Professional Edition v4.0',
    scriptVersion: 'PowerShell Edition v4.0',
    dashboardTitle: 'Analytics Dashboard',
    dashboardDesc: 'An interactive dashboard for real-time data analysis and visualization.',
    trademarkText: 'RAM™ - All rights reserved | Developed by the RAM team',
    trademarkText_line1: 'RAM™ - All rights reserved',
    trademarkText_line2: 'Developed by the RAM team'
});

// Expose to window so setLanguage can access reliably
window.en = en;
Object.assign(window.en, {
    downloadText: 'Download Pro Edition v4.0',
    scriptVersion: 'PowerShell Edition v4.0',
    dashboardTitle: 'Analytics Dashboard',
    dashboardDesc: 'Interactive dashboard for real-time data analysis and visualization.',
    dashboardImageAlt: 'Dashboard screenshot',
    ramSecurityTitle: 'RAM CYBER DEFENSE Elite',
    ramSecurityDesc: 'Advanced security tool with PowerShell interface for threat detection and removal. Focuses on data protection and security awareness.',
    demoTitle: 'CYBERSHIELD ELITE SECURITY SUITE v4.0 REAL-TIME',
    demo_threats_label: 'Threats Detected:',
    demo_processes_label: 'Active Processes:',
    demo_files_label: 'Files Scanned:',
    demo_status_label: 'Status:',
    statusReady: 'Ready',
    quickScanLabel: '🔍 Quick System Scan',
    deepAnalysisLabel: '🔬 Deep Threat Analysis',
    customHuntLabel: '🎯 Custom Threat Hunt',
    nuclearLabel: '☢️ Nuclear Cleanse',
    guardianLabel: '🛡️ Real-Time Guardian',
    imgResultBefore: 'Size before compression:',
    imgResultAfter: 'Size after compression:',
    imgDownloadBtn: 'Download compressed image',
    imgDropTitle: 'Drag your image here',
    imgDropHint: 'or click to choose from your device',
    imgDropSupport: 'Supports JPG, PNG, and WebP up to 10 MB',
    imgResetBtn: 'Reset',
    imgPreviewHeading: 'Preview',
    imgPreviewPlaceholder: 'No image selected yet',
    imgResultHeading: 'Compression results',
    imgResultPlaceholder: 'Compression stats will appear after processing',
    imgCompressorImageAlt: 'Image Compressor interface preview'
});
// Additional keys added by patch
Object.assign(window.en, {
    skill_html_css: 'HTML5 & CSS3',
    skill_js: 'JavaScript (ES6+)',
    skill_react: 'React.js',
    skill_vue: 'Vue.js',
    skill_responsive: 'Responsive Design',
    skill_node: 'Node.js',
    skill_python: 'Python',
    skill_php: 'PHP',
    skill_mysql_mongo: 'MySQL / MongoDB',
    skill_rest: 'RESTful APIs',
    skill_unity: 'Unity (C#)',
    skill_unreal: 'Unreal Engine',
    skill_lua: 'Lua (Love2D)',
    skill_game_design: 'Game Design',
    skill_3d: '3D Modeling',
    skill_git: 'Git & GitHub',
    skill_docker: 'Docker',
    skill_figma: 'Figma / Adobe XD',
    skill_blender: 'Blender',
    skill_cicd: 'CI/CD Pipelines',
    demoTitle: 'CYBERSHIELD ELITE SECURITY SUITE v4.0 REAL-TIME',
    demo_threats_label: 'Threats Detected:',
    demo_processes_label: 'Active Processes:',
    demo_files_label: 'Files Scanned:',
    demo_status_label: 'Status:',
    statusReady: 'Ready',
    quickScanLabel: 'Quick System Scan',
    deepAnalysisLabel: 'Deep Threat Analysis',
    customHuntLabel: 'Custom Threat Hunt',
    nuclearLabel: 'Nuclear Cleanse',
    guardianLabel: 'Real-Time Guardian',
    projectSecurityNote: '100% Secure - No data leaves your browser',

    // Statistics Section
    stat_commitment_value: '100%',
    stat_commitment_label: 'Commitment to Creativity',
    stat_experience_value: '+15',
    stat_experience_label: 'Years of Experience',
    stat_projects_value: '+150',
    stat_projects_label: 'Completed Projects',

    // Visitor Stats
    total_visitors: 'Total Visitors',
    live_visitors: 'Online Now',

    // Password Generator
    passwordGeneratorTitle: 'Password Generator & Strength Checker',
    passwordGeneratorDesc: 'A secure and advanced password generator that works entirely in the browser. Create strong passwords with customizable options for length and character types, and check the strength of existing passwords.',
    passwordGeneratorTry: 'Live Demo',
    passwordGeneratorCode: 'View Code',
    passwordGeneratorGenerate: 'Generate Password',
    passwordGeneratorCopy: 'Copy',
    passwordGeneratorResult: 'Generated Password',
    passwordGeneratorPlaceholder: 'Click "Generate Password" to start',
    passwordGeneratorOptions: 'Generation Options',
    passwordGeneratorLength: 'Length:',
    passwordGeneratorUppercase: 'Uppercase letters:',
    passwordGeneratorLowercase: 'Lowercase letters:',
    passwordGeneratorNumbers: 'Numbers:',
    passwordGeneratorSymbols: 'Symbols:',
    passwordGeneratorStrengthCheck: 'Password Strength Check',
    passwordGeneratorCheckStrength: 'Check Strength',
    passwordGeneratorEnterPassword: 'Enter a password to check its strength',
    passwordGeneratorCopied: 'Password copied to clipboard',
    passwordGeneratorStrengthVeryWeak: 'Very Weak',
    passwordGeneratorStrengthWeak: 'Weak',
    passwordGeneratorStrengthMedium: 'Medium',
    passwordGeneratorStrengthStrong: 'Strong',
    passwordGeneratorStrengthVeryStrong: 'Very Strong',
    passwordGeneratorStrengthLabel: 'Password Strength:',
    passwordGeneratorEnterPasswordPrompt: 'Please enter a password',
    passwordGeneratorSelectType: 'Please select at least one character type'
});
