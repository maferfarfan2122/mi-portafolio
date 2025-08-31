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
          image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
          ],
          technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe API', 'Docker', 'AWS'],
          liveUrl: 'https://ecommerce-demo.com',
          githubUrl: 'https://github.com/username/ecommerce-platform',
          color: 'var(--color-orange)',
          year: '2024',
          duration: '4 months'
        },
        'task-management': {
          id: 'task-management',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&h=600&fit=crop'
          ],
          technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript', 'Expo'],
          liveUrl: 'https://taskmanager-app.com',
          githubUrl: 'https://github.com/username/task-manager',
          color: 'var(--color-pink)',
          year: '2023',
          duration: '3 months'
        },
        'dashboard-analytics': {
          id: 'dashboard-analytics',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
          ],
          technologies: ['Vue.js', 'D3.js', 'Python', 'PostgreSQL', 'Redis', 'Chart.js'],
          githubUrl: 'https://github.com/username/analytics-dashboard',
          figmaUrl: 'https://figma.com/file/analytics-dashboard',
          color: 'var(--color-blue)',
          year: '2024',
          duration: '5 months'
        },
        'mobile-app-ui': {
          id: 'mobile-app-ui',
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
          images: [
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
          ],
          technologies: ['Figma', 'Adobe Creative Suite', 'Principle', 'Sketch', 'InVision'],
          figmaUrl: 'https://figma.com/file/mobile-app-fitness',
          color: 'var(--color-bright-orange)',
          year: '2023',
          duration: '2 months'
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
    
    try {
      while (index < 20) { // Límite de seguridad
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