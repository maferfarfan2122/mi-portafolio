import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../translate.pipe';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Funciones de navegación
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openEmail() {
    if (isPlatformBrowser(this.platformId)) {
      window.open('mailto:maferfarfan21@gmail.com', '_blank');
    }
  }

  openLinkedIn() {
    if (isPlatformBrowser(this.platformId)) {
      window.open('https://linkedin.com/in/maferfarfan', '_blank');
    }
  }

  openGitHub() {
    if (isPlatformBrowser(this.platformId)) {
      window.open('https://github.com/maferfarfan', '_blank');
    }
  }

  openBehance() {
    if (isPlatformBrowser(this.platformId)) {
      window.open('https://behance.net/maferfarfan', '_blank');
    }
  }

  // Función divertida para generar año actual
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
}