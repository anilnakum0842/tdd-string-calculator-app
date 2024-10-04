import { Component } from '@angular/core';
import { StringCalculatorService } from '../string-calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  inputString: string = '';
  result: number | string = '';

  constructor(private calculatorService: StringCalculatorService) {}

  calculate(): void {
    try {
      this.result = this.calculatorService.add(this.inputString);
    } catch (e:any) {
      this.result = e.message;
    }
  }
}
