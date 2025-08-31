import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
}