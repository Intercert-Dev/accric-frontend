import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      company: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]],
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
  this.http.post(
    'https://accric-frontend.vercel.app/api/send-mail',
    this.consultationForm.value
  ).subscribe({
    next: () => {
      alert("Email sent successfully!");
      this.consultationForm.reset();
    },
    error: (err) => {
      console.error(err);
      alert("Failed to send email.");
    }
  });
}

}
