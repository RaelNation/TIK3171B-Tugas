import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedCategory: string = 'length';
  fromUnit: string = '';
  toUnit: string = '';
  inputValue: number | null = null;  // Allow null value
  convertedValue: number | null = null;  // Allow null value
  units: string[] = [];

  // Conversion factors for different categories
  lengthConversionFactors: { [unit: string]: number } = {
    'km': 1000,
    'hm': 100,
    'dam': 10,
    'm': 1,
    'dm': 0.1,
    'cm': 0.01,
    'mm': 0.001
  };

  massConversionFactors: { [unit: string]: number } = {
    'kg': 1,
    'g': 0.001,
    'mg': 0.000001,
    'lb': 0.453592,
    'oz': 0.0283495
  };

  timeConversionFactors: { [unit: string]: number } = {
    's': 1,
    'min': 60,
    'h': 3600,
    'day': 86400
  };

  constructor() { 
    this.updateUnits();
  }

  updateUnits() {
    if (this.selectedCategory === 'length') {
      this.units = Object.keys(this.lengthConversionFactors);
    } else if (this.selectedCategory === 'mass') {
      this.units = Object.keys(this.massConversionFactors);
    } else if (this.selectedCategory === 'time') {
      this.units = Object.keys(this.timeConversionFactors);
    }

    // Set unit default pertama kali
    this.fromUnit = this.units[0];
    this.toUnit = this.units[0];
    this.convertUnits();
  }

  convertUnits() {
    if (this.inputValue === null || !this.fromUnit || !this.toUnit) {
      this.convertedValue = null;
      return;
    }

    let valueInBaseUnit: number;

    // Convert to base unit
    if (this.selectedCategory === 'length') {
      valueInBaseUnit = this.inputValue * this.lengthConversionFactors[this.fromUnit];
      this.convertedValue = valueInBaseUnit / this.lengthConversionFactors[this.toUnit];
    } else if (this.selectedCategory === 'mass') {
      valueInBaseUnit = this.inputValue * this.massConversionFactors[this.fromUnit];
      this.convertedValue = valueInBaseUnit / this.massConversionFactors[this.toUnit];
    } else if (this.selectedCategory === 'time') {
      valueInBaseUnit = this.inputValue * this.timeConversionFactors[this.fromUnit];
      this.convertedValue = valueInBaseUnit / this.timeConversionFactors[this.toUnit];
    }
  }
}

