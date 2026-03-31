export type Section = 'default' | 'about' | 'projects' | 'skills' | 'experience' | 'contact';

export const cameraPositions: Record<Section, { position: [number, number, number]; target: [number, number, number] }> = {
    default: { position: [0, 1.15, 1.8], target: [0, 0.7, -0.3] },
    about: { position: [0, 1.05, 1.1], target: [0, 0.85, -0.35] },
    projects: { position: [0.6, 1.0, 0.9], target: [0.9, 0.55, 0.3] },
    skills: { position: [1.0, 1.0, 0.2], target: [1.4, 0.55, -0.4] },
    experience: { position: [0, 1.7, 0.3], target: [0, 1.65, -0.55] },
    contact: { position: [-0.4, 1.05, 1.0], target: [-0.7, 0.35, 0.4] },
};

export const portfolioData = {
    about: {
        name: 'Muhammad Fauzan Lubada',
        title: 'Web Developer & ML Engineer',
        bio: 'A dedicated student at Universitas Islam Negeri Sunan Gunung Djati Bandung with a strong passion for Web Development, Data Science, and Machine Learning. BNSP Certified Associate Data Scientist with hands-on experience in web platforms, IoT integration, mobile development, and transforming complex datasets into actionable strategic insights.',
        strengths: [
            'Web Development (Frontend & Backend)',
            'Machine Learning & Deep Learning',
            'IoT & AI Integration',
            'Mobile App Development',
        ],
    },
    projects: [
        {
            title: 'WebDesa (Village Web Platform)',
            description: 'A web-based platform developed as practice work to manage village information systems. Focuses on usability, structured data presentation, and responsive design with frontend interface and integrated backend services for smooth data handling.',
            tech: ['React', 'Node.js', 'MongoDB', 'REST API'],
            github: 'https://github.com/MuhammadFauzanL',
            demo: 'https://desa-web-mxug.vercel.app',
            featured: true,
        },
        {
            title: 'Reminders App (IoT Health Platform)',
            description: 'A web application for health monitoring through IoT integration. Provides reminders and displays sensor-based data in a structured, user-friendly dashboard with UI implementation, API integration, and real-time data visualization.',
            tech: ['Laravel', 'Supabase', 'IoT', 'REST API'],
            github: 'https://github.com/MuhammadFauzanL',
            demo: 'https://reminders-app-one.vercel.app/',
            featured: false,
        },
        {
            title: 'AquaGuard IoT System',
            description: 'Smart hydration monitoring device integrated with a web platform. Collects temperature, humidity, and weight data from sensors, sends it to a Flask API, stores in MongoDB Atlas, and visualizes via a real-time dashboard.',
            tech: ['Python', 'Flask', 'MongoDB', 'Next.js'],
            github: 'https://github.com/MuhammadFauzanL',
            demo: '#',
            featured: false,
        },
        {
            title: 'Islamic Note App (Mobile)',
            description: 'A mobile application with prayer schedules, Islamic content (duas, hadith, articles), bookmarking, and a simple chatbot. Designed and built as both UI/UX designer and backend developer. Successfully deployed to Play Store.',
            tech: ['Mobile Dev', 'UI/UX Design', 'Backend API', 'Play Store'],
            github: 'https://github.com/MuhammadFauzanL',
            demo: 'https://play.google.com/store/apps/details?id=com.informatika.islamicnote',
            featured: false,
        },
    ],
    skills: {
        // Web Development — Priority
        frontend: [
            { name: 'HTML & CSS (Tailwind, Bootstrap)', level: 88 },
            { name: 'JavaScript & TypeScript', level: 75 },
            { name: 'PHP (Laravel)', level: 75 },
            { name: 'Python (Flask & REST API)', level: 78 },
            { name: 'UI/UX Design (Figma)', level: 72 },
        ],
        // Mobile Development
        backend: [
            { name: 'MySQL & SQL Database Design', level: 76 },
            { name: 'PostgreSQL & PLpgSQL', level: 72 },
            { name: 'Kotlin (Android Development)', level: 68 },
            { name: 'Dart (Flutter)', level: 65 },
        ],
        // Data Science, AI & IoT
        tools: [
            { name: 'Data Analysis & Visualization', level: 80 },
            { name: 'Python (Pandas, Data Science)', level: 82 },
            { name: 'Machine Learning & AI', level: 72 },
            { name: 'Internet of Things (IoT)', level: 74 },
            { name: 'Jupyter Notebook & RapidMiner', level: 78 },
        ],
        soft: ['Problem Solving', 'UI/UX Thinking', 'Teamwork & Collaboration', 'Continuous Learning', 'Data Storytelling'],
        yearsExperience: 2,
    },
    experience: [
        {
            year: '2026 – Present',
            role: 'AI Engineer Bootcamp Participant',
            company: 'Pijak in collaboration with IBM SkillsBuild',
            achievement: 'Undergoing intensive AI Engineer training covering Python programming fundamentals, Machine Learning, and Deep Learning — designed to equip individuals with essential technical and professional skills for the modern AI-driven job market.',
        },
        {
            year: 'Aug 2025 – Jan 2026',
            role: 'ML & Data Science Participant',
            company: 'ASAH led by Dicoding × Accenture',
            achievement: 'Completed comprehensive training in Machine Learning, Data Analysis, Deep Learning, and MLOps introduction with a capstone project.',
        },
        {
            year: 'Feb 2026',
            role: 'Certified Associate Data Scientist',
            company: 'BNSP (National Professional Certification)',
            achievement: 'Earned official certification utilizing RapidMiner for the full data science lifecycle — from data preprocessing to ML model deployment and evaluation.',
        },
        {
            year: 'Aug 2025',
            role: 'Data Science – Fresh Graduate Academy',
            company: 'Digital Talent Scholarship (Kominfo)',
            achievement: 'Completed Data Science FGA program covering data understanding, RapidMiner workflows, modeling, and model performance assessment.',
        },
        {
            year: 'Feb 2025',
            role: 'AI & IoT Developer',
            company: 'Samsung Innovation Campus (Hacktiv8)',
            achievement: 'Built AquaGuard IoT system with AI integration — sensor data collection, Flask APIs, MongoDB Atlas storage, and real-time monitoring dashboards.',
        },
    ],
    contact: {
        email: 'fauzanlubada@gmail.com',
        github: 'https://github.com/MuhammadFauzanL',
        linkedin: 'https://linkedin.com/in/fauzanlubada',
        message: "I'm always open to discussing web development, data science, machine learning projects, and collaboration opportunities.",
    },
};
