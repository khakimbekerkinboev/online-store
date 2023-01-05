import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToUsd',
})
export class ConvertToUsdPipe implements PipeTransform {
  transform(value: number | undefined): string {
    return '$' + value?.toFixed(2).toLocaleString();
  }
}
