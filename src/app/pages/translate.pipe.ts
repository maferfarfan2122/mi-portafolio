import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from './translation.services';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false // Para que se actualice cuando cambie el idioma
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: string, params?: { [key: string]: string }): string {
    return this.translationService.translate(key, params);
  }
}