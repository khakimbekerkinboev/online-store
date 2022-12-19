import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToUsd',
})
export class ConvertToUsdPipe implements PipeTransform {
  transform(value: number): string {
    return '$' + value;
  }
}
