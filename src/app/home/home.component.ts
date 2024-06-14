import { Component } from '@angular/core';
import { Norrisk2Component } from './../calculators/norrisk2/norrisk2.component';
import { Chads2VascComponent } from './../calculators/chads2vasc/chads2vasc.component'
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Norrisk2Component, Chads2VascComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  activeTab: number = 0;

  activateTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }

}
