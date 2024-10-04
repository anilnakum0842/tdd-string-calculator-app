import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {

  constructor() { }

  add(numbers: string): number {
    if (!numbers) return 0;

    let delimiter = /,|\\n/; // Default delimiters: comma or newline

    // Split string using the delimiter and remove empty entries
    const numArray = numbers.split(delimiter).filter(num => num.trim() !== "");

    // Convert to numbers
    const numValues = numArray.map(num => {
      const parsed = Number(num);
      if (isNaN(parsed)) {
        throw new Error(`Invalid number found: ${num}`);
      }
      return parsed;
    });
    // Sum valid numbers and return result
    return numValues.reduce((sum, num) => sum + num, 0);
  }
}
