import { Component, OnInit } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatError, MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-norrisk2',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    MatFormField,
    MatError,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './norrisk2.component.html',
  styleUrl: './norrisk2.component.scss'
})
export class Norrisk2Component implements OnInit{

  form: FormGroup;
  risk: number = 1;
  result: string = '';

  showHelp: boolean = false;

  constructor() {
    this.form = new FormGroup({
      gender: new FormControl(1),
      smoking: new FormControl(0),
      age: new FormControl(45, [Validators.min(45), Validators.max(74)]),
      systolic: new FormControl(120, [Validators.min(120), Validators.max(160)]),
      cholesterol: new FormControl(4.0, [Validators.min(4.0), Validators.max(6.0)]),
      familyCHD: new FormControl(0),
      BPmed: new FormControl(0),
      HDL: new FormControl(0)
    })
  }

  ngOnInit() {
    this.onChanges();
    this.calculate(this.form.value);
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
;      this.calculate(val);
    });
  }

  calculate(values: any) {
    //transform variables
		/*A=age-40; S=(systolic blood pressure-120)/10; C=serum total cholesterol-4;
		SMK=1 if daily smoking, SMK=0 otherwise;
		BPmed=1 if currently user of antihypertensives, BPmed=0 otherwise;
		lowHDL=1 if HDL-cholesterol < 1.3 mmol/L in women and < 1.0 mmol/L in men, lowHDL=0 otherwise;
		familyCHD_1=1 if one first degree family member having suffered an AMI before the age of 60 years, familyCHD_1=0 otherwise;
		familyCHD_2=1 if at least two first degree family members having suffered an AMI before the age of 60 years, familyCHD_2=0 otherwise*/
		
		var age: number = values.age;
		var gender = values.gender;
		var A = age - 40;
		var S = (values.systolic - 120) / 10;
		var C = values.cholesterol - 4;
		var SMK = values.smoking;
		var BPmed = values.BPmed;
		var lowHDL = values.HDL;
		var familyCHD_1: any = values.familyCHD < 2;
		var familyCHD_2: any = values.familyCHD == 2;
		
		//Calculate
		var w = gender == 2 ?
			0.11447* A -0.00043*Math.pow(A,2) + 0.22283* S + 0.35625* C + 0.91727* SMK-0.00896*C*A -0.00430*S*A-0.02051*SMK*A+0.27824*BPmed+0.33162* lowHDL+0.29986* familyCHD_1 + 0.59692* familyCHD_2 :
			0.13037* A - 0.00066 *Math.pow(A,2) + 0.25241 * S + 0.07235* C + 1.26781* SMK -0.00500*S*A -0.02456*SMK*A+0.19200*BPmed+0.32377* lowHDL+0.25361* familyCHD_1 +0.54909* familyCHD_2;
		
		var hr = Math.exp(w);
		var risk = gender == 2 ? 1-Math.exp(-hr * 0.00526) : 1-Math.exp(-hr* 0.00232);
		this.risk = Math.floor(risk*100) > 0 ? Math.floor(risk*100) : 1;
		
		this.result = 
			this.risk < 4 && age < 55 ? 'Lav risiko' :
			this.risk < 8 && age < 65 ? 'Lav risiko' :
			this.risk < 12 ? 'Lav' :
			this.risk < 5 && age < 55 ? 'Middels risiko' :
			this.risk < 10 && age < 65 ? 'Middels risiko' :
			this.risk < 15 ? 'Middels risiko' :
			'Høy risiko';
  }


}
