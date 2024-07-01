import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})

export class HighlightPipe implements PipeTransform{
  transform(text: string, searchTerm: string): string{
    if (!text || !searchTerm) {
      return text
    }
    const regex = new RegExp(searchTerm, 'gi') // 'gi' for global case-insensitive matching
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`)
  }
}
