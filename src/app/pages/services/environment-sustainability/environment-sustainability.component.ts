import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';   // ⭐ ADD THIS

import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-environment-sustainability',
  standalone: true,
   imports: [CommonModule,ReactiveFormsModule, RouterModule,RouterLink],
  templateUrl: './environment-sustainability.component.html',
  styleUrl: './environment-sustainability.component.scss',
})
export class EnvironmentSustainabilityComponent {
     showConsultation = false;
  isOpen = false;

  consultationForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.consultationForm = this.fb.group({
      name: [''],
      email: [''],
      number: [''],
      company: [''],
      subject: [''],
      message: ['']
    });
  }

  toggleConsultation() {
    this.showConsultation = !this.showConsultation;
    this.isOpen = false;
  }

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  submitForm() {
    this.http.post('https://accric-frontend.vercel.app/api/send-mail', this.consultationForm.value).subscribe({
      next: () => {
        alert("Email sent successfully!");
        this.consultationForm.reset();
      },
      error: () => {
        alert("Failed to send email.");
      }
    });
  }
}
