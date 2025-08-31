import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface Translations {
  footer: {
    frameTitle: string;
    brandName: string;
    brandRole: string;
    brandDescription: string;
    funQuote: string;
    quickLinks: string;
    links: {
      home: string;
      about: string;
      projects: string;
      contact: string;
    };
    connect: string;
    status: string;
    copyright: string;
    madeWith: string;
    backToTop: string;
  };
  contact: {
    frameTitle: string;
    title: string;
    titleHighlight: string;
    badge1: string;
    badge2: string;
    description: string;
    cardTitle: string;
    name: string;
    role: string;
    sendEmail: string;
    downloadCV: string;
    followMe: string;
    illustrationTitle: string;
    quote: string;
  };
  milestones: {
    title: string;
    titleHighlight: string;
    badge1: string;
    badge2: string;
    description: string;
    items: {
      [key: string]: {
        title: string;
        description: string;
      };
    };
  };
  testimonials: {
    frameTitle: string;
    title: string;
    titleHighlight: string;
    badge1: string;
    badge2: string;
    description: string;
    helpful: string;
  };
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    letsTalk: string;
  };
  hero: {
    name: string;
    skills: {
      uxui: string;
      designer: string;
      full: string;
      stack: string;
      developer: string;
      creative: string;
    };
    subtitle: string;
  };
  about: {
    title: string;
    titleHighlight: string;
    badge: string;
    description: string;
    cta: string;
  };
  projects: {
    title: string;
    titleHighlight: string;
    badge1: string;
    badge2: string;
    description: string;
    viewAll: string;
    viewProject: string;
    categories: {
      frontend: string;
      'full stack': string;
      design: string;
      'ux/ui': string;
      'web development': string;
      'mobile app': string;
      'data visualization': string;
      'ux/ui design': string;
    };
  };
  project: {
    backToPortfolio: string;
    preview: string;
    gallery: string;
    screenshot: string;
    technologies: string;
    features: string;
    challengesAndSolutions: string;
    challenges: string;
    solutions: string;
    results: string;
    team: string;
    myRole: string;
    teamMembers: string;
    loading: string;
    loadingMessage: string;
    viewLive: string;
    viewCode: string;
    viewDesign: string;
    projects: {
      [key: string]: any;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = new BehaviorSubject<string>('es');
  private translations: { [key: string]: Translations } = {};

  currentLanguage$ = this.currentLanguage.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadTranslations();
    // Solo acceder a localStorage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('language') || this.detectBrowserLanguage();
      this.setLanguage(savedLang);
    } else {
      // En el servidor, usar idioma por defecto
      this.setLanguage('es');
    }
  }

  private loadTranslations() {
    this.translations = {
      es: spanishTranslations,
      en: englishTranslations,
      fr: frenchTranslations
    };
  }

  private detectBrowserLanguage(): string {
    // Solo detectar idioma del navegador si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language.split('-')[0];
      return ['es', 'en', 'fr'].includes(browserLang) ? browserLang : 'es';
    }
    return 'es'; // Idioma por defecto para SSR
  }

  setLanguage(lang: string) {
    if (this.translations[lang]) {
      this.currentLanguage.next(lang);
      // Solo guardar en localStorage si estamos en el navegador
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('language', lang);
      }
    }
  }

  translate(key: string, params?: { [key: string]: string }): string {
    const currentLang = this.currentLanguage.value;
    const translation = this.getNestedTranslation(this.translations[currentLang], key);
    
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    return this.interpolateParams(translation, params);
  }

  private getNestedTranslation(obj: Translations, key: string): string {
    const keys = key.split('.');
    let current: any = obj;
    
    for (const k of keys) {
      if (current[k] === undefined) {
        return '';
      }
      current = current[k];
    }
    
    return current;
  }

  private interpolateParams(text: string, params?: { [key: string]: string }): string {
    if (!params) return text;
    
    return text.replace(/{{(\w+)}}/g, (match, key) => {
      return params[key] || match;
    });
  }

  getCurrentLanguage(): string {
    return this.currentLanguage.value;
  }

  getAvailableLanguages(): { code: string; name: string }[] {
    return [
      { code: 'es', name: 'Español' },
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' }
    ];
  }
}

// Traducciones en español
const spanishTranslations: Translations = {
    footer: {
  frameTitle: 'Información del Sistema',
  brandName: 'María Fernanda',
  brandRole: 'UX/UI Designer & Developer',
  brandDescription: 'Creando experiencias digitales únicas que combinan diseño innovador con desarrollo técnico de calidad.',
  funQuote: 'El código es poesía, el diseño es música',
  quickLinks: 'Enlaces Rápidos',
  links: {
    home: 'Inicio',
    about: 'Sobre mí',
    projects: 'Proyectos',
    contact: 'Contacto'
  },
  connect: 'Conecta Conmigo',
  status: 'Disponible para proyectos',
  copyright: 'María Fernanda. Todos los derechos reservados.',
  madeWith: 'Hecho con ❤️ y mucho ☕',
  backToTop: 'Subir'
},
    contact: {
  frameTitle: 'Contacto',
  title: 'Hablemos',
  titleHighlight: 'juntos',
  badge1: 'Disponible para proyectos',
  badge2: 'Respuesta rápida',
  description: 'Estoy siempre abierta a nuevas oportunidades y colaboraciones interesantes.',
  cardTitle: 'Información de contacto',
  name: 'Fernanda Farfán',
  role: 'UX/UI Designer & Developer',
  sendEmail: 'Enviar Email',
  downloadCV: 'Descargar CV',
  followMe: 'Sígueme en:',
  illustrationTitle: 'Diseño',
  quote: 'Cada proyecto es una oportunidad para crear algo extraordinario'
},
     milestones: {
    title: 'Qué',
    titleHighlight: 'Esperar',
    badge1: 'Experiencia',
    badge2: 'Completa',
    description: 'Una combinación perfecta de conocimiento técnico, diversión y networking que hace que cada evento sea memorable.',
    items: {
      '0': {
        title: 'Charlas de Expertos',
        description: 'Aprende de los mejores profesionales de la industria'
      },
      '1': {
        title: 'Diversión + Juegos',
        description: 'Actividades interactivas y networking divertido'
      },
      '2': {
        title: 'Comida + Bebida',
        description: 'Deliciosa comida y bebidas para todos los gustos'
      },
      '3': {
        title: 'Música en Vivo',
        description: 'Ambiente musical que complementa la experiencia'
      },
      '4': {
        title: 'Comunidad',
        description: 'Conecta con profesionales afines y expande tu red'
      }
    }
  },
  testimonials: {
    frameTitle: 'Testimoniales',
    title: 'Lo que dicen',
    titleHighlight: 'de mí',
    badge1: 'Testimonios',
    badge2: 'Reales',
    description: 'Comentarios y experiencias de clientes y colegas que han trabajado conmigo en diferentes proyectos.',
    helpful: 'Útil'
  },
  nav: {
    home: 'Inicio',
    about: 'Acerca',
    projects: 'Proyectos',
    contact: 'Contacto',
    letsTalk: 'Hablemos'
  },
  hero: {
    name: 'María Fernanda',
    skills: {
      uxui: 'UX/UI',
      designer: 'Designer',
      full: 'Full',
      stack: 'Stack',
      developer: 'Developer',
      creative: 'Creative'
    },
    subtitle: 'Especializada en crear experiencias web únicas'
  },
  about: {
    title: 'Full Stack',
    titleHighlight: 'Developer',
    badge: 'Frontend + Backend + UX/UI',
    description: 'Desarrolladora web especializada en crear experiencias digitales únicas y funcionales. Combinando diseño intuitivo con código limpio para construir aplicaciones web modernas',
    cta: 'Ver proyectos'
  },
  projects: {
    title: 'Mis',
    titleHighlight: 'Proyectos',
    badge1: 'Portfolio',
    badge2: 'Destacado',
    description: 'Una colección de proyectos que demuestran mi experiencia en desarrollo web, diseño UX/UI y soluciones tecnológicas innovadoras.',
    viewAll: 'Ver todos los proyectos',
    viewProject: 'Ver Proyecto',
    categories: {
      'frontend': 'Frontend',
      'full stack': 'Full Stack',
      'design': 'Diseño',
      'ux/ui': 'UX/UI',
      'web development': 'Desarrollo Web',
      'mobile app': 'App Móvil',
      'data visualization': 'Visualización de Datos',
      'ux/ui design': 'Diseño UX/UI'
    }
  },
  project: {
    backToPortfolio: 'Volver al Portafolio',
    preview: 'Vista Previa',
    gallery: 'Galería',
    screenshot: 'Captura',
    technologies: 'Tecnologías',
    features: 'Características',
    challengesAndSolutions: 'Desafíos y Soluciones',
    challenges: 'Desafíos',
    solutions: 'Soluciones',
    results: 'Resultados',
    team: 'Equipo',
    myRole: 'Mi Rol',
    teamMembers: 'Miembros del Equipo',
    loading: 'Cargando',
    loadingMessage: 'Cargando información del proyecto...',
    viewLive: 'Ver en Vivo',
    viewCode: 'Ver Código',
    viewDesign: 'Ver Diseño',
    
    // Proyectos específicos
    projects: {
      'ecommerce-platform': {
        title: 'Plataforma E-commerce',
        description: 'Solución moderna de comercio electrónico con características avanzadas',
        longDescription: 'Una plataforma integral de comercio electrónico construida con tecnologías modernas, que incluye gestión de inventario en tiempo real, capacidades avanzadas de búsqueda e integración perfecta de pagos. La plataforma atiende a miles de usuarios diariamente y procesa cientos de transacciones.',
        category: 'Desarrollo Web',
        features: {
          '0': 'Gestión de inventario en tiempo real',
          '1': 'Búsqueda y filtrado avanzados',
          '2': 'Procesamiento seguro de pagos',
          '3': 'Autenticación y autorización de usuarios',
          '4': 'Panel de administración',
          '5': 'Diseño responsivo móvil',
          '6': 'Notificaciones por email',
          '7': 'Sistema de seguimiento de pedidos'
        },
        challenges: {
          '0': 'Implementar actualizaciones de inventario en tiempo real en múltiples variantes de productos',
          '1': 'Optimizar consultas de base de datos para catálogos de productos grandes',
          '2': 'Garantizar el cumplimiento del procesamiento seguro de pagos',
          '3': 'Gestionar cálculos complejos de envío'
        },
        solutions: {
          '0': 'Implementé conexiones WebSocket para actualizaciones en tiempo real',
          '1': 'Usé indexación de base de datos y técnicas de optimización de consultas',
          '2': 'Integré la API de Stripe con estándares de cumplimiento PCI',
          '3': 'Creé un motor flexible de reglas de envío'
        },
        results: {
          '0': '40% de aumento en las tasas de conversión',
          '1': '60% de reducción en tiempos de carga de páginas',
          '2': '99.9% de tiempo de actividad logrado',
          '3': 'Procesó exitosamente más de $500K en transacciones'
        },
        role: 'Desarrollador Full-Stack y Líder de Equipo',
        team: {
          '0': 'María Fernanda (Desarrolladora Líder)',
          '1': 'Diseñador UI/UX',
          '2': 'Desarrollador Backend'
        }
      },
      'task-management': {
        title: 'App de Gestión de Tareas',
        description: 'Herramienta colaborativa de gestión de proyectos',
        longDescription: 'Una aplicación intuitiva de gestión de tareas diseñada para equipos remotos. Incluye tableros kanban de arrastrar y soltar, colaboración en tiempo real, seguimiento de tiempo e informes completos. Construida con rendimiento y experiencia de usuario como principales prioridades.',
        category: 'Aplicación Móvil',
        features: {
          '0': 'Tableros kanban de arrastrar y soltar',
          '1': 'Colaboración de equipo en tiempo real',
          '2': 'Seguimiento de tiempo e informes',
          '3': 'Archivos adjuntos y comentarios',
          '4': 'Notificaciones push',
          '5': 'Funcionalidad offline',
          '6': 'Compatibilidad multiplataforma'
        },
        challenges: {
          '0': 'Implementar arrastrar y soltar suave en dispositivos móviles',
          '1': 'Sincronizar datos en tiempo real en múltiples dispositivos',
          '2': 'Optimizar rendimiento para conjuntos de datos grandes',
          '3': 'Mantener funcionalidad offline'
        },
        solutions: {
          '0': 'Usé React Native Gesture Handler para interacciones suaves',
          '1': 'Implementé Firebase Realtime Database con resolución de conflictos',
          '2': 'Apliqué virtualización para listas grandes y paginación',
          '3': 'Creé caché SQLite local con mecanismos de sincronización'
        },
        results: {
          '0': 'Adoptado por más de 50 equipos remotos',
          '1': '95% de calificación de satisfacción del usuario',
          '2': '30% de mejora en productividad del equipo',
          '3': 'Destacado en la categoría de productividad de App Store'
        },
        role: 'Desarrollador Móvil Líder',
        team: {
          '0': 'María Fernanda (Desarrolladora Móvil)',
          '1': 'Gerente de Producto',
          '2': 'Diseñador UI/UX'
        }
      },
      'dashboard-analytics': {
        title: 'Dashboard de Analíticas',
        description: 'Plataforma de visualización de datos en tiempo real',
        longDescription: 'Un dashboard analítico sofisticado que transforma datos comerciales complejos en insights accionables. Incluye gráficos interactivos, widgets personalizables, transmisión de datos en tiempo real y generación automatizada de reportes para clientes empresariales.',
        category: 'Visualización de Datos',
        features: {
          '0': 'Visualizaciones de datos interactivas',
          '1': 'Widgets de dashboard personalizables',
          '2': 'Transmisión de datos en tiempo real',
          '3': 'Generación automatizada de reportes',
          '4': 'Filtrado y búsqueda avanzados',
          '5': 'Capacidades de exportación (PDF, Excel)',
          '6': 'Control de acceso basado en roles'
        },
        challenges: {
          '0': 'Procesar y visualizar grandes conjuntos de datos eficientemente',
          '1': 'Crear gráficos responsivos e interactivos',
          '2': 'Implementar actualizaciones de datos en tiempo real sin problemas de rendimiento',
          '3': 'Diseñar interfaces intuitivas de exploración de datos'
        },
        solutions: {
          '0': 'Implementé estrategias de agregación y caché de datos',
          '1': 'Usé D3.js con Canvas para visualizaciones de alto rendimiento',
          '2': 'Apliqué conexiones WebSocket con throttling de datos',
          '3': 'Creé patrones de UI de divulgación progresiva'
        },
        results: {
          '0': '70% de reducción en tiempo de análisis de datos',
          '1': '85% de aumento en engagement del usuario',
          '2': '50% de mejora en velocidad de toma de decisiones',
          '3': 'Desplegado exitosamente a más de 100 clientes empresariales'
        },
        role: 'Desarrollador Frontend Líder',
        team: {
          '0': 'María Fernanda (Líder Frontend)',
          '1': 'Ingeniero de Datos',
          '2': 'Desarrollador Backend',
          '3': 'Diseñador UX'
        }
      },
      'mobile-app-ui': {
        title: 'UI/UX de App Móvil',
        description: 'Diseño completo de interfaz para aplicación móvil de fitness',
        longDescription: 'Un proyecto integral de diseño UI/UX para una aplicación móvil de fitness. Incluye investigación de usuarios, wireframing, prototipado y diseños de alta fidelidad. Enfocado en crear una experiencia de usuario intuitiva y motivacional para entusiastas del fitness.',
        category: 'Diseño UX/UI',
        features: {
          '0': 'Investigación de usuarios y personas',
          '1': 'Prototipos interactivos',
          '2': 'Creación de sistema de diseño',
          '3': 'Cumplimiento de accesibilidad',
          '4': 'Patrones de diseño responsivo',
          '5': 'Microinteracciones',
          '6': 'Pruebas de usabilidad'
        },
        challenges: {
          '0': 'Crear navegación intuitiva para datos complejos de fitness',
          '1': 'Diseñar elementos de UI motivacionales',
          '2': 'Garantizar accesibilidad para diferentes capacidades de usuario',
          '3': 'Equilibrar densidad de información con diseño limpio'
        },
        solutions: {
          '0': 'Implementé divulgación progresiva para características complejas',
          '1': 'Usé elementos de gamificación para aumentar el engagement',
          '2': 'Apliqué directrices WCAG 2.1 en todo el diseño',
          '3': 'Creé sistema de componentes modular para consistencia'
        },
        results: {
          '0': '40% de aumento en engagement del usuario',
          '1': '25% de mejora en tasas de completación de tareas',
          '2': '95% de retroalimentación positiva de pruebas de usabilidad',
          '3': 'Lanzado exitosamente a más de 10K usuarios'
        },
        role: 'Diseñador UI/UX Líder',
        team: {
          '0': 'María Fernanda (Diseñadora Líder)',
          '1': 'Investigador UX',
          '2': 'Gerente de Producto'
        }
      }
    }
  }
};

// Traducciones en inglés
const englishTranslations: Translations = {
    footer: {
  frameTitle: 'System Information',
  brandName: 'María Fernanda',
  brandRole: 'UX/UI Designer & Developer',
  brandDescription: 'Creating unique digital experiences that combine innovative design with quality technical development.',
  funQuote: 'Code is poetry, design is music',
  quickLinks: 'Quick Links',
  links: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact'
  },
  connect: 'Connect With Me',
  status: 'Available for projects',
  copyright: 'María Fernanda. All rights reserved.',
  madeWith: 'Made with ❤️ and lots of ☕',
  backToTop: 'Go Up'
},
    contact: {
  frameTitle: 'Contact',
  title: 'Let\'s talk',
  titleHighlight: 'together',
  badge1: 'Available for projects',
  badge2: 'Quick response',
  description: 'I\'m always open to new opportunities and interesting collaborations.',
  cardTitle: 'Contact information',
  name: 'Fernanda Farfán',
  role: 'UX/UI Designer & Developer',
  sendEmail: 'Send Email',
  downloadCV: 'Download CV',
  followMe: 'Follow me on:',
  illustrationTitle: 'Design',
  quote: 'Every project is an opportunity to create something extraordinary'
},
     milestones: {
    title: 'What to',
    titleHighlight: 'Expect',
    badge1: 'Complete',
    badge2: 'Experience',
    description: 'A perfect combination of technical knowledge, fun and networking that makes every event memorable.',
    items: {
      '0': {
        title: 'Expert Talks',
        description: 'Learn from the best professionals in the industry'
      },
      '1': {
        title: 'Fun + Games',
        description: 'Interactive activities and fun networking'
      },
      '2': {
        title: 'Food + Drink',
        description: 'Delicious food and drinks for all tastes'
      },
      '3': {
        title: 'Live Music',
        description: 'Musical atmosphere that complements the experience'
      },
      '4': {
        title: 'Community',
        description: 'Connect with like-minded professionals and expand your network'
      }
    }
  },
  testimonials: {
    frameTitle: 'Testimonials',
    title: 'What they say',
    titleHighlight: 'about me',
    badge1: 'Testimonials',
    badge2: 'Real',
    description: 'Comments and experiences from clients and colleagues who have worked with me on different projects.',
    helpful: 'Helpful'
  },
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    contact: 'Contact',
    letsTalk: 'Let\'s Talk'
  },
  hero: {
    name: 'María Fernanda',
    skills: {
      uxui: 'UX/UI',
      designer: 'Designer',
      full: 'Full',
      stack: 'Stack',
      developer: 'Developer',
      creative: 'Creative'
    },
    subtitle: 'Specialized in creating unique web experiences'
  },
  about: {
    title: 'Experience Design',
    titleHighlight: 'Developer',
    badge: 'Frontend + Backend + UX/UI',
    description: 'Web developer specialized in creating unique and functional digital experiences. Combining intuitive design with clean code to build modern web applications',
    cta: 'View projects'
  },

  projects: {
    title: 'My',
    titleHighlight: 'Projects',
    badge1: 'Portfolio',
    badge2: 'Featured',
    description: 'A collection of projects that demonstrate my expertise in web development, UX/UI design, and innovative technology solutions.',
    viewAll: 'View all projects',
    viewProject: 'View Project',
    categories: {
      'frontend': 'Frontend',
      'full stack': 'Full Stack',
      'design': 'Design',
      'ux/ui': 'UX/UI',
      'web development': 'Web Development',
      'mobile app': 'Mobile App',
      'data visualization': 'Data Visualization',
      'ux/ui design': 'UX/UI Design'
    }
  },
  project: {
    backToPortfolio: 'Back to Portfolio',
    preview: 'Preview',
    gallery: 'Gallery',
    screenshot: 'Screenshot',
    technologies: 'Technologies',
    features: 'Features',
    challengesAndSolutions: 'Challenges & Solutions',
    challenges: 'Challenges',
    solutions: 'Solutions',
    results: 'Results',
    team: 'Team',
    myRole: 'My Role',
    teamMembers: 'Team Members',
    loading: 'Loading',
    loadingMessage: 'Loading project information...',
    viewLive: 'View Live',
    viewCode: 'View Code',
    viewDesign: 'View Design',
    
    // Proyectos específicos
    projects: {
      'ecommerce-platform': {
        title: 'E-commerce Platform',
        description: 'Modern e-commerce solution with advanced features',
        longDescription: 'A comprehensive e-commerce platform built with modern technologies, featuring real-time inventory management, advanced search capabilities, and seamless payment integration. The platform serves thousands of users daily and processes hundreds of transactions.',
        category: 'Web Development',
        features: {
          '0': 'Real-time inventory management',
          '1': 'Advanced search and filtering',
          '2': 'Secure payment processing',
          '3': 'User authentication & authorization',
          '4': 'Admin dashboard',
          '5': 'Mobile responsive design',
          '6': 'Email notifications',
          '7': 'Order tracking system'
        },
        challenges: {
          '0': 'Implementing real-time inventory updates across multiple product variants',
          '1': 'Optimizing database queries for large product catalogs',
          '2': 'Ensuring secure payment processing compliance',
          '3': 'Managing complex shipping calculations'
        },
        solutions: {
          '0': 'Implemented WebSocket connections for real-time updates',
          '1': 'Used database indexing and query optimization techniques',
          '2': 'Integrated Stripe API with PCI compliance standards',
          '3': 'Created a flexible shipping rules engine'
        },
        results: {
          '0': '40% increase in conversion rates',
          '1': '60% reduction in page load times',
          '2': '99.9% uptime achieved',
          '3': 'Successfully processed over $500K in transactions'
        },
        role: 'Full-Stack Developer & Team Lead',
        team: {
          '0': 'María Fernanda (Lead Developer)',
          '1': 'UI/UX Designer',
          '2': 'Backend Developer'
        }
      },
      'task-management': {
        title: 'Task Management App',
        description: 'Collaborative project management tool',
        longDescription: 'An intuitive task management application designed for remote teams. Features include drag-and-drop kanban boards, real-time collaboration, time tracking, and comprehensive reporting. Built with performance and user experience as top priorities.',
        category: 'Mobile App',
        features: {
          '0': 'Drag-and-drop kanban boards',
          '1': 'Real-time team collaboration',
          '2': 'Time tracking and reporting',
          '3': 'File attachments and comments',
          '4': 'Push notifications',
          '5': 'Offline functionality',
          '6': 'Cross-platform compatibility'
        },
        challenges: {
          '0': 'Implementing smooth drag-and-drop on mobile devices',
          '1': 'Synchronizing real-time data across multiple devices',
          '2': 'Optimizing performance for large datasets',
          '3': 'Maintaining offline functionality'
        },
        solutions: {
          '0': 'Used React Native Gesture Handler for smooth interactions',
          '1': 'Implemented Firebase Realtime Database with conflict resolution',
          '2': 'Applied virtualization for large lists and pagination',
          '3': 'Created local SQLite cache with sync mechanisms'
        },
        results: {
          '0': 'Adopted by 50+ remote teams',
          '1': '95% user satisfaction rating',
          '2': '30% improvement in team productivity',
          '3': 'Featured in App Store productivity category'
        },
        role: 'Lead Mobile Developer',
        team: {
          '0': 'María Fernanda (Mobile Developer)',
          '1': 'Product Manager',
          '2': 'UI/UX Designer'
        }
      },
      'dashboard-analytics': {
        title: 'Analytics Dashboard',
        description: 'Real-time data visualization platform',
        longDescription: 'A sophisticated analytics dashboard that transforms complex business data into actionable insights. Features interactive charts, customizable widgets, real-time data streaming, and automated report generation for enterprise clients.',
        category: 'Data Visualization',
        features: {
          '0': 'Interactive data visualizations',
          '1': 'Customizable dashboard widgets',
          '2': 'Real-time data streaming',
          '3': 'Automated report generation',
          '4': 'Advanced filtering and search',
          '5': 'Export capabilities (PDF, Excel)',
          '6': 'Role-based access control'
        },
        challenges: {
          '0': 'Processing and visualizing large datasets efficiently',
          '1': 'Creating responsive and interactive charts',
          '2': 'Implementing real-time data updates without performance issues',
          '3': 'Designing intuitive data exploration interfaces'
        },
        solutions: {
          '0': 'Implemented data aggregation and caching strategies',
          '1': 'Used D3.js with Canvas for high-performance visualizations',
          '2': 'Applied WebSocket connections with data throttling',
          '3': 'Created progressive disclosure UI patterns'
        },
        results: {
          '0': 'Reduced data analysis time by 70%',
          '1': 'Increased user engagement by 85%',
          '2': 'Improved decision-making speed by 50%',
          '3': 'Successfully deployed to 100+ enterprise clients'
        },
        role: 'Frontend Lead Developer',
        team: {
          '0': 'María Fernanda (Frontend Lead)',
          '1': 'Data Engineer',
          '2': 'Backend Developer',
          '3': 'UX Designer'
        }
      },
      'mobile-app-ui': {
        title: 'Mobile App UI/UX',
        description: 'Complete interface design for fitness mobile application',
        longDescription: 'A comprehensive UI/UX design project for a fitness mobile application. Includes user research, wireframing, prototyping, and high-fidelity designs. Focus on creating an intuitive and motivating user experience for fitness enthusiasts.',
        category: 'UX/UI Design',
        features: {
          '0': 'User research and personas',
          '1': 'Interactive prototypes',
          '2': 'Design system creation',
          '3': 'Accessibility compliance',
          '4': 'Responsive design patterns',
          '5': 'Micro-interactions',
          '6': 'Usability testing'
        },
        challenges: {
          '0': 'Creating intuitive navigation for complex fitness data',
          '1': 'Designing motivational UI elements',
          '2': 'Ensuring accessibility across different user abilities',
          '3': 'Balancing information density with clean design'
        },
        solutions: {
          '0': 'Implemented progressive disclosure for complex features',
          '1': 'Used gamification elements to increase engagement',
          '2': 'Applied WCAG 2.1 guidelines throughout the design',
          '3': 'Created modular component system for consistency'
        },
        results: {
          '0': '40% increase in user engagement',
          '1': '25% improvement in task completion rates',
          '2': '95% positive feedback from usability testing',
          '3': 'Successfully launched to 10K+ users'
        },
        role: 'Lead UI/UX Designer',
        team: {
          '0': 'María Fernanda (Lead Designer)',
          '1': 'UX Researcher',
          '2': 'Product Manager'
        }
      }
    }
  }
};

// Traducciones en francés
const frenchTranslations: Translations = {
    footer: {
  frameTitle: 'Informations Système',
  brandName: 'María Fernanda',
  brandRole: 'Designer UX/UI & Développeuse',
  brandDescription: 'Créer des expériences numériques uniques qui combinent design innovant et développement technique de qualité.',
  funQuote: 'Le code est poésie, le design est musique',
  quickLinks: 'Liens Rapides',
  links: {
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    contact: 'Contact'
  },
  connect: 'Connectez-vous avec moi',
  status: 'Disponible pour projets',
  copyright: 'María Fernanda. Tous droits réservés.',
  madeWith: 'Fait avec ❤️ et beaucoup de ☕',
  backToTop: 'Remonter'
},
    contact: {
  frameTitle: 'Contact',
  title: 'Parlons',
  titleHighlight: 'ensemble',
  badge1: 'Disponible pour projets',
  badge2: 'Réponse rapide',
  description: 'Je suis toujours ouverte à de nouvelles opportunités et collaborations intéressantes.',
  cardTitle: 'Informations de contact',
  name: 'Fernanda Farfán',
  role: 'Designer UX/UI & Développeuse',
  sendEmail: 'Envoyer Email',
  downloadCV: 'Télécharger CV',
  followMe: 'Suivez-moi sur:',
  illustrationTitle: 'Design',
  quote: 'Chaque projet est une opportunité de créer quelque chose d\'extraordinaire'
},
     milestones: {
    title: 'À Quoi',
    titleHighlight: 'S\'Attendre',
    badge1: 'Expérience',
    badge2: 'Complète',
    description: 'Une combinaison parfaite de connaissances techniques, de plaisir et de réseautage qui rend chaque événement mémorable.',
    items: {
      '0': {
        title: 'Conférences d\'Experts',
        description: 'Apprenez des meilleurs professionnels de l\'industrie'
      },
      '1': {
        title: 'Amusement + Jeux',
        description: 'Activités interactives et réseautage amusant'
      },
      '2': {
        title: 'Nourriture + Boisson',
        description: 'Délicieuse nourriture et boissons pour tous les goûts'
      },
      '3': {
        title: 'Musique Live',
        description: 'Ambiance musicale qui complète l\'expérience'
      },
      '4': {
        title: 'Communauté',
        description: 'Connectez-vous avec des professionnels partageant les mêmes idées'
      }
    }
  },
  testimonials: {
    frameTitle: 'Témoignages',
    title: 'Ce qu\'ils disent',
    titleHighlight: 'de moi',
    badge1: 'Témoignages',
    badge2: 'Réels',
    description: 'Commentaires et expériences de clients et collègues qui ont travaillé avec moi sur différents projets.',
    helpful: 'Utile'
  },
  nav: {
    home: 'Accueil',
    about: 'À propos',
    projects: 'Projets',
    contact: 'Contact',
    letsTalk: 'Parlons'
  },
  hero: {
    name: 'María Fernanda',
    skills: {
      uxui: 'UX/UI',
      designer: 'Designer',
      full: 'Full',
      stack: 'Stack',
      developer: 'Developer',
      creative: 'Creative'
    },
    subtitle: 'Spécialisée dans la création d\'expériences web uniques'
  },
  about: {
    title: 'Disseny d’experiència',
    titleHighlight: 'Desenvolupadora',
    badge: 'Frontend + Backend + UX/UI',
    description: 'Desenvolupadora web especialitzada en crear experiències digitals úniques i funcionals. Combinant disseny intuïtiu amb codi net per construir aplicacions web modernes',
    cta: 'Veure projectes'
  },
  projects: {
    title: 'Mes',
    titleHighlight: 'Projets',
    badge1: 'Portfolio',
    badge2: 'Sélectionné',
    description: 'Une collection de projets qui démontrent mon expertise en développement web, design UX/UI et solutions technologiques innovantes.',
    viewAll: 'Voir tous les projets',
    viewProject: 'Voir le Projet',
    categories: {
      'frontend': 'Frontend',
      'full stack': 'Full Stack',
      'design': 'Design',
      'ux/ui': 'UX/UI',
      'web development': 'Développement Web',
      'mobile app': 'App Mobile',
      'data visualization': 'Visualisation de Données',
      'ux/ui design': 'Design UX/UI'
    }
  },
  project: {
    backToPortfolio: 'Retour au Portfolio',
    preview: 'Aperçu',
    gallery: 'Galerie',
    screenshot: 'Capture d\'écran',
    technologies: 'Technologies',
    features: 'Caractéristiques',
    challengesAndSolutions: 'Défis et Solutions',
    challenges: 'Défis',
    solutions: 'Solutions',
    results: 'Résultats',
    team: 'Équipe',
    myRole: 'Mon Rôle',
    teamMembers: 'Membres de l\'Équipe',
    loading: 'Chargement',
    loadingMessage: 'Chargement des informations du projet...',
    viewLive: 'Voir en Direct',
    viewCode: 'Voir le Code',
    viewDesign: 'Voir le Design',
    
    // Proyectos específicos (versión francesa simplificada)
    projects: {
      'ecommerce-platform': {
        title: 'Plateforme E-commerce',
        description: 'Solution e-commerce moderne avec fonctionnalités avancées',
        longDescription: 'Une plateforme e-commerce complète construite avec des technologies modernes, offrant une gestion d\'inventaire en temps réel, des capacités de recherche avancées et une intégration de paiement transparente.',
        category: 'Développement Web',
        features: {
          '0': 'Gestion d\'inventaire en temps réel',
          '1': 'Recherche et filtrage avancés',
          '2': 'Traitement de paiement sécurisé',
          '3': 'Authentification et autorisation des utilisateurs'
        },
        challenges: {
          '0': 'Implémenter les mises à jour d\'inventaire en temps réel',
          '1': 'Optimiser les requêtes de base de données',
          '2': 'Assurer la conformité des paiements sécurisés'
        },
        solutions: {
          '0': 'Implémenté des connexions WebSocket',
          '1': 'Utilisé l\'indexation de base de données',
          '2': 'Intégré l\'API Stripe avec conformité PCI'
        },
        results: {
          '0': '40% d\'augmentation des taux de conversion',
          '1': '60% de réduction des temps de chargement',
          '2': '99.9% de temps de fonctionnement'
        },
        role: 'Développeur Full-Stack et Chef d\'Équipe',
        team: {
          '0': 'María Fernanda (Développeuse Leader)',
          '1': 'Designer UI/UX',
          '2': 'Développeur Backend'
        }
      }
    }
  }
};