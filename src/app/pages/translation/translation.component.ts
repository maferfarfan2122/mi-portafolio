import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../translation.services';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="language-selector" *ngIf="showSelector">
      <button 
        class="language-btn"
        [class.active]="currentLang === lang.code"
        *ngFor="let lang of availableLanguages" 
        (click)="changeLanguage(lang.code)"
      >
        {{ lang.code.toUpperCase() }}
      </button>
    </div>
  `,
  styles: [`
    .language-selector {
      display: flex;
      gap: 0.5rem;
    }

    .language-btn {
      background: rgba(255, 255, 255, 0.1);
      color: var(--color-pure-white);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      &.active {
        background: var(--color-orange);
        color: var(--color-dark);
        border-color: var(--color-orange);
      }
    }
  `]
})
export class LanguageSelectorComponent {
  currentLang = 'es';
  availableLanguages: Array<{ code: string; name: string }> = [];
  showSelector = false; // Solo mostrar en el navegador

  constructor(
    private translationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.availableLanguages = this.translationService.getAvailableLanguages();
    
    // Solo suscribirse y mostrar el selector en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.showSelector = true;
      this.translationService.currentLanguage$.subscribe(lang => {
        this.currentLang = lang;
      });
    }
  }

  changeLanguage(lang: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.translationService.setLanguage(lang);
    }
  }
}