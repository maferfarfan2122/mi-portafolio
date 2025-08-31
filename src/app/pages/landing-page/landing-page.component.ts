import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectsComponent } from '../projects/projects.component';
import { TranslatePipe } from '../translate.pipe';
import { CommentsComponent } from '../comments/comments.component';
import { MilestonesComponent } from '../milestones/milestones.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProjectsComponent, TranslatePipe, CommentsComponent, MilestonesComponent, ContactComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  private initSkillsAnimation() {
    const skillWords = document.querySelectorAll('.skill-word');
    
    gsap.to(skillWords, {
      opacity: 1,
      y: 0,
      rotation: 0,
      duration: 1,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: '.skills-container',
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      }
    });
  }

  private initFallingRectanglesAnimation() {
    const rectangles = document.querySelectorAll('.falling-rectangles .rectangle');
    
    // Estado inicial: altura 0 y posicionados en el título
    gsap.set(rectangles, {
      height: 0,
      transformOrigin: 'top center'
    });

    // Animación de caída con scroll
    gsap.to(rectangles, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom center',
        scrub: 1.5, // Suave seguimiento del scroll
        markers: false
      },
      height: '200vh', // Altura que cubra toda la pantalla y más
      ease: 'none', // Movimiento lineal con el scroll
      stagger: {
        amount: 0.3, // Desfase entre rectángulos
        from: 'start'
      }
    });

    // Animación de entrada inicial (opcional)
    gsap.from(rectangles, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      delay: 1 // Después de que aparezca el título
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        // Animación del texto del título
        gsap.to('.hero-text h1', {
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom center',
            scrub: 2,
            markers: false,
            toggleActions: 'play none none reverse'
          },
          backgroundPosition: '200% 0%',
          duration: 3
        });

        // Nueva animación de rectángulos que caen
        this.initFallingRectanglesAnimation();

        // Resto de animaciones
        this.initAboutAnimation();
        this.initNavbarAnimation();
        this.initSkillsAnimation();
        this.initCirclesAnimation();
        this.initMilestonesAnimation();
        this.initContactAnimation();
        this.initPhotoAnimation();

      }, 100);
    }
  }

  private initCirclesAnimation() {
    const bottomCircles = document.querySelectorAll('.bottom-left .circle');
    const topCircles = document.querySelectorAll('.top-right .circle');

    // Estado inicial para ambos conjuntos de círculos
    gsap.set([bottomCircles, topCircles], {
      opacity: 1,
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0
    });

    // Animación círculos inferiores
    gsap.to(bottomCircles, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: '+=400',
        scrub: 1.5,
        markers: false
      },
      opacity: 0,
      scale: 0.5,
      rotation: 45,
      x: '-100%',
      y: '100%',
      stagger: {
        each: 0.2,
        from: "start"
      },
      ease: 'power2.inOut'
    });

    // Animación círculos superiores
    gsap.to(topCircles, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: '+=300',
        scrub: 1.5,
        markers: false
      },
      opacity: 0,
      scale: 0.5,
      rotation: -45,
      x: '100%',
      y: '-100%',
      stagger: {
        each: 0.2,
        from: "end"
      },
      ease: 'power2.inOut'
    });
  }

  private initNavbarAnimation() {
    gsap.from('.navbar-container', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5
    });
  }

  private initAboutAnimation() {
    const stripes = document.querySelectorAll('.stripe');
    
    gsap.from(stripes, {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top center',
        end: 'center center',
        scrub: 1,
        markers: false
      },
      scaleY: 0,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out'
    });

    gsap.from('.section-title, .description, .cta-button', {
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }

  private initMilestonesAnimation() {
    const milestoneBars = document.querySelectorAll('.milestone-bar');
    
    milestoneBars.forEach((bar, index) => {
      (bar as HTMLElement).style.setProperty('--index', index.toString());
    });

    gsap.from(milestoneBars, {
      scrollTrigger: {
        trigger: '.milestones-section',
        start: 'top center+=100',
        end: 'bottom center',
        toggleActions: 'play none none reverse'
      },
      x: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    });

    gsap.from('.rotated-text-container', {
      scrollTrigger: {
        trigger: '.milestones-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)'
    });

    gsap.from('.milestones-main', {
      scrollTrigger: {
        trigger: '.milestones-section',
        start: 'top center+=50',
        toggleActions: 'play none none reverse'
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    });
  }

  private initContactAnimation() {
    gsap.from('.contact-card', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    });

    gsap.from('.contact-illustration', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      },
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'back.out(1.7)'
    });

    gsap.from('.design-element', {
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top center+=200',
        toggleActions: 'play none none reverse'
      },
      scale: 0,
      rotation: 180,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    });
  }


 
private initPhotoAnimation() {
  // Animación de entrada de la imagen desde abajo
  gsap.from('.hero-photo-container', {
    y: 100, // Desde abajo
    opacity: 0,
    scale: 0.8,
    duration: 1.2,
    ease: 'back.out(1.7)',
    delay: 2.5 // Después de las skills
  });

  // Parallax muy sutil para no interferir con el bottom
  gsap.to('.hero-photo-container', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'center center',
      end: 'bottom top',
      scrub: 3, // Muy suave
      markers: false
    },
    y: -20, // Movimiento mínimo
    ease: 'none'
  });

  // Efecto hover para los handles
  const handles = document.querySelectorAll('.resize-handles .handle');
  handles.forEach(handle => {
    handle.addEventListener('mouseenter', () => {
      gsap.to(handle, {
        scale: 1.2,
        rotation: 3,
        duration: 0.2,
        ease: 'back.out(1.7)'
      });
    });

    handle.addEventListener('mouseleave', () => {
      gsap.to(handle, {
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });

  // Función de scroll suave para el botón
  const scrollArrow = document.querySelector('.scroll-arrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: '.about-section',
        duration: 1.5,
        ease: 'power2.inOut'
      });
    });
  }
}


}