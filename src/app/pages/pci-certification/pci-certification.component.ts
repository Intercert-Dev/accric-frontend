import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pci-certification',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './pci-certification.component.html',
  styleUrl: './pci-certification.component.scss',
})
export class PciCertificationComponent {

  regNumber: string = '';
  isTableVisible: boolean = false;
  errorMessage: string = '';

  certificate = {
    certificateNo: '',
    companyName: '',
    classification: '',
    scope: '',
    issueDate: '',
    validDate: '',
    status: ''
  };

  constructor(private http: HttpClient) {}

  showTable() {
    this.errorMessage = '';
    this.isTableVisible = false;

    // Validate input
    if (this.regNumber.trim() === '') {
      this.errorMessage = "Please enter Registration Number";
      return;
    }
    // const apiUrl = `http://pci.accric.com/api/auth/client-certificate?certificateNo=${this.regNumber}`;
   const apiUrl = `http://pci.accric.com/api/auth/certificate-details/${this.regNumber}`;
    this.http.get<any>(apiUrl).subscribe({
      next: (res) => {
        if (res && res.data && Object.keys(res.data).length > 0) {

          this.certificate = {
            certificateNo: res.data.certificate_number_unique_id || '',
            companyName: res.data.client?.legal_entity_name || '',
            classification: res.data.classification || '',
            scope: res.data.audit_status || '',
            issueDate: res.data.certificate_issue_date || '',
            validDate: res.data.certificate_expiry_date || '',
            status: res.data.audit_status || ''
          };

          this.isTableVisible = true;

        } else {
          this.errorMessage = "No certificate record found!";
        }
      },

      error: (err) => {
        console.error("API Error:", err);

        if (err.status === 404) {
          this.errorMessage = "No certificate found for this number!";
        } else {
          this.errorMessage = "Server error! Please try again later.";
        }

        this.isTableVisible = false;
      }
    });
  }
}
