import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pci-certification',
  standalone: true,
  imports: [
    CommonModule,      // ✅ Required for *ngIf
    FormsModule,       // ✅ Required for ngModel
    RouterModule,      // ✅ Keeps router functionality
  ],
  templateUrl: './pci-certification.component.html',
  styleUrl: './pci-certification.component.scss',
})
export class PciCertificationComponent {

  // ✅ Stores input value
  regNumber: string = '';

  // ✅ Controls table visibility
  isTableVisible: boolean = false;

  // ✅ Certificate object (blank as requested)
  certificate = {
    certificateNo: '',
    companyName: '',
    classification: '',
    scope: '',
    issueDate: '',
    validDate: '',
    status: ''
  };

  // ✅ Called when Verify button is clicked
  showTable() {

    // ✅ Only show table when input is NOT empty
    if (this.regNumber.trim() !== '') {
      this.isTableVisible = true;

      // ✅ Keep data blank
      this.certificate = {
        certificateNo: '',
        companyName: '',
        classification: '',
        scope: '',
        issueDate: '',
        validDate: '',
        status: ''
      };

    } else {
      // ❌ Hide table if input is empty
      this.isTableVisible = false;
      alert('Please enter Registration Number');
    }
  }  }