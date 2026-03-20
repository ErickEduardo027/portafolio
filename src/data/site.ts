export type Project = {
  name: string;
  role: string;
  description: string;
  tech: string[];
  results?: string[];
  demoUrl?: string;
  repoUrl?: string;
};

export type TimelineItem = {
  title: string;
  org: string;
  period: string;
  details: string[];
};

export const site = {
  // Puedes cambiar esto cuando quieras
  name: "Erick Eduardo Santana Segura",
  role: "Software Engineer",
  tagline:
    "Construyo experiencias digitales que combinan diseño elegante con código robusto.",
  location: "San Pedro de Macorís, República Dominicana",

  // Datos base (según tu CV)
  email: "erickeduardo027@gmail.com",
  phone: "849-256-5232",
  website: "elerikdev.com",

  links: {
    github: "https://github.com/ErickEduardo027", // <-- pega aquí
    linkedin: "https://www.linkedin.com/in/erick-eduardo-santana-segura-134453314/", // <-- pega aquí
    cv: "/curriculum.pdf",
  },

  about: [
    "Soy estudiante de Ingeniería de Software con enfoque en crear soluciones útiles y mantenibles.",
    "Me adapto rápido a nuevas tecnologías y disfruto optimizar procesos con software.",
    "He trabajado en proyectos académicos y freelance, cuidando calidad, orden y buenas prácticas.",
    "Me interesa el desarrollo full-stack, la gestión de proyectos y el crecimiento continuo.",
    "Busco oportunidades donde pueda aportar valor real y seguir mejorando como profesional.",
  ],

  strengths: ["Liderazgo", "Trabajo en equipo", "Aprendizaje continuo"],

  stack: {
    Frontend: ["React", "Tailwind CSS", "TypeScript", "HTML", "CSS"],
    Backend: ["ASP.NET", "Node.js", "REST APIs"],
    "Bases de datos": ["SQL Server", "PostgreSQL", "SQLite"],
    "DevOps/Herramientas": ["Git/GitHub", "Docker (básico)", "CI/CD (básico)"],
  },

  projects: [
  {
    name: "ErickNews.Client",
    role: "Frontend Developer",
    description:
      "SPA para un noticiero universitario. Incluye secciones por categorías, búsqueda, detalle de noticias y una UI moderna y responsive enfocada en buena UX.",
    tech: ["React", "Tailwind CSS"],
    results: ["UI responsive", "Consumo de API", "Estructura escalable"],
    repoUrl: "https://github.com/ErickEduardo027/ErickNews.Client",
  },
  {
    name: "ErickNews.backend",
    role: "Backend Developer",
    description:
      "Backend para la plataforma de noticias con enfoque administrativo. API REST, lógica de negocio y estructura lista para integración con el cliente web y funcionalidades de gestión.",
    tech: ["ASP.NET Core MVC", "ASP.NET Core Web API", "C#"],
    results: ["Arquitectura por capas", "Endpoints REST", "Base lista para administración"],
    repoUrl: "https://github.com/ErickEduardo027/ErickNews-backends",
  },
  {
    name: "ErickNews Movil",
    role: "Android Developer",
    description:
      "Versión móvil de ErickNews para consumir noticias desde el dispositivo, con persistencia local y enfoque en experiencia fluida, navegación y lectura cómoda.",
    tech: ["Kotlin", "Room", "Android Studio"],
    results: ["Persistencia local", "UI nativa", "Consumo de API"],
    repoUrl: "https://github.com/ErickEduardo027/ErickNews-movil",
  },
  {
    name: "ErickDate",
    role: "Frontend Developer",
    description:
      "SPA de películas y series consumiendo una API remota. Fue mi entrada seria a React: enrutado, consumo de API, estados y UI responsive.",
    tech: ["React", "Tailwind CSS", "Episodate API"],
    results: ["Consumo de API", "UI responsive", "Buenas prácticas iniciales en React"],
    repoUrl: "https://github.com/ErickEduardo027/ErickDate",
  },
  {
    name: "ErickDate Movil",
    role: "Android Developer",
    description:
      "Mismo concepto de ErickDate, pero llevado a Android nativo. Enfoque en layouts, navegación y consumo de API desde móvil.",
    tech: ["Kotlin", "XML", "Episodate API"],
    results: ["Layouts en XML", "Consumo de API", "Experiencia móvil"],
    repoUrl: "https://github.com/ErickEduardo027/ErickDateMovil",
  },
  {
    name: "Sistema estudiantil universitario (Selección y publicación)",
    role: "Desktop Developer",
    description:
      "Uno de mis proyectos más complejos al inicio. Aunque refleja inexperiencia, demuestra mis ganas de aprender y mejorar. Algún día lo reharé con tecnologías más modernas.",
    tech: ["WinForms", "C#", "SQL"],
    results: ["Proyecto completo", "Base de datos", "Lógica + UI desktop"],
    // Sin repo por ahora (solo imágenes)
  },
  {
    name: "Proyecto administrativo con DB Northwind",
    role: "Backend/DB Developer",
    description:
      "Aplicación administrativa basada en Northwind para practicar CRUD, consultas SQL, validaciones y pantallas de mantenimiento con flujos típicos de gestión.",
    tech: ["C#", "SQL"],
    results: ["CRUD completo", "Consultas SQL", "Validaciones básicas"],
    repoUrl: "https://github.com/ErickEduardo027/ProyectoDefinitvo-Northwind",
  },
  {
    name: "Todo List",
    role: "Frontend Developer",
    description:
      "Mis primeros pasos en JavaScript. Aplicación sencilla para practicar DOM, eventos, estilos y estructura básica de una app web.",
    tech: ["JavaScript", "HTML", "CSS"],
    results: ["DOM + eventos", "UI simple", "Aprendizaje inicial JS"],
    repoUrl: "https://github.com/ErickEduardo027/Todo-List-Appp-main",
  },
],


  education: [
    {
      title: "Ingeniería de Software (Estudiante)",
      org: "Universidad Central del Este",
      period: "2022 - Actualidad",
      details: ["Enfoque en desarrollo de software y proyectos académicos."],
    },
    {
      title: "Bachillerato",
      org: "Centro Educativo Calasanz Pueblo Bávaro",
      period: "2009 - 2022",
      details: ["Estado: Concluido."],
    },
  ] as TimelineItem[],

  experience: [
    {
      title: "Freelancer",
      org: "Home Office",
      period: "2025",
      details: [
        "Desarrollo de soluciones a medida.",
        "Soporte y mejoras a proyectos existentes.",
      ],
    },
    {
      title: "Programa de Intercambio Cultural",
      org: "Cedar Point (Sandusky, Ohio)",
      period: "2025",
      details: ["Experiencia internacional y trabajo en equipo."],
    },
  ] as TimelineItem[],
};
