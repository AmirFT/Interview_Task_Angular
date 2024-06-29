import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLocalDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    const date = new Date(value);

    // Convert to local date and time
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
}
