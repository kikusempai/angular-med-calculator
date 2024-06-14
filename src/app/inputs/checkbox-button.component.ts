import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { CheckboxResponse } from '../types';

@Component({
  selector: 'app-checkbox-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './checkbox-button.component.html',
  styleUrl: './checkbox-button.component.scss',
})
export class CheckboxButtonComponent {
    
  @Input() value: boolean = false;
  @Input() wide: boolean = true;
  @Input() text: string = '';
  @Input() fieldName: string = '';

  @Output() valueChanged = new EventEmitter<CheckboxResponse>();


  toggleValue() {
    this.value = !this.value;
    let response: CheckboxResponse = {
      field: this.fieldName,
      value: this.value,
    };
    this.valueChanged.emit(response);
  }
}
