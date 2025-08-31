import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../translate.pipe';
import { Router } from '@angular/router';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}
  
  projects = [
    {
      id: 'ecommerce-platform', // Cambiado de 1 a 'ecommerce-platform'
      title: 'Inmetep',
      category: 'Frontend',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      description: 'Propuesta de mejora en un sistema de control de mantenimiento aplicando la industria 4.0',
      tech: ['Research', 'PHP', 'React'],
      color: 'var(--color-orange)'
    },
    {
      id: 'task-management', // Cambiado de 2 a 'task-management'
      title: 'KidMoodies',
      category: 'Research',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      description: 'Aplicación que presta servicios de streaming basados en las emociones de su público',
      tech: ['Figma', 'Research', 'Notion'],
      color: 'var(--color-pink)'
    },
    {
      id: 'dashboard-analytics', // Cambiado de 3 a 'dashboard-analytics'
      title: 'CestAhorro',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      description: 'Webapp para consumidores que necesitan ahorrar en la compra en supermercados',
      tech: ['Research', 'User Persona', 'Test'],
      color: 'var(--color-yellow)'
    },
    {
      id: 'mobile-app-ui', // Nuevo ID para el cuarto proyecto
      title: 'Alimentos Innova',
      category: 'UX/UI',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      description: 'Creación de un sitio web para una empresa fabricante de productos alimenticios',
      tech: ['Figma', 'Prototyping', 'User Research'],
      color: 'var(--color-bright-orange)'
    }
  ];

  trackByProject(index: number, project: any): string { // Cambiado return type de number a string
    return project.id;
  }

  // En el método que maneja el click del botón "View Project"
  viewProject(project: any) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Navigating to project:', project.id); // Para debug
      // Navegar a la página del proyecto
      this.router.navigate(['/project', project.id]);
    }
  }
}