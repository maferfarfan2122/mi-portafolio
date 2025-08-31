import { Component, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../translate.pipe';

@Component({
  selector: 'app-milestones',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './milestones.component.html',
  styleUrl: './milestones.component.scss'
})
export class MilestonesComponent implements AfterViewInit {
  
  milestones = [
    {
      id: 0,
      color: '#F96D28',
      icon: '🎤',
      borderColor: '#2D2D2D',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop&crop=center',
      imageAlt: 'Expert giving a presentation'
    },
    {
      id: 1,
      color: '#E91E63',
      icon: '🎮',
      borderColor: '#2D2D2D',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&crop=center',
      imageAlt: 'People playing games and having fun'
    },
    {
      id: 2,
      color: '#F39C12',
      icon: '🍕',
      borderColor: '#2D2D2D',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center',
      imageAlt: 'Delicious food and drinks'
    },
    {
      id: 3,
      color: '#F1C40F',
      icon: '🎵',
      borderColor: '#2D2D2D',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
      imageAlt: 'Live music performance'
    },
    {
      id: 4,
      color: '#E67E22',
      icon: '🤝',
      borderColor: '#2D2D2D',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop&crop=center',
      imageAlt: 'Community networking event'
    }
  ];

  private isDesktop = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Listener para el movimiento del mouse solo en desktop
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (isPlatformBrowser(this.platformId) && this.isDesktop) {
      // Actualizar las variables CSS con la posición del mouse
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.checkIfDesktop();
        this.initializeImages();
        this.setupHoverEvents();
      }, 100);
    }
  }

  private checkIfDesktop() {
    this.isDesktop = window.innerWidth >= 1025;
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', () => {
      this.isDesktop = window.innerWidth >= 1025;
    });
  }

  private setupHoverEvents() {
    const milestoneBars = document.querySelectorAll('.milestone-bar');
    
    milestoneBars.forEach((bar) => {
      const hoverContainer = bar.querySelector('.hover-image-container') as HTMLElement;
      
      if (!hoverContainer) return;

      // Mouse enter
      bar.addEventListener('mouseenter', () => {
        if (this.isDesktop) {
          hoverContainer.classList.add('visible');
        }
      });

      // Mouse leave
      bar.addEventListener('mouseleave', () => {
        if (this.isDesktop) {
          hoverContainer.classList.remove('visible');
        }
      });

      // Mouse move dentro de la barra (para seguimiento más preciso)
      bar.addEventListener('mousemove', (event: Event) => {
        if (this.isDesktop && event instanceof MouseEvent) {
          // Actualizar posición específica para esta imagen
          document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`);
        }
      });
    });
  }

  private initializeImages() {
    const images = document.querySelectorAll('.image-content img') as NodeListOf<HTMLImageElement>;
    console.log('Imágenes encontradas:', images.length);
    
    images.forEach((img, index) => {
      console.log(`Procesando imagen ${index}:`, img.src);
      
      if (img.complete && img.naturalHeight !== 0) {
        img.classList.add('loaded');
        this.hideLoadingSpinner(img);
        console.log(`Imagen ${index} ya estaba cargada`);
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          this.hideLoadingSpinner(img);
          console.log(`Imagen ${index} cargada exitosamente`);
        });
        
        img.addEventListener('error', () => {
          console.warn(`Error cargando imagen ${index}:`, img.src);
          this.hideLoadingSpinner(img);
          this.showErrorState(img);
        });
      }
    });
  }

  private hideLoadingSpinner(img: HTMLImageElement) {
    const container = img.closest('.image-content');
    if (container) {
      container.classList.add('image-loaded');
    }
  }

  private showErrorState(img: HTMLImageElement) {
    const container = img.closest('.image-content');
    if (container) {
      container.classList.add('image-error');
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="100%25" height="100%25" fill="%23f0f0f0"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" text-anchor="middle" dy=".3em"%3EImage not available%3C/text%3E%3C/svg%3E';
    }
  }

  trackByMilestone(index: number, item: any): number {
    return item.id;
  }
}