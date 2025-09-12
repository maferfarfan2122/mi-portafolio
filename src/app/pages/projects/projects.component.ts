import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../translate.pipe';
import { Router } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../translation.services';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private translationService: TranslationService
  ) {}

  projects = [
    {
      id: 'ecommerce-platform', // Cambiado de 1 a 'ecommerce-platform'
      title: 'Inmetep',
      category: 'Full Stack',
      image: 'https://iili.io/KIzbcYB.md.jpg',
      description: 'Propuesta de mejora en un sistema de control de mantenimiento aplicando la industria 4.0',
      tech: ['Research', 'PHP', 'React'],
      color: 'var(--color-orange)'

    },
    {
      id: 'task-management', // Cambiado de 2 a 'task-management'
      title: 'KidMoodies',
      category: 'Research',
      image: 'https://iili.io/KIIBkLQ.md.jpg',
      description: 'Aplicación que presta servicios de streaming basados en las emociones de su público',
      tech: ['Research', 'User Persona', 'Testing', 'Figma'],
      color: 'var(--color-pink)'
    },

    {
      id: 'dashboard-analytics', // Cambiado de 3 a 'dashboard-analytics'
      title: 'CestAhorro',
      category: 'Design',
      image: 'https://iili.io/KII5mep.md.jpg',
      description: 'Webapp para consumidores que necesitan ahorrar en la compra en supermercados',
      tech: ['Research', 'UI', 'User Testing'],
      color: 'var(--color-yellow)'
    },
    {
      id: 'mobile-app-ui', // Nuevo ID para el cuarto proyecto
      title: 'Alimentos Innova',
      category: 'UX/UI',
      image: 'https://iili.io/KIIjJ0Q.md.jpg',
      description: 'Creación de un sitio web para una empresa fabricante de productos alimenticios',
      tech:  ['Figma', 'Prototipado', 'Investigación de Usuarios'],
      color: 'var(--color-bright-orange)'
    },
    {
      id: 'ai-project',
      title: 'AI Assistant',
      category: 'IA',
      image: 'https://i.postimg.cc/2yg2S7B0/Frame-427320277.jpg', // Necesitarás añadir esta imagen
  description: 'Plataforma integral de inteligencia artificial para creación de contenido en múltiples formatos',
  tech: ['React', 'Node.js', 'FastAPI', 'REST API', 'OpenAI API', 'Generative AI', 'NLP', 'Cloud Services'],
      color: 'var(--color-purple)'
    },

    {
      id: 'reputation-algorithm',
      title: 'Shop And Gets - Tienda Online Full-Stack',
      category: 'Data Science',
      image: 'https://iili.io/KT9JJZx.jpg', // Necesitarás añadir esta imagen
        description: 'Plataforma full-stack para compras internacionales y gestión logística en tiempo real',

  tech: ['Flutter', 'Node.js', 'REST API', 'Microservicios', 'Cloud Services'],

      color: 'var(--color-blue)'
    }
  ];

  trackByProject(index: number, project: any): string { // Cambiado return type de number a string
    return project.id;
  }


  viewProject(project: any) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Navigating to project:', project.id); // Para debug
      // Navegar a la página del proyecto
      this.router.navigate(['/project', project.id]);
    }
  }
}