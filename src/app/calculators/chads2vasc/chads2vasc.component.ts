import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CheckboxButtonComponent } from '../../inputs/checkbox-button.component';
import { CommonModule } from '@angular/common';
import { CheckboxResponse } from '../../types';

@Component({
  selector: 'app-chads2vasc',
  standalone: true,
  imports: [
    MatRadioModule,
    MatFormField, 
    MatInput,
    ReactiveFormsModule,
    CheckboxButtonComponent,
    CommonModule
  ],
  templateUrl: './chads2vasc.component.html',
  styleUrl: './chads2vasc.component.scss'
})
export class Chads2VascComponent {

  chads: number = 0;
  result: string = 'Lav risiko<br />Evnt Albyl-E';
  values: any = {
    "c": { value: false, label: 'Congestive heart failure', wide: true, increment: 1 },
    "h": { value: false, label: 'Hypertension', wide: true, increment: 1 },
    "a": { value: false, label: 'Age ≥ 75', wide: false, increment: 2 }, //( increment picked up from the original website)
    "a2": { value: false, label: 'Age 65 - 74', wide: false, increment: 1 },
    "d": { value: false, label: 'Diabetes', wide: true, increment: 1 },
    "s": { value: false, label: 'Stroke or TIA', wide: true, increment: 2 },
    "v": { value: false, label: 'Vascular disease', wide: true, increment: 1 },
    "k": { value: false, label: 'Kvinne', wide: true, increment: 1 } 
  };

  keys = Object.keys(this.values);

  valueChanged(event: CheckboxResponse) {
    this.values[event.field].value = event.value;

    // edge case for radio-like behaviour for age items (picked up from the original website)
    if (event.field === 'a') this.values['a2'].value = !event.value;
    if (event.field === 'a2') this.values['a'].value = !event.value;

    this.calculate();
  }

  calculate() {
    this.chads = 0;
    this.keys.forEach((key) => {
      if (this.values[key].value) this.chads += this.values[key].increment;
    });

		//AK
		if (this.chads === 0) {
			this.result = "Lav risiko for hjerneslag.";
		}
		else if (this.chads === 1) {
			this.result = "Moderat risiko for hjerneslag.<br />Blodfortynnende bør vurderes.";
		}
		else if (this.chads >= 2) {
			this.result = "H&oslash;y risiko for hjerneslag.<br />Blodfortynnende anbefales.";
		}	
  }

}
