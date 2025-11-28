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
    if (this.regNumber.trim() === '') {
      alert("Please enter Registration Number");
      this.isTableVisible = false;
      return;
    }

    const apiUrl = `http://pci.accric.com/api/auth/client-certificate?certificateNo=${this.regNumber}`;

   this.http.get<any>(apiUrl).subscribe({
  next: (res) => {
    if (res && res.data && Object.keys(res.data).length > 0) {
      console.log("Certificate No:", res);

      this.certificate = {
        certificateNo: res.data.certificate_number_unique_id || '',
        companyName: res.data.legal_entity_name || '',
        classification: res.data.assessment_classification || '',
        scope: res.data.audit_status || '',
        issueDate: res.data.certificate_issue_date || '',
        validDate: res.data.certificate_expiry_date || '',
        status: res.data.audit_status || ''
      };

      this.isTableVisible = true;
    }
  },

  error: (err) => {
    console.error("API Error:", err);

    if (err.status === 404) {
      alert("No certificate found for this number!");
    } else {
      alert("Server error! Please try again later.");
    }

    this.isTableVisible = false;   // ✅ Required
  }
});

  }
}
