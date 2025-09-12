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
      image: 'https://i.postimg.cc/DwJ0Dcz0/1751701974965.jpg',
      imageAlt: ''
    },
    {
      id: 1,
      color: '#E91E63',
      icon: '🎮',
      borderColor: '#2D2D2D',
      image: 'https://i.postimg.cc/47wTcS6D/IMG-5248.jpg',
      imageAlt: ''
    },
    {
      id: 2,
      color: '#F39C12',
      icon: '🍕',
      borderColor: '#2D2D2D',
      image: 'https://i.postimg.cc/JHnC55KG/1740476543254.jpg',
      imageAlt: ''
    },
    {
      id: 3,
      color: '#F1C40F',
      icon: '🎵',
      borderColor: '#2D2D2D',
      image: 'https://i.postimg.cc/ZBJSCSdP/IMG-5249.jpg',
      imageAlt: ''
    },
    {
      id: 4,
      color: '#E67E22',
      icon: '🤝',
      borderColor: '#2D2D2D',
      image: 'https://i.postimg.cc/G2VzrKC2/muck.png',
      imageAlt: ''
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