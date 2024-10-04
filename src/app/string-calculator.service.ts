import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {

  constructor() { }

  add(numbers: string): number {
    if (!numbers) return 0;

    let delimiter = /,|\\n/; // Default delimiters: comma or newline

    // Check for custom delimiters
    if (numbers.startsWith("//")) {
       // Handle delimiter like //;\n
       const DelimiterMatch = numbers.match(/^\/\/(.)\\n/);
       if (DelimiterMatch) {
           delimiter = new RegExp(DelimiterMatch[1]);
           numbers = numbers.slice(DelimiterMatch[0].length);
       }
    }
    // Split string using the delimiter and remove empty entries
    const numArray = numbers.split(delimiter).filter(num => num.trim() !== "");

    // Convert to numbers and ignore numbers greater than 1000
    const numValues = numArray.map(num => {
      const parsed = Number(num);
      if (isNaN(parsed)) {
        throw new Error(`Invalid number found: ${num}`);
      }
      return parsed > 1000 ? 0 : parsed;  // Ignore numbers > 1000
    });

     // Check for negative numbers
     const negativeNumbers = numValues.filter(num => num < 0);
     if (negativeNumbers.length > 0) {
       throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(", ")}`);
     }

    // Sum valid numbers and return result
    return numValues.reduce((sum, num) => sum + num, 0);
  }
}
