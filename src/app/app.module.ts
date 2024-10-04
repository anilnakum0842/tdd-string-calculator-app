import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { StringCalculatorService } from './string-calculator.service';

@NgModule({
  declarations: [AppComponent, CalculatorComponent],
  imports: [BrowserModule, FormsModule],
  providers: [StringCalculatorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
