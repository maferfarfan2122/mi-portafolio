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
    name: 'Pau Pons Janer',
    role: 'Web Scraper & Back-End Developer',
    company: 'Bootcamp de IA con Python',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHMsytpjqzQ4A/profile-displayphoto-shrink_800_800/B4DZTRw0ekHIAk-/0/1738686025763?e=1760572800&v=beta&t=xTydiLNB2CyBzCzC6YME6eaHTJHj6VS0M5sFmlxf848',
    platform: 'LinkedIn',
    date: 'Dec 10, 2023',
    content: 'Es un verdadero placer recomendar a Mafer como compañera en el Bootcamp de IA con Python. Su energía positiva, su comunicación efectiva y su creatividad como Front-End marcaron la diferencia en nuestro equipo.',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  },
  {
    id: 2,
    name: 'Aleix Sastre Moreno',
    role: 'Full-Stack Developer (Django, Python, JS)',
    company: 'Bootcamp de IA con Python',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQFCfmz2PD4QpQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723463544010?e=1760572800&v=beta&t=lbluPm0Tr_VqaXyWA6fsSOVYUgpCoeCr0OtHlYRyHPU',
    platform: 'LinkedIn',
    date: 'Nov 29, 2023',
    content: 'Mafer es una profesional excepcional en frontend, con gran conocimiento técnico, atención al detalle y un contagioso sentido del humor que convierte cada proyecto en una experiencia positiva y productiva.',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
  },
  {
    id: 3,
    name: 'Laura Betancur',
    role: 'Sr. Graphic Designer & UX/UI Designer',
    company: 'Máster en Diseño de Experiencias Digitales',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQEcd8O9BuIo1g/profile-displayphoto-shrink_800_800/B4DZSyom4DHYAg-/0/1738163777686?e=1760572800&v=beta&t=CgXwL6RcakUg1-XP3V9DUXqEZQqu5CqV6niyIONVUEA',
    platform: 'LinkedIn',
    date: 'May 11, 2023',
    content: 'Estudiar con Mafer fue una experiencia maravillosa. Es una profesional atenta, con habilidades excepcionales para trabajar en equipo y un futuro brillante por delante en el diseño de experiencias digitales.',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
  },
  {
    id: 4,
    name: 'Helena Silva',
    role: 'UX/UI Designer at Centiment | UX Mentor at Uxcel',
    company: 'BAU, Máster UX',
    avatar: 'https://media.licdn.com/dms/image/v2/D4D03AQHvqZg5VP-qtw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725538969085?e=1760572800&v=beta&t=egTNsrPdTPnaNu5Tm1cC8wDrRE2i6GgANGc2Is9DY_U',
    platform: 'LinkedIn',
    date: 'Apr 17, 2023',
    content: 'I highly recommend Mafer as a skilled and passionate UX designer. Her background in web development and expertise in UX research make her a unique asset to any team. She excels with scrum and agile methodologies.',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
  },
  {
    id: 5,
    name: 'Rony Diaz',
    role: 'Freelancer Front-End',
    company: 'Proyectos de desarrollo web',
    avatar: 'https://media.licdn.com/dms/image/v2/D5603AQHq2JliB9P6QA/profile-displayphoto-crop_800_800/B56Zk6FZlRJwAI-/0/1757616118576?e=1760572800&v=beta&t=Lqz2KEc0mc483g5scC1XRr7gk2tmHdQe2efcw2dk_1g',
    platform: 'LinkedIn',
    date: 'Feb 20, 2023',
    content: 'Trabajar con Mafer fue muy positivo. Su liderazgo, comunicación clara y propuestas para mejorar la experiencia del usuario marcaron la diferencia. Siempre colaborativa y comprometida con el equipo.',
    rating: 5,
    bgColor: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  }
];



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