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
    const multiDelimiterMatch = numbers.match(/^\/\/(\[.*\])\\n/);
    if (multiDelimiterMatch) {
        // Handle multiple or long custom delimiters like //[delim1][delim2]
        const customDelimiters = multiDelimiterMatch[1]
            .split('][')                  // Split delimiters by ']['
            .map(d => d.replace(/[\[\]]/g, '')) // Remove brackets from each delimiter
            .map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); // Escape special regex chars

        // Create a dynamic regex for delimiters
        delimiter = new RegExp(customDelimiters.join('|'));
        numbers = numbers.slice(multiDelimiterMatch[0].length);
    } else {
        // Handle single-character delimiter like //;\n
        const singleDelimiterMatch = numbers.match(/^\/\/(.)\\n/);
        if (singleDelimiterMatch) {
            delimiter = new RegExp(singleDelimiterMatch[1]);
            numbers = numbers.slice(singleDelimiterMatch[0].length);
        }
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
