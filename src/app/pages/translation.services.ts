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
      'machine learning': string;
      'ia': string;
      'data science': string;
      research: string;
    };
    projectDetails?: {
      [key: string]: {
        title: string;
        description: string;
      };
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
      this.setLanguage('es');
    }
  }

  private loadTranslations() {
    this.translations = {
      es: spanishTranslations,
      en: englishTranslations,
      cat: frenchTranslations
    };
  }

  private detectBrowserLanguage(): string {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = navigator.language.split('-')[0];
      return ['es', 'en', 'cat'].includes(browserLang) ? browserLang : 'es';
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
      { code: 'cat', name: 'Français' }
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
  title: 'Mis',
  titleHighlight: 'Hitos',
  badge1: 'Trayectoria',
  badge2: 'Integral',
  description: 'Una mezcla de experiencia académica, proyectos sociales, aprendizaje continuo y creatividad que definen mi forma de trabajar y crecer.',
  items: {
   '0': {
    title: 'Profesora en "Agentes del Cambio”',
    description: 'Contratada por Jesuïtes Educació, impartí clases de Design Thinking en Salesians Sarrià, formando a jóvenes en innovación, creatividad y resolución de problemas.'
  },
    '1': {
  title: 'Trabajo Social',
  description: 'Colaboré durante 3 años con Fundamama, una fundación dedicada a la lucha contra el cáncer de mama, apoyando en proyectos de impacto social y aplicando diseño y tecnología para ayudar a la comunidad.'
},
    '2': {
      title: 'Hackatones & Eventos',
      description: 'Participo constantemente en hackatones y conferencias para seguir aprendiendo, innovar y nutrirme de nuevas ideas.'
    },
    '3': {
      title: 'Trabajo en Equipo',
      description: 'Disfruto construir en colaboración, aportar mis habilidades técnicas y aprender de diferentes perspectivas.'
    },
    '4': {
      title: 'Creatividad Personal',
      description: 'Me apasiona dibujar, escribir y explorar nuevos idiomas como formas de expresión y crecimiento personal.'
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
    title: 'Ingeniera',
    titleHighlight: 'de Producción',
    badge: 'Full-Stack Developer + UX/UI + Innovación I+D+i',
    description: 'Soy Mafer, Ingeniera de Producción, diseñadora UX/UI y desarrolladora full-stack. Me apasiona crear soluciones digitales desde la investigación y el diseño hasta la implementación técnica, integrando creatividad, ingeniería y tecnología para generar productos innovadores con impacto real',
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
    projectDetails: {
    'ecommerce-platform': {
      title: 'Inmetep',
      description: 'Propuesta de mejora en un sistema de control de mantenimiento aplicando la industria 4.0'
    },
    'task-management': {
      title: 'KidMoodies',
      description: 'Aplicación que presta servicios de streaming basados en las emociones de su público'
    },
    'dashboard-analytics': {
      title: 'CestAhorro',
      description: 'Webapp para consumidores que necesitan ahorrar en la compra en supermercados'
    },
    'mobile-app-ui': {
      title: 'Alimentos Innova',
      description: 'Creación de un sitio web para una empresa fabricante de productos alimenticios'
    },
    'ai-project': {
  title: 'Oha.ai ',
  description: 'Plataforma integral de inteligencia artificial para creación de contenido en múltiples formatos',
    },
    'reputation-algorithm': {
  title: 'Shop And Gets ',
  description: 'Plataforma full-stack para compras internacionales y gestión logística en tiempo real',
    },

  },
   categories: {
  'frontend': 'Frontend',
  'full stack': 'Full Stack',
  'design': 'Diseño',
  'ux/ui': 'UX/UI',
  'web development': 'Desarrollo Web',
  'mobile app': 'App Móvil',
  'data visualization': 'Visualización de Datos',
  'ux/ui design': 'Diseño UX/UI',
  'machine learning': 'Machine Learning',
  'ia': 'Inteligencia Artificial',
  'research': 'Investigación',
  'data science': 'Tienda Online'
},
    
  },
  project: {
    backToPortfolio: 'Volver al portafolio',
    preview: 'Vista previa',
    gallery: 'Galería',
    screenshot: 'Captura de pantalla',
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
    viewLive: 'Ver en vivo',
    viewCode: 'Ver código',
    viewDesign: 'Ver diseño',
    projects: {
      'ecommerce-platform': {
  id: 'ecommerce-platform',
  title: 'Inmetep',
  tech: ['Research', 'PHP', 'React'],
  description: 'Propuesta de mejora en un sistema de control de mantenimiento aplicando la industria 4.0',
  longDescription: 'Proyecto desarrollado en la empresa metalmecánica INMETEP C.A. con el objetivo de optimizar la gestión de mantenimiento según la norma COVENIN 3049-93. Se diagnosticaron fallas en la documentación, organización y prevención, diseñando un sistema digital de mantenimiento preventivo con manuales técnicos, cronogramas, registro en línea y portal web de soporte. La solución se fundamentó en principios de la industria 4.0 para garantizar eficiencia, trazabilidad y reducción de tiempos de inactividad en la línea de producción.',
  category: 'Full Stack',
  features: {
    '0': 'Automatización de procesos de mantenimiento',
    '1': 'Registro digital de incidencias',
    '2': 'Panel interactivo de seguimiento',
    '3': 'Optimización de recursos y tiempos',
    '4': 'Histórico de operaciones',
    '5': 'Soporte multiplataforma',
    '6': 'Interfaz amigable y responsiva'
  },
  challenges: {
    '0': 'Procesos manuales sin estandarización',
    '1': 'Falta de codificación e inventario de equipos',
    '2': 'Ausencia de registros y manuales técnicos actualizados',
    '3': 'Inexistencia de programa preventivo formal'
  },
  solutions: {
    '0': 'Diagnóstico con entrevistas y fichas de evaluación',
    '1': 'Manual de mantenimiento preventivo bajo norma COVENIN 3049-93',
    '2': 'Portal web con calendario, registros y notificaciones',
    '3': 'Metodologías lean e integración digital con PHP y React'
  },
  results: {
    '0': 'Reducción del 30% en tiempos de registro de incidencias',
    '1': 'Mayor trazabilidad y control sobre las operaciones',
    '2': 'Disminución de fallas críticas en equipos de producción',
    '3': 'Adopción positiva por parte de operarios y supervisores'
  },
  role: 'UX Researcher & Desarrolladora Full-Stack',
  team: {
    '0': 'María Fernanda (UX & Desarrollo)',
    '1': 'Equipo de Ingeniería de Producción',
    '2': 'Supervisor de Planta'
  }
}
,
      'task-management': {
        id: 'task-management',
        title: 'KidMoodies',
        tech: ['Figma', 'Research', 'Notion'],
        description: 'Aplicación que presta servicios de streaming basados en las emociones de su público',
        longDescription: 'Proyecto de diseño y conceptualización de una aplicación innovadora que adapta contenido audiovisual en función de las emociones de los usuarios. Se combinaron investigación en UX con diseño de interfaz centrada en la experiencia emocional.',
        category: 'Aplicación Móvil',
        features: {
          '0': 'Interfaz personalizada según estados de ánimo',
          '1': 'Prototipo navegable en Figma',
          '2': 'Integración de cuestionarios emocionales',
          '3': 'Recomendaciones dinámicas de contenido',
          '4': 'Estilo visual lúdico y atractivo',
          '5': 'Diseño mobile-first',
          '6': 'Propuesta de gamificación'
        },
        challenges: {
          '0': 'Traducir emociones en patrones de interacción digital',
          '1': 'Equilibrar experiencia lúdica con funcionalidad',
          '2': 'Validar hipótesis con un público infantil',
          '3': 'Diseñar un flujo claro con múltiples variables emocionales'
        },
        solutions: {
          '0': 'Aplicación de técnicas de design thinking',
          '1': 'Creación de user personas y journey maps',
          '2': 'Iteración de prototipos de baja a alta fidelidad',
          '3': 'Pruebas con usuarios para ajustar visuales y navegación'
        },
        results: {
          '0': 'Validación positiva de concepto en investigación inicial',
          '1': 'Prototipo funcional en Figma con flujos completos',
          '2': 'Retroalimentación favorable en pruebas de usabilidad',
          '3': 'Reconocimiento como proyecto innovador en UX'
        },
        role: 'UX Researcher y Diseñadora UI/UX',
        team: {
          '0': 'María Fernanda (UX/UI Designer)',
          '1': 'Equipo de Investigación Académica',
          '2': 'Colaboradores externos'
        }
      },
      'dashboard-analytics': {
        id: 'dashboard-analytics',
        title: 'CestAhorro',
        tech: ['Research', 'User Persona', 'Test'],
        description: 'Webapp para consumidores que necesitan ahorrar en la compra en supermercados',
        longDescription: 'Aplicación web enfocada en optimizar la compra de productos de supermercado mediante comparación de precios y generación de listas inteligentes. Diseñada para mejorar la toma de decisiones de compra y fomentar hábitos de ahorro.',
        category: 'Visualización de Datos',
        features: {
          '0': 'Comparador de precios en supermercados',
          '1': 'Listas inteligentes de compra',
          '2': 'Visualización gráfica de gastos',
          '3': 'Generación de reportes de ahorro',
          '4': 'Filtros avanzados de productos',
          '5': 'Diseño responsivo y accesible',
          '6': 'Test de usabilidad con consumidores reales'
        },
        challenges: {
          '0': 'Procesar datos de múltiples fuentes con consistencia',
          '1': 'Crear visualizaciones claras y útiles para no expertos',
          '2': 'Diseñar flujos simples para usuarios diversos',
          '3': 'Mantener el enfoque en accesibilidad y ahorro'
        },
        solutions: {
          '0': 'Desarrollo de user personas y escenarios de uso',
          '1': 'Wireframes iterativos con feedback de usuarios',
          '2': 'Prototipado interactivo para validación temprana',
          '3': 'Test A/B para optimizar visualización de datos'
        },
        results: {
          '0': 'Mayor conciencia de ahorro en los usuarios testeados',
          '1': 'Validación positiva de la interfaz en pruebas de usabilidad',
          '2': 'Mejora en la percepción de control sobre gastos',
          '3': 'Selección como caso destacado en proyectos académicos'
        },
        role: 'UX Researcher y Diseñadora UX',
        team: {
          '0': 'María Fernanda (Líder de UX)',
          '1': 'Equipo de Desarrollo Académico',
          '2': 'Mentores de Proyecto'
        }
      },
      'mobile-app-ui': {
        id: 'mobile-app-ui',
        title: 'Alimentos Innova',
        tech: ['Figma', 'Prototyping', 'User Research'],
        description: 'Diseño completo de interfaz para aplicación móvil de fitness',
        longDescription: 'Diseño de interfaz y experiencia de usuario para una aplicación móvil orientada a promover hábitos alimenticios saludables y rutinas de fitness. Incluye investigación, prototipado y pruebas de usabilidad para garantizar una experiencia clara y motivadora.',
        category: 'Diseño UX/UI',
        features: {
          '0': 'Investigación con usuarios sobre hábitos alimenticios',
          '1': 'Prototipos interactivos en Figma',
          '2': 'Sistema de diseño modular',
          '3': 'Microinteracciones motivacionales',
          '4': 'Cumplimiento de estándares de accesibilidad',
          '5': 'Flujos claros de registro y seguimiento',
          '6': 'Pruebas de usabilidad con retroalimentación iterativa'
        },
        challenges: {
          '0': 'Simplificar información nutricional sin perder precisión',
          '1': 'Crear una experiencia atractiva y motivadora',
          '2': 'Garantizar accesibilidad para distintos perfiles',
          '3': 'Equilibrar contenido denso con una UI limpia'
        },
        solutions: {
          '0': 'Aplicación de divulgación progresiva en UI',
          '1': 'Uso de gamificación para aumentar el engagement',
          '2': 'Prototipado rápido para validar decisiones de diseño',
          '3': 'Incorporación de lineamientos de accesibilidad WCAG'
        },
        results: {
          '0': 'Aumento en el interés por hábitos saludables en pruebas piloto',
          '1': 'Retroalimentación positiva del 90% en pruebas de usabilidad',
          '2': 'Flujos de usuario más claros tras iteraciones',
          '3': 'Base sólida para futura implementación técnica'
        },
        role: 'Diseñadora UI/UX Líder',
        team: {
          '0': 'María Fernanda (Diseñadora UX/UI)',
          '1': 'Investigador UX',
          '2': 'Mentor de Proyecto'
        }
      },
      // En spanishTranslations, dentro de project.projects:
'ai-project': {
  id: 'ai-project',
  title: 'Oha.ai - Plataforma Todo en Uno',
  tech: ['React', 'Node.js', 'FastAPI', 'REST API', 'OpenAI API', 'Generative AI', 'NLP', 'Cloud Services'],
  description: 'Plataforma integral de inteligencia artificial para creación de contenido en múltiples formatos',
  longDescription: 'Oha.ai es una plataforma todo en uno de inteligencia artificial diseñada para facilitar la creación de contenido en texto, imágenes, audio, vídeo y chatbots personalizados. Como desarrolladora fullstack, participé en el diseño e implementación de la arquitectura que integra APIs de IA, servicios en la nube y un frontend interactivo. La solución permite a usuarios y empresas generar contenido de forma rápida y eficiente, centralizando en un solo espacio lo que normalmente requiere varias aplicaciones.',
  category: 'Inteligencia Artificial',
  features: {
    '0': 'Redacción de textos con más de 90 plantillas',
    '1': 'Generación y edición de imágenes con modelos de visión',
    '2': 'Creación de voz sintética y transcripciones automáticas',
    '3': 'Producción de vídeos con asistentes inteligentes',
    '4': 'Entrenamiento de chatbots personalizados con datos propios',
    '5': 'Soporte multilenguaje para contenido global',
    '6': 'Asistente conversacional avanzado con API de OpenAI'
  },
  challenges: {
    '0': 'Integrar múltiples APIs (texto, imagen, voz, vídeo) en una arquitectura unificada',
    '1': 'Garantizar escalabilidad y rendimiento en operaciones intensivas',
    '2': 'Diseñar un flujo de usuario simple sobre una base tecnológica compleja',
    '3': 'Mantener altos estándares de seguridad y cumplimiento (SOC2, ISO 27001, GDPR)'
  },
  solutions: {
    '0': 'Implementación de APIs REST para orquestar los servicios de IA',
    '1': 'Integración de OpenAI API y motores de generación de imágenes',
    '2': 'Arquitectura basada en microservicios con Node.js y FastAPI',
    '3': 'Uso de servicios en la nube para almacenamiento seguro y escalable'
  },
  results: {
    '0': 'Reducción significativa del tiempo de creación de contenido',
    '1': 'Centralización de procesos que antes requerían múltiples aplicaciones',
    '2': 'Adopción positiva tanto por usuarios individuales como empresas',
    '3': 'Reconocimiento como solución innovadora en el ecosistema de herramientas IA'
  },
  role: 'Fullstack Developer & UX/UI Designer',
  team: {
    '0': 'María Fernanda (Fullstack Developer)',
    '1': 'Equipo de Ingeniería de IA',
    '2': 'Colaboradores externos en diseño y estrategia'
  }
},

'reputation-algorithm': {
  id: 'reputation-algorithm',
  title: 'Shop And Gets - Tienda Online Full-Stack',
  tech: ['Flutter', 'Node.js', 'REST API', 'Microservicios', 'Cloud Services'],
  description: 'Plataforma full-stack para compras internacionales y gestión logística en tiempo real',
  longDescription: 'Desarrollamos una tienda online full-stack que moderniza la plataforma de Shop And Gets, integrando mejoras en diseño, rendimiento y funcionalidad. El sistema permite a los usuarios gestionar compras internacionales, envíos puerta a puerta y trámites aduaneros desde cualquier dispositivo. Con Flutter como frontend multiplataforma y un backend robusto basado en arquitectura de microservicios, garantizamos escalabilidad, seguridad y una experiencia fluida. La plataforma centraliza procesos de logística, consolidación de mercancías y gestión de costos en tiempo real, aportando transparencia y confianza a clientes de Estados Unidos, China, España y más.',
  category: 'E-commerce & Logística',
  features: {
    '0': 'Frontend multiplataforma en Flutter',
    '1': 'Backend escalable con arquitectura moderna',
    '2': 'Gestión integral de envíos internacionales',
    '3': 'Cálculo de costos y tarifas en tiempo real',
    '4': 'Rastreo de carga y estados de envío',
    '5': 'Soporte personalizado desde la app',
    '6': 'Integración con agentes aduaneros y courier'
  },
  challenges: {
    '0': 'Unificar procesos de logística internacional en una sola plataforma',
    '1': 'Garantizar seguridad y cumplimiento normativo en múltiples países',
    '2': 'Escalar el sistema para grandes volúmenes de transacciones',
    '3': 'Mantener una experiencia de usuario simple y confiable'
  },
  solutions: {
    '0': 'Implementación de APIs REST para comunicación ágil entre módulos',
    '1': 'Despliegue en servicios en la nube con alta disponibilidad',
    '2': 'Optimización del frontend en Flutter para rendimiento móvil y web',
    '3': 'Integración con sistemas de courier y agentes aduaneros'
  },
  results: {
    '0': 'Incremento en la satisfacción del cliente gracias a la transparencia en procesos',
    '1': 'Reducción en tiempos de gestión de envíos y consolidación de carga',
    '2': 'Mayor competitividad en el mercado gracias a precios claros y servicio eficiente',
    '3': 'Plataforma consolidada como líder en logística de compras internacionales'
  },
  role: 'Fullstack Developer',
  team: {
    '0': 'María Fernanda (Fullstack Developer)',
    '1': 'Equipo de Ingeniería de Software',
    '2': 'Expertos en Logística Internacional'
  }
}

    }
  }
};

const englishTranslations: Translations = {
footer: {
  frameTitle: 'System Information',
  brandName: 'María Fernanda',
  brandRole: 'UX/UI Designer & Developer',
  brandDescription: 'Creating unique digital experiences that combine innovative design with high-quality technical development.',
  funQuote: 'Code is poetry, design is music',
  quickLinks: 'Quick Links',
  links: {
    home: 'Home',
    about: 'About Me',
    projects: 'Projects',
    contact: 'Contact'
  },
  connect: 'Connect With Me',
  status: 'Available for projects',
  copyright: 'María Fernanda. All rights reserved.',
  madeWith: 'Made with ❤️ and lots of ☕',
  backToTop: 'Back to Top'
},
contact: {
  frameTitle: 'Contact',
  title: 'Let’s Talk',
  titleHighlight: 'together',
  badge1: 'Available for projects',
  badge2: 'Fast response',
  description: 'I am always open to new opportunities and interesting collaborations.',
  cardTitle: 'Contact Information',
  name: 'Fernanda Farfán',
  role: 'UX/UI Designer & Developer',
  sendEmail: 'Send Email',
  downloadCV: 'Download CV',
  followMe: 'Follow me on:',
  illustrationTitle: 'Design',
  quote: 'Every project is an opportunity to create something extraordinary'
},
milestones: {
  title: 'My',
  titleHighlight: 'Milestones',
  badge1: 'Career',
  badge2: 'Comprehensive',
  description: 'A blend of academic experience, social projects, continuous learning, and creativity that define how I work and grow.',
  items: {
    '0': {
      title: 'Teacher at "Agents of Change"',
      description: 'Hired by Jesuïtes Educació, I taught Design Thinking at Salesians Sarrià, training young people in innovation, creativity, and problem-solving.'
    },
    '1': {
      title: 'Social Work',
      description: 'I collaborated for 3 years with Fundamama, a foundation dedicated to fighting breast cancer, supporting social impact projects and applying design and technology to help the community.'
    },
    '2': {
      title: 'Hackathons & Events',
      description: 'I constantly participate in hackathons and conferences to keep learning, innovating, and being inspired by new ideas.'
    },
    '3': {
      title: 'Teamwork',
      description: 'I enjoy building in collaboration, contributing my technical skills, and learning from different perspectives.'
    },
    '4': {
      title: 'Personal Creativity',
      description: 'I am passionate about drawing, writing, and exploring new languages as forms of expression and personal growth.'
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
  letsTalk: 'Let’s Talk'
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
  title: 'Production',
  titleHighlight: 'Engineer',
  badge: 'Full-Stack Developer + UX/UI + R&D+I Innovation',
  description: 'I am Mafer, Production Engineer, UX/UI designer, and full-stack developer. I am passionate about creating digital solutions from research and design to technical implementation, integrating creativity, engineering, and technology to deliver innovative products with real impact.',
  cta: 'View projects'
},
projects: {
  title: 'My',
  titleHighlight: 'Projects',
  badge1: 'Portfolio',
  badge2: 'Featured',
  description: 'A collection of projects showcasing my experience in web development, UX/UI design, and innovative technology solutions.',
  viewAll: 'View all projects',
  viewProject: 'View Project',
  projectDetails: {
    'ecommerce-platform': {
      title: 'Inmetep',
      description: 'Improvement proposal for a maintenance control system applying Industry 4.0'
    },
    'task-management': {
      title: 'KidMoodies',
      description: 'Application that provides streaming services based on the emotions of its audience'
    },
    'dashboard-analytics': {
      title: 'CestAhorro',
      description: 'Web app for consumers who need to save money on supermarket shopping'
    },
    'mobile-app-ui': {
      title: 'Alimentos Innova',
      description: 'Creation of a website for a food manufacturing company'
    },
    'ai-project': {
      title: 'Oha.ai',
      description: 'Comprehensive artificial intelligence platform for creating content in multiple formats'
    },
    'reputation-algorithm': {
      title: 'Shop And Gets',
      description: 'Full-stack platform for international shopping and real-time logistics management'
    },
  },
  categories: {
    'frontend': 'Frontend',
    'full stack': 'Full Stack',
    'design': 'Design',
    'ux/ui': 'UX/UI',
    'web development': 'Web Development',
    'mobile app': 'Mobile App',
    'data visualization': 'Data Visualization',
    'ux/ui design': 'UX/UI Design',
    'machine learning': 'Machine Learning',
    'ia': 'Artificial Intelligence',
    'research': 'Research',
    'data science': 'Online Store'
  },
},

project: {
  backToPortfolio: 'Back to portfolio',
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
  projects: {
    'ecommerce-platform': {
      id: 'ecommerce-platform',
      title: 'Inmetep',
      tech: ['Research', 'PHP', 'React'],
      description: 'Improvement proposal for a maintenance control system applying Industry 4.0',
      longDescription: 'Project developed at the metalworking company INMETEP C.A. with the goal of optimizing maintenance management according to the COVENIN 3049-93 standard. Issues were diagnosed in documentation, organization, and prevention, designing a digital preventive maintenance system with technical manuals, schedules, online registration, and a support web portal. The solution was based on Industry 4.0 principles to ensure efficiency, traceability, and reduced downtime in the production line.',
      category: 'Full Stack',
      features: {
        '0': 'Automation of maintenance processes',
        '1': 'Digital incident logging',
        '2': 'Interactive tracking dashboard',
        '3': 'Optimization of resources and time',
        '4': 'Operations history',
        '5': 'Cross-platform support',
        '6': 'User-friendly and responsive interface'
      },
      challenges: {
        '0': 'Manual processes without standardization',
        '1': 'Lack of coding and equipment inventory',
        '2': 'Absence of updated records and technical manuals',
        '3': 'No formal preventive program'
      },
      solutions: {
        '0': 'Diagnosis with interviews and evaluation sheets',
        '1': 'Preventive maintenance manual under COVENIN 3049-93',
        '2': 'Web portal with calendar, records, and notifications',
        '3': 'Lean methodologies and digital integration with PHP and React'
      },
      results: {
        '0': '30% reduction in incident registration times',
        '1': 'Greater traceability and control over operations',
        '2': 'Decrease in critical failures in production equipment',
        '3': 'Positive adoption by operators and supervisors'
      },
      role: 'UX Researcher & Full-Stack Developer',
      team: {
        '0': 'María Fernanda (UX & Development)',
        '1': 'Production Engineering Team',
        '2': 'Plant Supervisor'
      }
    },
    'task-management': {
      id: 'task-management',
      title: 'KidMoodies',
      tech: ['Figma', 'Research', 'Notion'],
      description: 'Application that provides streaming services based on the emotions of its audience',
      longDescription: 'Design and conceptualization project for an innovative app that adapts audiovisual content based on users’ emotions. UX research was combined with an interface design focused on emotional experience.',
      category: 'Mobile Application',
      features: {
        '0': 'Personalized interface based on moods',
        '1': 'Navigable prototype in Figma',
        '2': 'Integration of emotional questionnaires',
        '3': 'Dynamic content recommendations',
        '4': 'Playful and appealing visual style',
        '5': 'Mobile-first design',
        '6': 'Gamification proposal'
      },
      challenges: {
        '0': 'Translating emotions into digital interaction patterns',
        '1': 'Balancing playful experience with functionality',
        '2': 'Validating hypotheses with a child audience',
        '3': 'Designing a clear flow with multiple emotional variables'
      },
      solutions: {
        '0': 'Application of design thinking techniques',
        '1': 'Creation of user personas and journey maps',
        '2': 'Iteration from low- to high-fidelity prototypes',
        '3': 'User testing to adjust visuals and navigation'
      },
      results: {
        '0': 'Positive concept validation in initial research',
        '1': 'Functional prototype in Figma with complete flows',
        '2': 'Favorable feedback in usability tests',
        '3': 'Recognition as an innovative UX project'
      },
      role: 'UX Researcher & UI/UX Designer',
      team: {
        '0': 'María Fernanda (UX/UI Designer)',
        '1': 'Academic Research Team',
        '2': 'External Collaborators'
      }
    },
    'dashboard-analytics': {
      id: 'dashboard-analytics',
      title: 'CestAhorro',
      tech: ['Research', 'User Persona', 'Test'],
      description: 'Webapp for consumers who need to save money on supermarket shopping',
      longDescription: 'Web application focused on optimizing supermarket shopping by comparing prices and generating smart lists. Designed to improve purchase decision-making and promote saving habits.',
      category: 'Data Visualization',
      features: {
        '0': 'Supermarket price comparison',
        '1': 'Smart shopping lists',
        '2': 'Graphical expense visualization',
        '3': 'Savings report generation',
        '4': 'Advanced product filters',
        '5': 'Responsive and accessible design',
        '6': 'Usability testing with real consumers'
      },
      challenges: {
        '0': 'Processing data from multiple sources consistently',
        '1': 'Creating clear and useful visualizations for non-experts',
        '2': 'Designing simple flows for diverse users',
        '3': 'Maintaining focus on accessibility and savings'
      },
      solutions: {
        '0': 'Development of user personas and scenarios',
        '1': 'Iterative wireframes with user feedback',
        '2': 'Interactive prototyping for early validation',
        '3': 'A/B testing to optimize data visualization'
      },
      results: {
        '0': 'Increased savings awareness among tested users',
        '1': 'Positive interface validation in usability testing',
        '2': 'Improved perception of expense control',
        '3': 'Selected as a featured academic project'
      },
      role: 'UX Researcher & UX Designer',
      team: {
        '0': 'María Fernanda (UX Lead)',
        '1': 'Academic Development Team',
        '2': 'Project Mentors'
      }
    },
    'mobile-app-ui': {
      id: 'mobile-app-ui',
      title: 'Alimentos Innova',
      tech: ['Figma', 'Prototyping', 'User Research'],
      description: 'Complete UI design for a fitness mobile app',
      longDescription: 'UI and UX design for a mobile app focused on promoting healthy eating habits and fitness routines. Includes research, prototyping, and usability testing to ensure a clear and motivating experience.',
      category: 'UX/UI Design',
      features: {
        '0': 'User research on eating habits',
        '1': 'Interactive prototypes in Figma',
        '2': 'Modular design system',
        '3': 'Motivational microinteractions',
        '4': 'Compliance with accessibility standards',
        '5': 'Clear registration and tracking flows',
        '6': 'Usability testing with iterative feedback'
      },
      challenges: {
        '0': 'Simplifying nutritional information without losing accuracy',
        '1': 'Creating an attractive and motivating experience',
        '2': 'Ensuring accessibility for different profiles',
        '3': 'Balancing dense content with a clean UI'
      },
      solutions: {
        '0': 'Progressive disclosure in UI',
        '1': 'Gamification to increase engagement',
        '2': 'Rapid prototyping to validate design decisions',
        '3': 'Incorporation of WCAG accessibility guidelines'
      },
      results: {
        '0': 'Increased interest in healthy habits in pilot tests',
        '1': '90% positive feedback in usability tests',
        '2': 'Clearer user flows after iterations',
        '3': 'Solid foundation for future technical implementation'
      },
      role: 'Lead UI/UX Designer',
      team: {
        '0': 'María Fernanda (UX/UI Designer)',
        '1': 'UX Researcher',
        '2': 'Project Mentor'
      }
    },
    'ai-project': {
      id: 'ai-project',
      title: 'Oha.ai - All-in-One Platform',
      tech: ['React', 'Node.js', 'FastAPI', 'REST API', 'OpenAI API', 'Generative AI', 'NLP', 'Cloud Services'],
      description: 'Comprehensive AI platform for content creation in multiple formats',
      longDescription: 'Oha.ai is an all-in-one AI platform designed to facilitate content creation in text, images, audio, video, and personalized chatbots. As a full-stack developer, I participated in the design and implementation of the architecture integrating AI APIs, cloud services, and an interactive frontend. The solution enables users and companies to generate content quickly and efficiently, centralizing in one place what usually requires several applications.',
      category: 'Artificial Intelligence',
      features: {
        '0': 'Text writing with over 90 templates',
        '1': 'Image generation and editing with vision models',
        '2': 'Synthetic voice creation and automatic transcriptions',
        '3': 'Video production with intelligent assistants',
        '4': 'Training personalized chatbots with own data',
        '5': 'Multilingual support for global content',
        '6': 'Advanced conversational assistant with OpenAI API'
      },
      challenges: {
        '0': 'Integrating multiple APIs (text, image, voice, video) into a unified architecture',
        '1': 'Ensuring scalability and performance in intensive operations',
        '2': 'Designing a simple user flow on a complex technological base',
        '3': 'Maintaining high security and compliance standards (SOC2, ISO 27001, GDPR)'
      },
      solutions: {
        '0': 'Implementation of REST APIs to orchestrate AI services',
        '1': 'Integration of OpenAI API and image generation engines',
        '2': 'Microservices architecture with Node.js and FastAPI',
        '3': 'Use of cloud services for secure and scalable storage'
      },
      results: {
        '0': 'Significant reduction in content creation time',
        '1': 'Centralization of processes that previously required multiple apps',
        '2': 'Positive adoption by both individual users and companies',
        '3': 'Recognition as an innovative solution in the AI tools ecosystem'
      },
      role: 'Fullstack Developer & UX/UI Designer',
      team: {
        '0': 'María Fernanda (Fullstack Developer)',
        '1': 'AI Engineering Team',
        '2': 'External collaborators in design and strategy'
      }
    },
    'reputation-algorithm': {
      id: 'reputation-algorithm',
      title: 'Shop And Gets - Full-Stack Online Store',
      tech: ['Flutter', 'Node.js', 'REST API', 'Microservices', 'Cloud Services'],
      description: 'Full-stack platform for international shopping and real-time logistics management',
      longDescription: 'We developed a full-stack online store modernizing the Shop And Gets platform, integrating improvements in design, performance, and functionality. The system allows users to manage international shopping, door-to-door shipping, and customs processes from any device. With Flutter as a cross-platform frontend and a robust backend based on microservices, we ensured scalability, security, and a smooth experience. The platform centralizes logistics processes, merchandise consolidation, and real-time cost management, providing transparency and trust to clients in the United States, China, Spain, and beyond.',
      category: 'E-commerce & Logistics',
      features: {
        '0': 'Cross-platform frontend in Flutter',
        '1': 'Scalable backend with modern architecture',
        '2': 'Comprehensive management of international shipping',
        '3': 'Real-time cost and rate calculation',
        '4': 'Cargo tracking and shipping status',
        '5': 'Personalized support from the app',
        '6': 'Integration with customs agents and couriers'
      },
      challenges: {
        '0': 'Unifying international logistics processes in a single platform',
        '1': 'Ensuring security and regulatory compliance across countries',
        '2': 'Scaling the system for high transaction volumes',
        '3': 'Maintaining a simple and reliable user experience'
      },
      solutions: {
        '0': 'Implementation of REST APIs for agile module communication',
        '1': 'Deployment in cloud services with high availability',
        '2': 'Optimization of Flutter frontend for mobile and web performance',
        '3': 'Integration with courier systems and customs agents'
      },
      results: {
        '0': 'Increased customer satisfaction thanks to process transparency',
        '1': 'Reduced shipping management and consolidation times',
        '2': 'Greater market competitiveness with clear pricing and efficient service',
        '3': 'Platform consolidated as a leader in international shopping logistics'
      },
      role: 'Fullstack Developer',
      team: {
        '0': 'María Fernanda (Fullstack Developer)',
        '1': 'Software Engineering Team',
        '2': 'International Logistics Experts'
      }
    }
  }
}


};

// Traducciones en francés
const frenchTranslations: Translations = {
footer: {
  frameTitle: 'Informació del Sistema',
  brandName: 'María Fernanda',
  brandRole: 'Dissenyadora UX/UI & Desenvolupadora',
  brandDescription: 'Creant experiències digitals úniques que combinen disseny innovador amb desenvolupament tècnic de qualitat.',
  funQuote: 'El codi és poesia, el disseny és música',
  quickLinks: 'Enllaços Ràpids',
  links: {
    home: 'Inici',
    about: 'Sobre mi',
    projects: 'Projectes',
    contact: 'Contacte'
  },
  connect: 'Connecta amb mi',
  status: 'Disponible per a projectes',
  copyright: 'María Fernanda. Tots els drets reservats.',
  madeWith: 'Fet amb ❤️ i molt ☕',
  backToTop: 'Pujar'
},
contact: {
  frameTitle: 'Contacte',
  title: 'Parlem',
  titleHighlight: 'junts',
  badge1: 'Disponible per a projectes',
  badge2: 'Resposta ràpida',
  description: 'Sempre estic oberta a noves oportunitats i col·laboracions interessants.',
  cardTitle: 'Informació de contacte',
  name: 'Fernanda Farfán',
  role: 'Dissenyadora UX/UI & Desenvolupadora',
  sendEmail: 'Enviar Email',
  downloadCV: 'Descarregar CV',
  followMe: 'Segueix-me a:',
  illustrationTitle: 'Disseny',
  quote: 'Cada projecte és una oportunitat per crear quelcom extraordinari'
},
milestones: {
  title: 'Els meus',
  titleHighlight: 'Fites',
  badge1: 'Trajectòria',
  badge2: 'Integral',
  description: 'Una barreja d’experiència acadèmica, projectes socials, aprenentatge continu i creativitat que defineixen la meva manera de treballar i créixer.',
  items: {
    '0': {
      title: 'Professora a "Agents del Canvi"',
      description: 'Contractada per Jesuïtes Educació, vaig impartir classes de Design Thinking a Salesians Sarrià, formant joves en innovació, creativitat i resolució de problemes.'
    },
    '1': {
      title: 'Treball Social',
      description: 'Vaig col·laborar durant 3 anys amb Fundamama, una fundació dedicada a la lluita contra el càncer de mama, donant suport a projectes d’impacte social i aplicant disseny i tecnologia per ajudar la comunitat.'
    },
    '2': {
      title: 'Hackatons & Esdeveniments',
      description: 'Participo constantment en hackatons i conferències per seguir aprenent, innovar i nodrir-me de noves idees.'
    },
    '3': {
      title: 'Treball en Equip',
      description: 'Gaudeixo construint en col·laboració, aportant les meves habilitats tècniques i aprenent de diferents perspectives.'
    },
    '4': {
      title: 'Creativitat Personal',
      description: 'M’apassiona dibuixar, escriure i explorar nous idiomes com a formes d’expressió i creixement personal.'
    }
  }
},
testimonials: {
  frameTitle: 'Testimonis',
  title: 'El que diuen',
  titleHighlight: 'de mi',
  badge1: 'Testimonis',
  badge2: 'Reals',
  description: 'Comentaris i experiències de clients i col·legues que han treballat amb mi en diferents projectes.',
  helpful: 'Útil'
},
nav: {
  home: 'Inici',
  about: 'Sobre',
  projects: 'Projectes',
  contact: 'Contacte',
  letsTalk: 'Parlem'
},

  hero: {
  name: 'María Fernanda',
  skills: {
    uxui: 'UX/UI',
    designer: 'Dissenyadora',
    full: 'Full',
    stack: 'Stack',
    developer: 'Desenvolupadora',
    creative: 'Creativa'
  },
  subtitle: 'Especialitzada en crear experiències web úniques'
},
about: {
  title: 'Enginyera',
  titleHighlight: 'de Producció',
  badge: 'Full-Stack Developer + UX/UI + Innovació I+D+i',
  description: 'Soc la Mafer, Enginyera de Producció, dissenyadora UX/UI i desenvolupadora full-stack. M’apassiona crear solucions digitals des de la recerca i el disseny fins a la implementació tècnica, integrant creativitat, enginyeria i tecnologia per generar productes innovadors amb impacte real.',
  cta: 'Veure projectes'
},
projects: {
  title: 'Els meus',
  titleHighlight: 'Projectes',
  badge1: 'Portfolio',
  badge2: 'Destacat',
  description: 'Una col·lecció de projectes que demostren la meva experiència en desenvolupament web, disseny UX/UI i solucions tecnològiques innovadores.',
  viewAll: 'Veure tots els projectes',
  viewProject: 'Veure Projecte',
  projectDetails: {
    'ecommerce-platform': {
      title: 'Inmetep',
      description: 'Proposta de millora en un sistema de control de manteniment aplicant la Indústria 4.0'
    },
    'task-management': {
      title: 'KidMoodies',
      description: 'Aplicació que ofereix serveis de streaming basats en les emocions del seu públic'
    },
    'dashboard-analytics': {
      title: 'CestAhorro',
      description: 'Webapp per a consumidors que necessiten estalviar en la compra de supermercats'
    },
    'mobile-app-ui': {
      title: 'Alimentos Innova',
      description: 'Creació d’un lloc web per a una empresa fabricant de productes alimentaris'
    },
    'ai-project': {
      title: 'Oha.ai',
      description: 'Plataforma integral d’intel·ligència artificial per a la creació de continguts en múltiples formats'
    },
    'reputation-algorithm': {
      title: 'Shop And Gets',
      description: 'Plataforma full-stack per a compres internacionals i gestió logística en temps real'
    },
  },
  categories: {
    'frontend': 'Frontend',
    'full stack': 'Full Stack',
    'design': 'Disseny',
    'ux/ui': 'UX/UI',
    'web development': 'Desenvolupament Web',
    'mobile app': 'App Mòbil',
    'data visualization': 'Visualització de Dades',
    'ux/ui design': 'Disseny UX/UI',
    'machine learning': 'Machine Learning',
    'ia': 'Intel·ligència Artificial',
    'research': 'Recerca',
    'data science': 'Botiga Online'
  },
},

project: {
    backToPortfolio: 'Tornar al portafolis',
    preview: 'Vista prèvia',
    gallery: 'Galeria',
    screenshot: 'Captura de pantalla',
    technologies: 'Tecnologies',
    features: 'Característiques',
    challengesAndSolutions: 'Reptes i Solucions',
    challenges: 'Reptes',
    solutions: 'Solucions',
    results: 'Resultats',
    team: 'Equip',
    myRole: 'El meu rol',
    teamMembers: 'Membres de l’equip',
    loading: 'Carregant',
    loadingMessage: 'Carregant informació del projecte...',
    viewLive: 'Veure en viu',
    viewCode: 'Veure codi',
    viewDesign: 'Veure disseny',
    projects: {
      'ecommerce-platform': {
  id: 'ecommerce-platform',
  title: 'Inmetep',
  tech: ['Research', 'PHP', 'React'],
  description: 'Proposta de millora en un sistema de control de manteniment aplicant la indústria 4.0',
  longDescription: 'Projecte desenvolupat a l’empresa metalmecànica INMETEP C.A. amb l’objectiu d’optimitzar la gestió de manteniment segons la norma COVENIN 3049-93. Es van diagnosticar falles en la documentació, organització i prevenció, dissenyant un sistema digital de manteniment preventiu amb manuals tècnics, cronogrames, registre en línia i portal web de suport. La solució es va fonamentar en principis de la indústria 4.0 per garantir eficiència, traçabilitat i reducció de temps d’inactivitat en la línia de producció.',
  category: 'Full Stack',
  features: {
    '0': 'Automatització de processos de manteniment',
    '1': 'Registre digital d’incidències',
    '2': 'Panell interactiu de seguiment',
    '3': 'Optimització de recursos i temps',
    '4': 'Històric d’operacions',
    '5': 'Suport multiplataforma',
    '6': 'Interfície amigable i responsiva'
  },
  challenges: {
    '0': 'Processos manuals sense estandardització',
    '1': 'Manca de codificació i inventari d’equips',
    '2': 'Absència de registres i manuals tècnics actualitzats',
    '3': 'Inexistència de programa preventiu formal'
  },
  solutions: {
    '0': 'Diagnòstic amb entrevistes i fitxes d’avaluació',
    '1': 'Manual de manteniment preventiu sota norma COVENIN 3049-93',
    '2': 'Portal web amb calendari, registres i notificacions',
    '3': 'Metodologies lean i integració digital amb PHP i React'
  },
  results: {
    '0': 'Reducció del 30% en temps de registre d’incidències',
    '1': 'Major traçabilitat i control sobre les operacions',
    '2': 'Disminució de falles crítiques en equips de producció',
    '3': 'Adopció positiva per part d’operaris i supervisors'
  },
  role: 'UX Researcher & Desenvolupadora Full-Stack',
  team: {
    '0': 'María Fernanda (UX & Desenvolupament)',
    '1': 'Equip d’Enginyeria de Producció',
    '2': 'Supervisor de Planta'
  }
}
,
      'task-management': {
        id: 'task-management',
        title: 'KidMoodies',
        tech: ['Figma', 'Research', 'Notion'],
        description: 'Aplicació que presta serveis de streaming basats en les emocions del seu públic',
        longDescription: 'Projecte de disseny i conceptualització d’una aplicació innovadora que adapta contingut audiovisual en funció de les emocions dels usuaris. Es van combinar recerca en UX amb disseny d’interfície centrada en l’experiència emocional.',
        category: 'Aplicació Mòbil',
        features: {
          '0': 'Interfície personalitzada segons estats d’ànim',
          '1': 'Prototip navegable a Figma',
          '2': 'Integració de qüestionaris emocionals',
          '3': 'Recomanacions dinàmiques de contingut',
          '4': 'Estil visual lúdic i atractiu',
          '5': 'Disseny mobile-first',
          '6': 'Proposta de gamificació'
        },
        challenges: {
          '0': 'Traduir emocions en patrons d’interacció digital',
          '1': 'Equilibrar experiència lúdica amb funcionalitat',
          '2': 'Validar hipòtesis amb un públic infantil',
          '3': 'Dissenyar un flux clar amb múltiples variables emocionals'
        },
        solutions: {
          '0': 'Aplicació de tècniques de design thinking',
          '1': 'Creació de user personas i journey maps',
          '2': 'Iteració de prototips de baixa a alta fidelitat',
          '3': 'Proves amb usuaris per ajustar visuals i navegació'
        },
        results: {
          '0': 'Validació positiva del concepte en recerca inicial',
          '1': 'Prototip funcional a Figma amb fluxos complets',
          '2': 'Retroalimentació favorable en proves d’usabilitat',
          '3': 'Reconeixement com a projecte innovador en UX'
        },
        role: 'UX Researcher i Dissenyadora UI/UX',
        team: {
          '0': 'María Fernanda (UX/UI Designer)',
          '1': 'Equip de Recerca Acadèmica',
          '2': 'Col·laboradors externs'
        }
      },
      'dashboard-analytics': {
        id: 'dashboard-analytics',
        title: 'CestAhorro',
        tech: ['Research', 'User Persona', 'Test'],
        description: 'Webapp per a consumidors que necessiten estalviar en la compra a supermercats',
        longDescription: 'Aplicació web enfocada a optimitzar la compra de productes de supermercat mitjançant comparació de preus i generació de llistes intel·ligents. Dissenyada per millorar la presa de decisions de compra i fomentar hàbits d’estalvi.',
        category: 'Visualització de Dades',
        features: {
          '0': 'Comparador de preus en supermercats',
          '1': 'Llistes intel·ligents de compra',
          '2': 'Visualització gràfica de despeses',
          '3': 'Generació d’informes d’estalvi',
          '4': 'Filtres avançats de productes',
          '5': 'Disseny responsiu i accessible',
          '6': 'Test d’usabilitat amb consumidors reals'
        },
        challenges: {
          '0': 'Processar dades de múltiples fonts amb consistència',
          '1': 'Crear visualitzacions clares i útils per a no experts',
          '2': 'Dissenyar fluxos simples per a usuaris diversos',
          '3': 'Mantenir l’enfocament en accessibilitat i estalvi'
        },
        solutions: {
          '0': 'Desenvolupament de user personas i escenaris d’ús',
          '1': 'Wireframes iteratius amb feedback d’usuaris',
          '2': 'Prototipat interactiu per validació primerenca',
          '3': 'Test A/B per optimitzar visualització de dades'
        },
        results: {
          '0': 'Major consciència d’estalvi en els usuaris testejats',
          '1': 'Validació positiva de la interfície en proves d’usabilitat',
          '2': 'Millora en la percepció de control sobre despeses',
          '3': 'Selecció com a cas destacat en projectes acadèmics'
        },
        role: 'UX Researcher i Dissenyadora UX',
        team: {
          '0': 'María Fernanda (Líder de UX)',
          '1': 'Equip de Desenvolupament Acadèmic',
          '2': 'Mentors de Projecte'
        }
      },
      'mobile-app-ui': {
        id: 'mobile-app-ui',
        title: 'Aliments Innova',
        tech: ['Figma', 'Prototyping', 'User Research'],
        description: 'Disseny complet d’interfície per a aplicació mòbil de fitness',
        longDescription: 'Disseny d’interfície i experiència d’usuari per a una aplicació mòbil orientada a promoure hàbits alimentaris saludables i rutines de fitness. Inclou recerca, prototipat i proves d’usabilitat per garantir una experiència clara i motivadora.',
        category: 'Disseny UX/UI',
        features: {
          '0': 'Recerca amb usuaris sobre hàbits alimentaris',
          '1': 'Prototips interactius a Figma',
          '2': 'Sistema de disseny modular',
          '3': 'Microinteraccions motivacionals',
          '4': 'Compliment d’estàndards d’accessibilitat',
          '5': 'Fluxos clars de registre i seguiment',
          '6': 'Proves d’usabilitat amb retroalimentació iterativa'
        },
        challenges: {
          '0': 'Simplificar informació nutricional sense perdre precisió',
          '1': 'Crear una experiència atractiva i motivadora',
          '2': 'Garantir accessibilitat per a diferents perfils',
          '3': 'Equilibrar contingut dens amb una UI neta'
        },
        solutions: {
          '0': 'Aplicació de divulgació progressiva en UI',
          '1': 'Ús de gamificació per augmentar l’engagement',
          '2': 'Prototipat ràpid per validar decisions de disseny',
          '3': 'Incorporació de directrius d’accessibilitat WCAG'
        },
        results: {
          '0': 'Augment en l’interès per hàbits saludables en proves pilot',
          '1': 'Retroalimentació positiva del 90% en proves d’usabilitat',
          '2': 'Fluxos d’usuari més clars després d’iteracions',
          '3': 'Base sòlida per a futura implementació tècnica'
        },
        role: 'Dissenyadora UI/UX Líder',
        team: {
          '0': 'María Fernanda (Dissenyadora UX/UI)',
          '1': 'Investigador UX',
          '2': 'Mentor de Projecte'
        }
      },
      // En catalanTranslations, dins project.projects:
'ai-project': {
  id: 'ai-project',
  title: 'Oha.ai - Plataforma Tot en Un',
  tech: ['React', 'Node.js', 'FastAPI', 'REST API', 'OpenAI API', 'Generative AI', 'NLP', 'Cloud Services'],
  description: 'Plataforma integral d’intel·ligència artificial per a creació de contingut en múltiples formats',
  longDescription: 'Oha.ai és una plataforma tot en un d’intel·ligència artificial dissenyada per facilitar la creació de contingut en text, imatges, àudio, vídeo i chatbots personalitzats. Com a desenvolupadora fullstack, vaig participar en el disseny i implementació de l’arquitectura que integra APIs d’IA, serveis al núvol i un frontend interactiu. La solució permet a usuaris i empreses generar contingut de manera ràpida i eficient, centralitzant en un sol espai el que normalment requereix diverses aplicacions.',
  category: 'Intel·ligència Artificial',
  features: {
    '0': 'Redacció de textos amb més de 90 plantilles',
    '1': 'Generació i edició d’imatges amb models de visió',
    '2': 'Creació de veu sintètica i transcripcions automàtiques',
    '3': 'Producció de vídeos amb assistents intel·ligents',
    '4': 'Entrenament de chatbots personalitzats amb dades pròpies',
    '5': 'Suport multillenguatge per a contingut global',
    '6': 'Assistent conversacional avançat amb API d’OpenAI'
  },
  challenges: {
    '0': 'Integrar múltiples APIs (text, imatge, veu, vídeo) en una arquitectura unificada',
    '1': 'Garantir escalabilitat i rendiment en operacions intensives',
    '2': 'Dissenyar un flux d’usuari simple sobre una base tecnològica complexa',
    '3': 'Mantenir alts estàndards de seguretat i compliment (SOC2, ISO 27001, GDPR)'
  },
  solutions: {
    '0': 'Implementació d’APIs REST per orquestrar els serveis d’IA',
    '1': 'Integració d’OpenAI API i motors de generació d’imatges',
    '2': 'Arquitectura basada en microserveis amb Node.js i FastAPI',
    '3': 'Ús de serveis al núvol per a emmagatzematge segur i escalable'
  },
  results: {
    '0': 'Reducció significativa del temps de creació de contingut',
    '1': 'Centralització de processos que abans requerien múltiples aplicacions',
    '2': 'Adopció positiva tant per part d’usuaris individuals com empreses',
    '3': 'Reconeixement com a solució innovadora en l’ecosistema d’eines IA'
  },
  role: 'Fullstack Developer & UX/UI Designer',
  team: {
    '0': 'María Fernanda (Fullstack Developer)',
    '1': 'Equip d’Enginyeria d’IA',
    '2': 'Col·laboradors externs en disseny i estratègia'
  }
},

'reputation-algorithm': {
  id: 'reputation-algorithm',
  title: 'Shop And Gets - Botiga Online Full-Stack',
  tech: ['Flutter', 'Node.js', 'REST API', 'Microserveis', 'Cloud Services'],
  description: 'Plataforma full-stack per a compres internacionals i gestió logística en temps real',
  longDescription: 'Vam desenvolupar una botiga online full-stack que modernitza la plataforma de Shop And Gets, integrant millores en disseny, rendiment i funcionalitat. El sistema permet als usuaris gestionar compres internacionals, enviaments porta a porta i tràmits duaners des de qualsevol dispositiu. Amb Flutter com a frontend multiplataforma i un backend robust basat en arquitectura de microserveis, garantim escalabilitat, seguretat i una experiència fluida. La plataforma centralitza processos de logística, consolidació de mercaderies i gestió de costos en temps real, aportant transparència i confiança a clients dels Estats Units, la Xina, Espanya i més.',
  category: 'E-commerce & Logística',
  features: {
    '0': 'Frontend multiplataforma amb Flutter',
    '1': 'Backend escalable amb arquitectura moderna',
    '2': 'Gestió integral d’enviaments internacionals',
    '3': 'Càlcul de costos i tarifes en temps real',
    '4': 'Rastreig de càrrega i estats d’enviament',
    '5': 'Suport personalitzat des de l’app',
    '6': 'Integració amb agents duaners i courier'
  },
  challenges: {
    '0': 'Unificar processos de logística internacional en una sola plataforma',
    '1': 'Garantir seguretat i compliment normatiu en múltiples països',
    '2': 'Escalar el sistema per a grans volums de transaccions',
    '3': 'Mantenir una experiència d’usuari simple i fiable'
  },
  solutions: {
    '0': 'Implementació d’APIs REST per a comunicació àgil entre mòduls',
    '1': 'Desplegament en serveis al núvol amb alta disponibilitat',
    '2': 'Optimització del frontend en Flutter per a rendiment mòbil i web',
    '3': 'Integració amb sistemes de courier i agents duaners'
  },
  results: {
    '0': 'Increment en la satisfacció del client gràcies a la transparència en processos',
    '1': 'Reducció en temps de gestió d’enviaments i consolidació de càrrega',
    '2': 'Major competitivitat al mercat gràcies a preus clars i servei eficient',
    '3': 'Plataforma consolidada com a líder en logística de compres internacionals'
  },
  role: 'Fullstack Developer',
  team: {
    '0': 'María Fernanda (Fullstack Developer)',
    '1': 'Equip d’Enginyeria de Programari',
    '2': 'Experts en Logística Internacional'
  }
}

    }
  }


};