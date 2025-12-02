import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
export class HeroSectionComponent {
    showConsultation = false;
  isOpen = false;

  consultationForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.consultationForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
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
