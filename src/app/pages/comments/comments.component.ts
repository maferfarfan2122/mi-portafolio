import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../translate.pipe';
import gsap from 'gsap';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit, AfterViewInit {
  
  currentIndex = 0;
  totalSlides = 0;
  isAnimating = false;
  carouselTimeline: gsap.core.Timeline | null = null;
  autoplayTimer: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechFlow',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=60&h=60&fit=crop&crop=face',
    platform: 'LinkedIn',
    date: 'Mar 15, 2024',
    content: 'Working with María Fernanda was exceptional. Her attention to detail and creative problem-solving skills made our project a huge success. Highly recommended!',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    name: 'Alex Chen',
    role: 'Lead Developer',
    company: 'InnovateLab',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face',
    platform: 'GitHub',
    date: 'Feb 28, 2024',
    content: 'María Fernanda\'s code quality is outstanding. She delivered clean, scalable solutions that exceeded our expectations. A true professional.',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'UX Director',
    company: 'CreativeStudio',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face',
    platform: 'Behance',
    date: 'Jan 12, 2024',
    content: 'The user experience designs were phenomenal. María Fernanda understands both aesthetics and functionality perfectly. Amazing work!',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 4,
    name: 'Michael Turner',
    role: 'Startup Founder',
    company: 'NextGen Apps',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
    platform: 'Twitter',
    date: 'Dec 5, 2023',
    content: 'From concept to launch, María Fernanda guided our entire development process. Her expertise in both frontend and backend was invaluable.',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 5,
    name: 'Lisa Park',
    role: 'Design Lead',
    company: 'PixelCraft',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face',
    platform: 'Dribbble',
    date: 'Nov 18, 2023',
    content: 'Amazing collaboration! María Fernanda brings fresh ideas and technical excellence. Her work elevated our entire project.',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)'
  }
];

// ...existing code...

  ngOnInit() {
    this.totalSlides = this.testimonials.length;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initCarousel();
        this.startAutoplay();
      }, 300);
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  private initCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const container = document.querySelector('.carousel-container');
    
    if (!cards.length || !container) return;

    // Configuración inicial
    gsap.set(cards, {
      x: (index) => index * 100 + '%',
      opacity: (index) => index === 0 ? 1 : 0.6,
      scale: (index) => index === 0 ? 1 : 0.9,
      zIndex: (index) => cards.length - index
    });

    this.updateDots();
  }

  goToSlide(index: number) {
    if (this.isAnimating || index === this.currentIndex) return;

    this.isAnimating = true;
    this.currentIndex = index;

    const cards = document.querySelectorAll('.testimonial-card');
    
    // Crear timeline para animación suave
    const tl = gsap.timeline({
      onComplete: () => {
        this.isAnimating = false;
      }
    });

    cards.forEach((card, i) => {
      const distance = i - index;
      
      tl.to(card, {
        x: distance * 100 + '%',
        opacity: i === index ? 1 : 0.6,
        scale: i === index ? 1 : 0.9,
        rotation: distance * 2,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 0);
    });

    this.updateDots();
    this.resetAutoplay();
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.totalSlides;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.goToSlide(prevIndex);
  }

  private updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  private startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.nextSlide();
    }, 4000); // Cambia cada 4 segundos
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  private resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  onMouseEnter() {
    this.stopAutoplay();
  }

  onMouseLeave() {
    this.startAutoplay();
  }

  getPlatformIcon(platform: string): string {
    const icons = {
      'LinkedIn': '🔗',
      'GitHub': '⚡',
      'Behance': '🎨',
      'Twitter': '🐦',
      'Dribbble': '🏀'
    };
    return icons[platform as keyof typeof icons] || '💬';
  }

  getStarRating(rating: number): string {
    return '⭐'.repeat(rating);
  }

  // Métodos para indicadores
  getDots(): number[] {
    return Array.from({ length: this.totalSlides }, (_, i) => i);
  }
}