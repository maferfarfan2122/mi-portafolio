// filepath: /Users/Fernanda/mi-portafolio/src/app/pages/page-projects/page-projects.component.ts
import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '../translate.pipe';
import { TranslationService } from '../translation.services';
import { Location } from '@angular/common';

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  images: string[];
  technologies: string[];
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  liveUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;
  color: string;
  year: string;
  duration: string;
  team: string[];
  role: string;
}

@Component({
  selector: 'app-page-projects',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './page-projects.component.html',
  styleUrl: './page-projects.component.scss'
})
export class PageProjectsComponent implements OnInit, AfterViewInit {
  
  project: ProjectDetail | null = null;
  isLoading = true;
  private isBrowser = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.loadProject(projectId);
    });
  }

  ngAfterViewInit() {
    // Cualquier lógica específica del DOM debe ir aquí
    if (this.isBrowser) {
      // Inicializar animaciones o librerías que requieren DOM
      this.initializeClientOnlyFeatures();
    }
  }

  private initializeClientOnlyFeatures() {
    // Aquí puedes inicializar GSAP o cualquier otra librería
    // que requiera el DOM del navegador
  }

  private loadProject(id: string) {
    this.isLoading = true;
    
    // Simular carga asíncrona
    setTimeout(() => {
      const projectData = this.getProjectData(id);
      this.project = projectData;
      this.isLoading = false;
      
      if (!this.project && this.isBrowser) {
        this.router.navigate(['/']);
      }
    }, this.isBrowser ? 500 : 0); // Sin delay en servidor
  }

  private getProjectData(id: string): ProjectDetail | null {
    // Verificar si el servicio de traducción está disponible
    if (!this.translationService) {
      return null;
    }

    try {
      // Obtener datos del proyecto desde las traducciones
      const projectTranslation = this.translationService.translate(`project.projects.${id}`);
      
      if (!projectTranslation || projectTranslation === `project.projects.${id}`) {
        return null;
      }

      // Base de datos con datos que no cambian (URLs, colores, etc.)
      const staticData: { [key: string]: Partial<ProjectDetail> } = {
        'ecommerce-platform': {
          id: 'ecommerce-platform',
          image: 'https://iili.io/KIc58Vj.md.jpg',
          images: [
            'https://i.postimg.cc/wvb871Mn/Frame-427320259.jpg',
            'https://i.postimg.cc/Ls8m5KvY/Frame-427320260.jpg',
            'https://i.postimg.cc/Wb7RkYdM/Frame-427320261.jpg'
            ],
          technologies: ['Research', 'PHP', 'React'],
          liveUrl: 'https://youtu.be/lpvAQNJ9lyY',
          githubUrl: 'https://github.com/username/ecommerce-platform',
          color: 'var(--color-orange)',
          year: '2020',
          duration: '9 months'
        },

        'task-management': {
          id: 'task-management',
          image: 'https://i.postimg.cc/tRW80RHq/kid.jpg',
          images: [
            'https://iili.io/KIVe67f.md.jpg',
            'https://iili.io/KIVSTTx.md.jpg',
            'https://iili.io/KIV4zKB.md.jpg'
          ],

          technologies: ['Research', 'User Persona', 'Testing', 'Figma'],
          liveUrl: 'https://www.figma.com/proto/oxhM0oliAAZKM1wEnKtQx4/Mar%C3%ADa-Fernanda-Farf%C3%A1n---Experience-Design--Copy-?page-id=649%3A3416&type=design&node-id=867-11874&viewport=1441%2C-1819%2C0.14&scaling=scale-down&starting-point-node-id=867%3A11874&t=gfvoO3Xl47IzdaJI-1',
          githubUrl: 'https://github.com/username/task-manager',
          color: 'var(--color-pink)',
          year: '2023',
          duration: '3 months'
        },
        'dashboard-analytics': {
          id: 'dashboard-analytics',
          image: 'https://iili.io/KII5mep.md.jpg',
          images: [
            'https://i.postimg.cc/s2T228qm/Frame-427320265.jpg',
            'https://iili.io/KIWp2YG.th.jpg',
            'https://iili.io/KIX9Imx.th.jpg'
          ],
          technologies: ['Research', 'UI', 'User Testing'],
          githubUrl: 'https://github.com/username/analytics-dashboard',
          figmaUrl: 'https://figma.com/file/analytics-dashboard',
          color: 'var(--color-blue)',
          year: '2023',
          duration: '5 months'
        },
        'mobile-app-ui': {
          id: 'mobile-app-ui',
          image: 'https://iili.io/KIIjJ0Q.md.jpg',
          images: [
            'https://i.postimg.cc/d33wDmgy/Frame-427320268.jpg',
            'https://i.postimg.cc/N5dwgKb4/Frame-427320270.jpg',
            'https://i.postimg.cc/7fHk831h/Frame-427320269.jpg'
          ],
          technologies:  ['Figma', 'Prototipado', 'Investigación de Usuarios'],
          figmaUrl: 'https://www.alimentosinnova.com/',
          liveUrl: 'https://www.alimentosinnova.com/',
          color: 'var(--color-bright-orange)',
          year: '2020',
          duration: '2 months'
        },
         'ai-project': {
      id: 'ai-project',
      image: 'https://i.postimg.cc/2yg2S7B0/Frame-427320277.jpg', // Reemplazar con tu imagen real
      images: [
        'https://i.postimg.cc/gjTxPwRq/Frame-427320274.jpg',
        'https://i.postimg.cc/tJ39BYk4/Frame-427320276.jpg',
        'https://i.postimg.cc/SxTk106C/Frame-427320275.jpg'
      ],
      technologies: ['Python', 'Machine Learning', 'NLP', 'FastAPI'],
      githubUrl: 'https://github.com/username/ai-assistant',
      liveUrl: 'https://ai-assistant-demo.com',
      color: 'var(--color-purple)',
      year: '2023',
      duration: '6 months'
    },

    'reputation-algorithm': {
      id: 'reputation-algorithm',
      image: 'https://iili.io/KT9JJZx.jpg', // Reemplazar con tu imagen real
      images: [
        'https://iili.io/KT9JHjj.jpg',
        'https://iili.io/KT9J2CQ.jpg',
        'https://iili.io/KT9J9Tb.jpg'
      ],
      technologies: ['Python', 'GraphQL', 'Neo4j', 'Data Analysis'],
      githubUrl: 'https://github.com/username/reputation-metrics',
      liveUrl: 'https://reputation-metrics-demo.com',
      color: 'var(--color-blue)',
      year: '2023',
      duration: '4 months'
    }
      };

      const static_project = staticData[id];
      if (!static_project) return null;

      // Combinar datos estáticos con traducciones
      return {
        ...static_project,
        title: this.translationService.translate(`project.projects.${id}.title`),
        description: this.translationService.translate(`project.projects.${id}.description`),
        longDescription: this.translationService.translate(`project.projects.${id}.longDescription`),
        category: this.translationService.translate(`project.projects.${id}.category`),
        features: this.getTranslatedArray(`project.projects.${id}.features`),
        challenges: this.getTranslatedArray(`project.projects.${id}.challenges`),
        solutions: this.getTranslatedArray(`project.projects.${id}.solutions`),
        results: this.getTranslatedArray(`project.projects.${id}.results`),
        role: this.translationService.translate(`project.projects.${id}.role`),
        team: this.getTranslatedArray(`project.projects.${id}.team`)
      } as ProjectDetail;

    } catch (error) {
      console.error('Error loading project data:', error);
      return null;
    }
  }

  private getTranslatedArray(baseKey: string): string[] {
  const array: string[] = [];
  let index = 0;
  
  // Definimos límites específicos para cada tipo de array
  const limits: { [key: string]: number } = {
    'features': 7,      // 0-6 (7 elementos)
    'challenges': 4,    // 0-3 (4 elementos)
    'solutions': 4,     // 0-3 (4 elementos)
    'results': 4,       // 0-3 (4 elementos)
    'team': 3          // 0-2 (3 elementos)
  };

  // Obtener el tipo de array de la clave base
  const arrayType = baseKey.split('.').pop() || '';
  const limit = limits[arrayType] || 20;

  try {
    while (index < limit) {
      const translation = this.translationService.translate(`${baseKey}.${index}`);
      if (translation === `${baseKey}.${index}`) {
        break;
      }
      array.push(translation);
      index++;
    }
  } catch (error) {
    console.error('Error getting translated array:', error);
  }
  
  return array;
}

  goBack() {
    if (this.isBrowser) {
      this.location.back();
    }
  }

  openLink(url: string | undefined) {
    if (url && this.isBrowser && window) {
      window.open(url, '_blank');
    }
  }

  trackByFeature(index: number, item: string): string {
    return item || index.toString();
  }
}