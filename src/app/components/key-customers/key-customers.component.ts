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
    { name: '3i Infotech', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/3i-infotech.png' },
    { name: 'AAI', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/aai.png' },
    { name: 'App Mastery', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/app-mastery.png' },
    { name: 'Desert Group', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/desert-group.png' },
    { name: 'HLL Lifecare', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/hll.png' },
    { name: 'Microlit', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/microlit.png' },
    { name: 'Indian Metrological', logo: 'ttps://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/indian-metrological.png' },
    { name: 'Indian Railways', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/indian-railways.png' },
    { name: 'Modern Coach Factory', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/Modern_Coach_Factory_Raebareli .png' },
    { name: 'SPMCIL', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/spmcil-logo.png' },
    { name: 'AnyGen AI', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/anygenai.png' },
    { name: 'UJVN Limited', logo: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/ujvnl.png' }
  ];
}






