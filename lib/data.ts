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
        bio: 'Highly motivated 6th-semester Informatics Engineering student at UIN Sunan Gunung Djati Bandung (GPA 3.83/4.00), specializing in the intersection of Web Development and Data Engineering. Possesses a proven track record of delivering end-to-end technical solutions — from developing full-stack web applications to deploying machine learning models — validated through rigorous industry programs and certifications. BNSP Certified Associate Data Scientist driven by a continuous curiosity to explore emerging technologies.',
        strengths: [
            'Web Development (Frontend & Backend)',
            'Machine Learning & Deep Learning',
            'IoT & AI Integration',
            'Mobile App Development',
            'Data Analysis & Visualization',
        ],
        education: [
            {
                period: 'Aug 2023 – Present',
                degree: 'Bachelor of Informatics Engineering',
                institution: 'UIN Sunan Gunung Djati Bandung',
                detail: 'GPA: 3.83 / 4.00',
            },
            {
                period: 'Jun 2019 – May 2022',
                degree: 'Senior High School (Science)',
                institution: 'SMA Negeri 1 Sumedang',
                detail: 'Analytical thinking & problem-solving focus',
            },
        ],
        certifications: [
            {
                date: 'Oct 2025',
                title: 'Associate Data Scientist',
                issuer: 'BNSP (Badan Nasional Sertifikasi Profesi)',
            },
        ],
        courses: [
            { title: 'Belajar Dasar Pemrograman Web', issuer: 'Dicoding Indonesia', period: 'Feb 2024 – Mar 2027' },
            { title: 'Memulai Pemrograman Dengan Java', issuer: 'Dicoding Indonesia', period: 'Apr 2025 – Apr 2028' },
            { title: 'Belajar Dasar Structured Query Language (SQL)', issuer: 'Dicoding Indonesia', period: 'Jul 2024 – Jul 2027' },
            { title: 'Belajar Dasar Git dengan GitHub', issuer: 'Dicoding Indonesia', period: 'Jan 2026 – Jan 2029' },
            { title: 'Membuat Rest API dengan Python', issuer: 'Udemy', period: 'Apr 2025' },
            { title: 'Belajar Fundamental Analisis Data', issuer: 'Dicoding Indonesia', period: 'Feb 2026 – Feb 2029' },
            { title: 'Belajar Machine Learning untuk Pemula', issuer: 'Dicoding Indonesia', period: 'Oct 2025 – Oct 2028' },
            { title: 'Belajar Fundamental Deep Learning', issuer: 'Dicoding Indonesia', period: 'Dec 2025 – Dec 2028' },
        ],
        community: [
            { period: 'Oct 2025 – Present', name: 'Sabit Community', role: 'Member', location: 'Bandung' },
            { period: 'Aug 2025 – Present', name: 'Dicoding UIN Sunan Gunung Djati', role: 'Member', location: 'Bandung' },
        ],
        languages: [
            { language: 'Indonesia', level: 'Native speaker' },
            { language: 'English', level: 'Good working knowledge' },
        ],
    },
    projects: [
        {
            title: 'WebDesa (Village Web Platform)',
            description: 'A full-stack web-based platform to manage village information systems. Features responsive design, structured data presentation, and integrated backend services for smooth data handling.',
            tech: ['React', 'Node.js', 'MongoDB', 'REST API'],
            github: 'https://github.com/MuhammadFauzanL/desaWeb',
            demo: 'https://desa-web-mxug.vercel.app/',
            featured: true,
        },
        {
            title: 'Reminders App',
            description: 'A web application for health monitoring with reminder features and a structured, user-friendly dashboard. Implements full UI, API integration, and real-time data visualization.',
            tech: ['Laravel', 'Supabase', 'IoT', 'REST API'],
            github: 'https://github.com/MuhammadFauzanL/RemindersApp',
            demo: 'https://reminders-app-one.vercel.app/',
            featured: false,
        },
        {
            title: 'Islamic Note App (Mobile)',
            description: 'A mobile application featuring prayer schedules, Islamic content (duas, hadith, articles), bookmarking, and a simple chatbot. Designed in Figma and published to Play Store.',
            tech: ['Mobile Dev', 'UI/UX Design', 'Backend API', 'Figma'],
            github: 'https://github.com/MuhammadFauzanL/IslamicNoteApp',
            demo: 'https://www.figma.com/design/Bi77SVqsFHOg71mtYO3nLb/Untitled?node-id=4-2119&t=AG8NfrSTCiCifMSj-1',
            demoLabel: 'Figma Design',
            featured: false,
        },
        {
            title: 'AquaGuard IoT System',
            description: 'Smart hydration monitoring device with weight, temperature & humidity sensors. Data routes through a Flask API to MongoDB Atlas and visualized on real-time dashboards (Ubidots). 3D prototype designed in Figma & Vectary.',
            tech: ['Python', 'Flask', 'MongoDB', 'IoT', 'Ubidots'],
            github: 'https://github.com/MuhammadFauzanL',
            demo: '#',
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
        // Mobile & Database
        backend: [
            { name: 'MySQL & SQL Database Design', level: 76 },
            { name: 'PostgreSQL & PLpgSQL', level: 72 },
            { name: 'Kotlin (Android Development)', level: 68 },
            { name: 'Dart (Flutter)', level: 65 },
        ],
        // Data Science, AI & IoT
        tools: [
            { name: 'Data Analysis & Visualization', level: 88 },
            { name: 'Python (Pandas, Data Science)', level: 82 },
            { name: 'Machine Learning & AI', level: 72 },
            { name: 'Internet of Things (IoT)', level: 74 },
            { name: 'Jupyter Notebook & RapidMiner', level: 82 },
            { name: 'Microsoft Excel / Google Sheets', level: 85 },
        ],
        soft: ['Problem Solving', 'UI/UX Thinking', 'Teamwork & Collaboration', 'Continuous Learning', 'Data Storytelling', 'SMART Goal-Setting'],
        yearsExperience: 2,
    },
    experience: [
        {
            year: 'Feb 2026 – Present',
            role: 'AI Engineer Cohort',
            company: 'Pijak × IBM SkillsBuild',
            achievement: 'Undergoing an intensive AI Engineer learning path. Strengthened core software development and version control (Git/GitHub) competencies, advancing to design, train, and deploy Machine Learning & Deep Learning models. Integrated SMART goal-setting frameworks for structured professional development.',
        },
        {
            year: 'Aug 2025 – Jan 2026',
            role: 'ML & Data Science Participant',
            company: 'ASAH led by Dicoding × Accenture',
            achievement: 'Graduated from a comprehensive program advancing expertise in Data Analysis, Machine Learning, Deep Learning, and MLOps. Successfully collaborated on a final capstone project bridging model development with practical industry deployment.',
        },
        {
            year: 'Oct 2025',
            role: 'Certified Associate Data Scientist',
            company: 'BNSP (National Professional Certification)',
            achievement: 'Earned official BNSP certification covering the full data science lifecycle — data preprocessing, ML model training, deployment, and evaluation — utilizing RapidMiner.',
        },
        {
            year: 'Dec 2024 – Feb 2025',
            role: 'AI & IoT Developer',
            company: 'Samsung Innovation Campus Stage 1 & 2',
            achievement: 'Engineered AquaGuard IoT, a wireless hydration monitoring device with weight, temperature & humidity sensors. Developed a Flask-based API to route real-time telemetry to MongoDB Atlas. Visualized data via Ubidots dashboards and designed 3D prototypes using Figma & Vectary 3D.',
        },
        {
            year: 'Feb 2024 – Jul 2024',
            role: 'Full Stack Developer Trainee',
            company: 'Jabar Digital Academy (Phase 2)',
            achievement: 'Selected for the competitive, mentored full-stack programming phase. Built a strong foundation in Computational Thinking, HTML, CSS, and PHP. Progressed to Database Fundamentals, PHP Web Programming, and the Laravel framework to engineer dynamic applications.',
        },
    ],
    contact: {
        email: 'fauzanlubada5@gmail.com',
        github: 'https://github.com/MuhammadFauzanL',
        linkedin: 'https://www.linkedin.com/in/muhammad-lubada160104 ',
        message: "I'm always open to discussing web development, data science, machine learning projects, and collaboration opportunities.",
    },
};
