import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../translate.pipe';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './contact.component.html', // Corregido: era .htm
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  sendEmail() {
    if (isPlatformBrowser(this.platformId)) {
      const subject = encodeURIComponent('Hola! Me interesa trabajar contigo');
      const body = encodeURIComponent('Hola Fernanda,\n\nMe pongo en contacto contigo porque...\n\nSaludos!');
      const mailtoLink = `mailto:maferfarfan21@gmail.com?subject=${subject}&body=${body}`;
      
      window.open(mailtoLink, '_blank');
    }
  }

  downloadCV() {
    if (isPlatformBrowser(this.platformId)) {
      // Determinar idioma actual (puedes usar tu servicio de traducción)
      const currentLang = localStorage.getItem('language') || 'es';
      
      // URLs de tus CVs (tendrás que subir estos archivos a tu proyecto)
      const cvUrls = {
        es: '/assets/cv/CV_Fernanda_Farfan_ES.pdf',
        en: '/assets/cv/CV_Fernanda_Farfan_EN.pdf'
      };
      
      const cvUrl = cvUrls[currentLang as keyof typeof cvUrls] || cvUrls.es;
      
      // Crear elemento de descarga temporal
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = `CV_Fernanda_Farfan_${currentLang.toUpperCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
}