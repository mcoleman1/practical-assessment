import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  pure: true
})
export class TemperaturePipe implements PipeTransform {

  /**
   * @function transform
   *
   * Converts the provided temperature in Kelvin to Fahreinheit and returns an integer value, formatted as a string.
   *
   * @param value (number) - Current temperature in Kelvin
   *
   * @returns (string) - the formatted temperature converted to Fahrenheit
   */
  transform(value: number): string {
    return (1.8 * (value - 273) + 32)?.toFixed(0);
  }

}
