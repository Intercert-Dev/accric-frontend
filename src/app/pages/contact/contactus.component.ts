import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import {SafeUrlPipe} from '../contact/safe-url.pipe';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,SafeUrlPipe],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
})
export class ContactusComponent {

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










   offices = [
    {
      id: 'usa',
      title: 'United States Office',
      company: 'ACCRIC LLC',
      address: '3010 LBJ Freeway, Ste# 1200, Dallas, Texas 75234, United States',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3449.794142276551!2d-95.47027532570812!3d30.15730101321709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864736b77b756747%3A0x7d1b5f3b015b1aa!2s2001%20Timberloch%20Pl%20%23500%2C%20The%20Woodlands%2C%20TX%2077380%2C%20USA!5e0!3m2!1sen!2sin!4v1726685658953!5m2!1sen!2sin'
    },
    {
      id: 'uae',
      title: 'UAE Office',
      company: 'ACCRIC International LLC-FZ',
      address: 'Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, UAE',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12...your_UAE_map_link_here'
    },
    {
      id: 'india',
      title: 'India Office',
      company: 'ACCRIC Infotek Pvt Ltd',
      address: '1403, Tower C6, Cleo County, Sector 121, Noida – 201301, India',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12...your_India_map_link_here'
    }
  ];

  selectedMap = this.offices[0].mapUrl;

  selectOffice(map: string) {
    this.selectedMap = map;
  }
}

