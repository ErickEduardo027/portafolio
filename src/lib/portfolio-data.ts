// ============================================
// PORTFOLIO DATA - Edit your information here
// ============================================

export const personalInfo = {
  name: "Tu Nombre",
  role: "Software Engineer",
  tagline: "Construyo experiencias digitales que combinan diseño elegante con código robusto.",
  email: "tu.email@ejemplo.com",
  phone: "+52 123 456 7890",
  location: "Ciudad de México, México",
  linkedin: "https://linkedin.com/in/tu-perfil",
  github: "https://github.com/tu-usuario",
  cvUrl: "/cv.pdf",
}

export const aboutMe = {
  summary: `Soy un Ingeniero de Software apasionado por crear soluciones tecnológicas que 
  generen impacto real. Con más de 5 años de experiencia en desarrollo full-stack, 
  he colaborado con startups y empresas consolidadas para construir productos 
  digitales escalables y centrados en el usuario. Me especializo en arquitecturas 
  modernas y metodologías ágiles.`,
  strengths: [
    {
      title: "Liderazgo Técnico",
      description: "Capacidad para guiar equipos y tomar decisiones arquitectónicas clave.",
    },
    {
      title: "Trabajo en Equipo",
      description: "Colaboración efectiva con diseñadores, PMs y otros desarrolladores.",
    },
    {
      title: "Aprendizaje Continuo",
      description: "Constantemente actualizándome con las últimas tecnologías y mejores prácticas.",
    },
  ],
}

export const techStack = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "HTML5/CSS3"],
  backend: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"],
  databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase"],
  devops: ["Docker", "AWS", "Git", "CI/CD", "Kubernetes", "Vercel"],
}

export const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Plataforma de comercio electrónico con carrito de compras, pagos con Stripe y panel de administración.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    role: "Full-Stack Developer",
    results: "Incremento del 40% en conversiones y reducción del tiempo de carga en 60%.",
    demoUrl: "https://demo.ejemplo.com",
    repoUrl: "https://github.com/tu-usuario/ecommerce",
  },
  {
    id: 2,
    name: "Task Management App",
    description: "Aplicación de gestión de tareas con colaboración en tiempo real y notificaciones push.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Redis"],
    role: "Backend Lead",
    results: "Más de 5,000 usuarios activos mensuales con 99.9% de uptime.",
    demoUrl: "https://tasks.ejemplo.com",
    repoUrl: "https://github.com/tu-usuario/task-app",
  },
  {
    id: 3,
    name: "Analytics Dashboard",
    description: "Dashboard de analíticas con visualizaciones interactivas y reportes automatizados.",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    role: "Frontend Developer",
    results: "Reducción del 70% en tiempo de generación de reportes.",
    demoUrl: "https://analytics.ejemplo.com",
    repoUrl: "https://github.com/tu-usuario/analytics",
  },
  {
    id: 4,
    name: "Mobile Banking API",
    description: "API RESTful para aplicación de banca móvil con autenticación biométrica.",
    technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Docker"],
    role: "Backend Developer",
    results: "Procesamiento de más de 10,000 transacciones diarias.",
    demoUrl: null,
    repoUrl: "https://github.com/tu-usuario/banking-api",
  },
]

export const education = [
  {
    id: 1,
    institution: "Universidad Nacional Autónoma de México",
    degree: "Licenciatura en Ingeniería en Computación",
    period: "2015 - 2019",
    achievements: [
      "Graduado con mención honorífica",
      "Proyecto de tesis sobre Machine Learning aplicado a finanzas",
    ],
  },
  {
    id: 2,
    institution: "Coursera / Google",
    degree: "Google Cloud Professional Data Engineer",
    period: "2021",
    achievements: ["Certificación profesional en arquitecturas de datos en la nube"],
  },
  {
    id: 3,
    institution: "AWS",
    degree: "AWS Solutions Architect Associate",
    period: "2020",
    achievements: ["Certificación en diseño de arquitecturas escalables en AWS"],
  },
]

export const experience = [
  {
    id: 1,
    position: "Senior Software Engineer",
    company: "Tech Startup XYZ",
    period: "2022 - Presente",
    responsibilities: [
      "Liderazgo técnico de equipo de 5 desarrolladores",
      "Diseño e implementación de microservicios escalables",
      "Reducción del 50% en costos de infraestructura cloud",
      "Implementación de CI/CD y mejores prácticas de DevOps",
    ],
  },
  {
    id: 2,
    position: "Full-Stack Developer",
    company: "Agencia Digital ABC",
    period: "2020 - 2022",
    responsibilities: [
      "Desarrollo de aplicaciones web para clientes enterprise",
      "Integración de APIs de terceros y sistemas de pago",
      "Mentoría a desarrolladores junior",
      "Optimización de rendimiento y SEO",
    ],
  },
  {
    id: 3,
    position: "Junior Developer",
    company: "Startup Innovadora",
    period: "2019 - 2020",
    responsibilities: [
      "Desarrollo frontend con React y Vue.js",
      "Mantenimiento y mejora de bases de datos",
      "Participación en sprints ágiles y code reviews",
    ],
  },
]

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#educacion", label: "Educación" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contacto", label: "Contacto" },
]
