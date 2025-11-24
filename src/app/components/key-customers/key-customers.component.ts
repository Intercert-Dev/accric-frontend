import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-key-customers',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule], // ✅ Import CommonModule to use *ngFor, *ngIf, etc.
  templateUrl: './key-customers.component.html',
  styleUrls: ['./key-customers.component.scss']
})
export class KeyCustomersComponent {
  customers = [
    { name: '3i Infotech', logo: 'assets/images/customers/3i-infotech.png' },
    { name: 'AAI', logo: 'assets/images/customers/aai.png' },
    { name: 'App Mastery', logo: 'assets/images/customers/app-mastery.png' },
    { name: 'Desert Group', logo: 'assets/images/customers/desert-group.png' },
    { name: 'HLL Lifecare', logo: 'assets/images/customers/hll.png' },
    { name: 'Microlit', logo: 'assets/images/customers/microlit.png' },
    { name: 'Indian Metrological', logo: 'assets/images/customers/indian-metrological.png' },
    { name: 'Indian Railways', logo: 'assets/images/customers/indian-railways.png' },
    { name: 'Modern Coach Factory', logo: 'assets/images/customers/Modern_Coach_Factory_Raebareli .png' },
    { name: 'SPMCIL', logo: 'assets/images/customers/spmcil-logo.png' },
    { name: 'AnyGen AI', logo: 'assets/images/customers/anygenai.png' },
    { name: 'UJVN Limited', logo: 'assets/images/customers/ujvnl.png' }
  ];
}

