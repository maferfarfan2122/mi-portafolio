import { Component, OnInit, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../translate.pipe';
import { LanguageSelectorComponent } from '../translation/translation.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslatePipe, LanguageSelectorComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMobileMenuOpen = false;
   activeSection = 'home';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
 @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.updateActiveSection();
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Escuchar cambios de tamaño de ventana para cerrar el menú móvil
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && this.isMobileMenuOpen) {
          this.closeMobileMenu();
        }
      });

      // Escuchar tecla Escape para cerrar el menú
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.isMobileMenuOpen) {
          this.closeMobileMenu();
        }
      });
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (isPlatformBrowser(this.platformId)) {
      // Prevenir scroll del body cuando el menú está abierto
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }
  
  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Ajusta este valor según el alto de tu navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    this.activeSection = sectionId;
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
  private updateActiveSection() {
    const sections = ['home', 'about', 'projects', 'contact'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

}