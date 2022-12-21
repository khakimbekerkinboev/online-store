import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenProductName',
})
export class ShortenProductNamePipe implements PipeTransform {
  transform(value: string, firstNCharacters: number): string {
    return value.substring(0, firstNCharacters) + '...';
  }
}
