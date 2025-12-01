import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';   // ⭐ ADD THIS
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-whatsup-icon',
  standalone: true,
  imports: [
    CommonModule,          // ⭐ REQUIRED for *ngIf, *ngFor, class binding
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './whatsup-icon.component.html',
  styleUrls: ['./whatsup-icon.component.scss']
})
export class WhatsupIconComponent {
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
    this.http.post('/send-mail', this.consultationForm.value).subscribe({
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
