import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../contact/safe-url.pipe';

import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafeUrlPipe],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
})
export class ContactusComponent {

  consultationForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  countryCodes = [
  { name: "Afghanistan", dial_code: "+93", code: "AF", flag: "🇦🇫" },
  { name: "Albania", dial_code: "+355", code: "AL", flag: "🇦🇱" },
  { name: "Algeria", dial_code: "+213", code: "DZ", flag: "🇩🇿" },
  { name: "Argentina", dial_code: "+54", code: "AR", flag: "🇦🇷" },
  { name: "Australia", dial_code: "+61", code: "AU", flag: "🇦🇺" },
  { name: "Austria", dial_code: "+43", code: "AT", flag: "🇦🇹" },
  { name: "Bangladesh", dial_code: "+880", code: "BD", flag: "🇧🇩" },
  { name: "Belgium", dial_code: "+32", code: "BE", flag: "🇧🇪" },
  { name: "Brazil", dial_code: "+55", code: "BR", flag: "🇧🇷" },
  { name: "Canada", dial_code: "+1", code: "CA", flag: "🇨🇦" },
  { name: "China", dial_code: "+86", code: "CN", flag: "🇨🇳" },
  { name: "Denmark", dial_code: "+45", code: "DK", flag: "🇩🇰" },
  { name: "Egypt", dial_code: "+20", code: "EG", flag: "🇪🇬" },
  { name: "Finland", dial_code: "+358", code: "FI", flag: "🇫🇮" },
  { name: "France", dial_code: "+33", code: "FR", flag: "🇫🇷" },
  { name: "Germany", dial_code: "+49", code: "DE", flag: "🇩🇪" },
  { name: "Hong Kong", dial_code: "+852", code: "HK", flag: "🇭🇰" },
  { name: "India", dial_code: "+91", code: "IN", flag: "🇮🇳" },
  { name: "Indonesia", dial_code: "+62", code: "ID", flag: "🇮🇩" },
  { name: "Ireland", dial_code: "+353", code: "IE", flag: "🇮🇪" },
  { name: "Italy", dial_code: "+39", code: "IT", flag: "🇮🇹" },
  { name: "Japan", dial_code: "+81", code: "JP", flag: "🇯🇵" },
  { name: "Kenya", dial_code: "+254", code: "KE", flag: "🇰🇪" },
  { name: "Kuwait", dial_code: "+965", code: "KW", flag: "🇰🇼" },
  { name: "Malaysia", dial_code: "+60", code: "MY", flag: "🇲🇾" },
  { name: "Mexico", dial_code: "+52", code: "MX", flag: "🇲🇽" },
  { name: "Nepal", dial_code: "+977", code: "NP", flag: "🇳🇵" },
  { name: "Netherlands", dial_code: "+31", code: "NL", flag: "🇳🇱" },
  { name: "New Zealand", dial_code: "+64", code: "NZ", flag: "🇳🇿" },
  { name: "Nigeria", dial_code: "+234", code: "NG", flag: "🇳🇬" },
  { name: "Norway", dial_code: "+47", code: "NO", flag: "🇳🇴" },
  { name: "Oman", dial_code: "+968", code: "OM", flag: "🇴🇲" },
  { name: "Pakistan", dial_code: "+92", code: "PK", flag: "🇵🇰" },
  { name: "Philippines", dial_code: "+63", code: "PH", flag: "🇵🇭" },
  { name: "Qatar", dial_code: "+974", code: "QA", flag: "🇶🇦" },
  { name: "Russia", dial_code: "+7", code: "RU", flag: "🇷🇺" },
  { name: "Saudi Arabia", dial_code: "+966", code: "SA", flag: "🇸🇦" },
  { name: "Singapore", dial_code: "+65", code: "SG", flag: "🇸🇬" },
  { name: "South Africa", dial_code: "+27", code: "ZA", flag: "🇿🇦" },
  { name: "Spain", dial_code: "+34", code: "ES", flag: "🇪🇸" },
  { name: "Sri Lanka", dial_code: "+94", code: "LK", flag: "🇱🇰" },
  { name: "Sweden", dial_code: "+46", code: "SE", flag: "🇸🇪" },
  { name: "Switzerland", dial_code: "+41", code: "CH", flag: "🇨🇭" },
  { name: "Thailand", dial_code: "+66", code: "TH", flag: "🇹🇭" },
  { name: "Turkey", dial_code: "+90", code: "TR", flag: "🇹🇷" },
  { name: "UAE", dial_code: "+971", code: "AE", flag: "🇦🇪" },
  { name: "United Kingdom", dial_code: "+44", code: "GB", flag: "🇬🇧" },
  { name: "United States", dial_code: "+1", code: "US", flag: "🇺🇸" },
  { name: "Vietnam", dial_code: "+84", code: "VN", flag: "🇻🇳" }
];


  ngOnInit() {
    this.consultationForm = this.fb.group({
      countryCode: ['+91', Validators.required],
      number: ['', [Validators.required]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // ⭐ AUTO FORMAT PHONE NUMBER
    formatPhone() {
  const code = this.consultationForm.value.countryCode;
  let value = this.consultationForm.value.number.replace(/\D/g, ""); // digits only

  if (!value) return;

  let formatted = value;

  switch (code) {

    // 🇮🇳 India +91 → (987) 654-3210
     case "+91":
    formatted = value
      .replace(/(\d{5})(\d{0,5})/, "$1 $2")
      .trim();
    break;

    // 🇺🇸 USA +1 & 🇨🇦 Canada +1 → (650) 555-1234
    case "+1":
      formatted = value
        .replace(/(\d{3})(\d{3})(\d{0,4})/, "($1) $2-$3")
        .replace(/-$/, "");
      break;

    // 🇦🇪 UAE +971 → 050 123 4567
    case "+971":
      formatted = value
        .replace(/(\d{3})(\d{3})(\d{0,4})/, "$1 $2 $3")
        .trim();
      break;

    // 🇬🇧 UK +44 → 07123 456789
    case "+44":
      formatted = value
        .replace(/(\d{5})(\d{0,6})/, "$1 $2")
        .trim();
      break;

    // 🇸🇬 Singapore +65 → 8123 4567
    case "+65":
      formatted = value
        .replace(/(\d{4})(\d{0,4})/, "$1 $2")
        .trim();
      break;

    // 🇲🇾 Malaysia +60 → 012 345 6789
    case "+60":
      formatted = value
        .replace(/(\d{3})(\d{3})(\d{0,4})/, "$1 $2 $3")
        .trim();
      break;

    // 🇳🇵 Nepal +977 → 98-123456
    case "+977":
      formatted = value
        .replace(/(\d{2})(\d{0,6})/, "$1-$2")
        .trim();
      break;

    // 🇵🇰 Pakistan +92 → 0301 1234567
    case "+92":
      formatted = value
        .replace(/(\d{4})(\d{0,7})/, "$1 $2")
        .trim();
      break;

    // 🇧🇩 Bangladesh +880 → 01712-345678
    case "+880":
      formatted = value
        .replace(/(\d{5})(\d{0,6})/, "$1-$2")
        .trim();
      break;

    // 🇩🇪 Germany +49 → 030 123456
    case "+49":
      formatted = value
        .replace(/(\d{3})(\d{0,6})/, "$1 $2");
      break;

    // 🇫🇷 France +33 → 01 23 45 67 89
    case "+33":
      formatted = value
        .replace(/(\d{2})(\d{2})(\d{2})(\d{0,2})/, "$1 $2 $3 $4");
      break;

    default:
      // GENERIC FALLBACK (group spacing every 3–4 digits)
      formatted = value
        .replace(/(\d{3})(?=\d)/g, "$1 ")
        .trim();
  }

  this.consultationForm.patchValue(
    { number: formatted },
    { emitEvent: false }
  );
}



  // ⭐ VALIDATE INTERNATIONAL NUMBER
  validateInternationalPhone(): boolean {
    const code = this.consultationForm.value.countryCode;
    const number = this.consultationForm.value.number;

    const phone = parsePhoneNumberFromString(code + number);

    return phone?.isValid() ?? false;
  }

  submitForm() {
    // Validate before submit
    if (!this.validateInternationalPhone()) {
      this.consultationForm.get('number')?.setErrors({ invalidPhone: true });
      return;
    }

    const fullPhone = this.consultationForm.value.countryCode + ' ' + this.consultationForm.value.number;

    const formData = {
      ...this.consultationForm.value,
      phone: fullPhone
    };

    this.http.post('https://accric-frontend.vercel.app/api/send-mail', formData)
      .subscribe({
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
      'https://www.google.com/maps/embed?...uae link...'
  },
  {
    id: 'india',
    title: 'India Office',
    company: 'ACCRIC Infotek Pvt Ltd',
    address: '1403, Tower C6, Cleo County, Sector 121, Noida – 201301, India',
    mapUrl:
      'https://www.google.com/maps/embed?...india link...'
  }
];

selectedMap = this.offices[0].mapUrl;

selectOffice(map: string) {
  this.selectedMap = map;
}

}
