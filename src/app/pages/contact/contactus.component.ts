
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { CommonModule, isPlatformBrowser } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import intlTelInput from 'intl-tel-input';

import { SafeUrlPipe } from '../contact/safe-url.pipe';
declare var grecaptcha: any;
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SafeUrlPipe],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
})
export class ContactusComponent implements OnInit, AfterViewInit {
  consultationForm!: FormGroup;
  @ViewChild('phoneInput')
  phoneInput!: ElementRef<HTMLInputElement>;

  @ViewChild('recaptchaContainer')
recaptchaContainer!: ElementRef;
private platformId = inject(PLATFORM_ID);

iti: any;

siteKey = '6LfP5T4tAAAAAGEkX3gGcSyfR1_7jtYxFk4Ky_9U';

captchaVerified = false;

captchaError = false;

// ADD THIS
captchaWidgetId: number | null = null;

  // ⭐ NEW: For custom country dropdown

  offices = [
    {
      id: 'usa',
      title: 'United States Office',
      company: 'ACCRIC LLC',
      address: '3010 LBJ Freeway, Ste# 1200, Dallas, Texas 75234, United States',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6699.0294915318345!2d-96.88024962444631!3d32.910995873607824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c27755da43955%3A0x47adfb07b2eac3db!2s3010%20Lyndon%20B%20Johnson%20Fwy%2C%20Dallas%2C%20TX%2075234%2C%20USA!5e0!3m2!1sen!2sin!4v1782719064556!5m2!1sen!2sin',
    },
    {
      id: 'uae',
      title: 'UAE Office',
      company: 'ACCRIC International LLC-FZ',
      address: 'Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, UAE',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.184888965335!2d55.307013315009!3d25.154684983887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b6789abcde9%3A0xabcde1234567890!2sMeydan%20Grandstand!5e0!3m2!1sen!2sae!4v1726685700000!5m2!1sen!2sae',
    },
    {
      id: 'india',
      title: 'India Office',
      company: 'ACCRIC Infotek Pvt Ltd',
      address: '403, I-thum Heights, A-16, Sector 62, Noida, 201301, India',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.123456789!2d77.401234!3d28.567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a123456789%3A0xabcde1234567890!2sCleo%20County!5e0!3m2!1sen!2sin!4v1726685800000!5m2!1sen!2sin',
    },
  ];

  selectedMap = this.offices[0].mapUrl;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    // Set default selected country to United States (+1)
    this.consultationForm = this.fb.group({
  number: ['', Validators.required],

  name: [
    '',
    [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z ]+$/),
    ],
  ],

  email: [
    '',
    [
      Validators.required,
      Validators.email,
      Validators.pattern(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      ),
    ],
  ],


company: [
  '',
  [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100),
    Validators.pattern(/^[A-Za-z ]+$/),
  ],
],
  subject: [
  '',
  [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
    Validators.pattern(/^[A-Za-z ]+$/),
  ],
],


  message: [
  '',
  [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(500),
    Validators.pattern(/^[A-Za-z0-9\s.,!?'"():;&\-\/]+$/),
  ],
],
});
  }

ngAfterViewInit(): void {

  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  this.iti = intlTelInput(this.phoneInput.nativeElement, {
    initialCountry: 'us',
    separateDialCode: true,
    nationalMode: true,
    autoPlaceholder: 'aggressive'
  });

  this.phoneInput.nativeElement.addEventListener(
    'countrychange',
    () => {

      const country = this.iti.getSelectedCountryData();

      if (country.iso2 === 'in') {
        this.phoneInput.nativeElement.maxLength = 10;
      } else {
        this.phoneInput.nativeElement.maxLength = 15;
      }

      this.phoneInput.nativeElement.value = '';

      this.consultationForm.patchValue({
        number: '',
      });

      this.consultationForm.get('number')?.setErrors(null);
    }
  );
setTimeout(() => {

  if (typeof grecaptcha === 'undefined') {
    console.error('Google reCAPTCHA script not loaded.');
    return;
  }

  this.captchaWidgetId = grecaptcha.render(
    this.recaptchaContainer.nativeElement,
    {
      sitekey: this.siteKey,

      callback: (token: string) => {

        console.log('Captcha Token:', token);

        this.captchaVerified = true;
        this.captchaError = false;

      },

      'expired-callback': () => {

        this.captchaVerified = false;
        this.captchaError = true;

      },

      'error-callback': () => {

        this.captchaVerified = false;
        this.captchaError = true;

        console.error('reCAPTCHA failed to load.');

      }

    }
  );

}, 500);
}
  allowOnlyLetters(event: KeyboardEvent) {
    const char = event.key;

    if (!/^[a-zA-Z ]$/.test(char)) {
      event.preventDefault();
    }
  }

onlyNumbers(event: any) {

  const country = this.iti.getSelectedCountryData();

  let value = event.target.value.replace(/\D/g, '');

  if (country.iso2 === 'in') {

    value = value.substring(0, 10);

    // First digit must be 6-9
    if (value.length > 0 && !/^[6-9]/.test(value)) {
      value = '';
    }

    // Maximum 4 repeated digits at the beginning
    if (this.hasInvalidStartingRepeats(value, 4)) {
      value = value.slice(0, -1);
      
    }

  } else {

    value = value.substring(0, 15);

    // Maximum 5 repeated digits at the beginning
    if (this.hasInvalidStartingRepeats(value, 5)) {
      value = value.slice(0, -1);
    }

  }

  // Don't allow sequential digits of length 6 or more
  if (this.hasSequentialDigits(value, 6)) {
    value = value.slice(0, -1);
  }

  event.target.value = value;

  this.consultationForm.patchValue({
    number: value
  });
}

allowCompanyInput(event: KeyboardEvent) {

  const companyControl = this.consultationForm.get('company');
  const char = event.key;

  if (!/^[a-zA-Z ]$/.test(char)) {

    event.preventDefault();

    companyControl?.setErrors({
      ...(companyControl.errors || {}),
      invalidCharacter: true
    });

    companyControl?.markAsTouched();

  } else {

    if (companyControl?.hasError('invalidCharacter')) {

      const errors = { ...(companyControl.errors || {}) };
      delete errors['invalidCharacter'];

      companyControl.setErrors(
        Object.keys(errors).length ? errors : null
      );
    }
  }
}

preventCompanyPaste(event: ClipboardEvent) {

  const text = event.clipboardData?.getData('text') || '';

  if (!/^[A-Za-z ]+$/.test(text)) {
    event.preventDefault();
  }

}

allowMessageInput(event: KeyboardEvent) {
  const char = event.key;

  if (!/^[A-Za-z0-9\s.,!?'"():;&\-\/]$/.test(char)) {
    event.preventDefault();
  }
}

preventMessagePaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData('text') || '';

  if (!/^[A-Za-z0-9\s.,!?'"():;&\-\/]+$/.test(text)) {
    event.preventDefault();
  }
}

allowEmailInput(event: KeyboardEvent) {
  const char = event.key;

  // Allow control keys
  if ([
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'Home',
    'End'
  ].includes(char)) {
    return;
  }

  if (!/^[A-Za-z0-9@._%+-]$/.test(char)) {
    event.preventDefault();
  }
}

preventEmailPaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData('text') || '';

  if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(text)
  ) {
    event.preventDefault();
  }
}
private hasInvalidStartingRepeats(value: string, maxRepeat: number): boolean {

  if (!value) return false;

  let count = 1;

  for (let i = 1; i < value.length; i++) {

    if (value[i] === value[0]) {
      count++;
    } else {
      break;
    }
  }

  return count > maxRepeat;
}
  preventInvalidPaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData?.getData('text') || '';

    if (!/^[a-zA-Z ]+$/.test(pastedText)) {
      event.preventDefault();
    }
  }


  private hasSequentialDigits(value: string, limit: number = 6): boolean {

  let ascCount = 1;
  let descCount = 1;

  for (let i = 1; i < value.length; i++) {

    const prev = Number(value[i - 1]);
    const curr = Number(value[i]);

    // Ascending sequence (0-9 circular)
    if (curr === (prev + 1) % 10) {
      ascCount++;
    } else {
      ascCount = 1;
    }

    // Descending sequence (9-0 circular)
    if (curr === (prev + 9) % 10) {
      descCount++;
    } else {
      descCount = 1;
    }

    if (ascCount >= limit || descCount >= limit) {
      return true;
    }
  }

  return false;
}
submitForm() {

  if (this.consultationForm.invalid) {
    this.consultationForm.markAllAsTouched();
    return;
  }

  // ✅ Check reCAPTCHA
  if (!this.captchaVerified) {
    this.captchaError = true;
    return;
  }

  const phone = this.phoneInput.nativeElement.value.replace(/\D/g, '');
  const country = this.iti.getSelectedCountryData();
  const phoneControl = this.consultationForm.get('number');

  // Clear previous errors
  phoneControl?.setErrors(null);

  if (country.iso2 === 'in') {

    // Must be exactly 10 digits and start with 6-9
    if (!/^[6-9]\d{9}$/.test(phone)) {
      phoneControl?.setErrors({
        invalidStart: true,
      });
      return;
    }

    // More than 4 repeated digits at the beginning
    if (this.hasInvalidStartingRepeats(phone, 4)) {
      phoneControl?.setErrors({
        repeatedDigits: true,
      });
      return;
    }

    // Sequential numbers
    if (this.hasSequentialDigits(phone, 6)) {
      phoneControl?.setErrors({
        sequentialDigits: true,
      });
      return;
    }

  } else {

    // Foreign number length
    if (phone.length < 7 || phone.length > 15) {
      phoneControl?.setErrors({
        invalidLength: true,
      });
      return;
    }

    // More than 5 repeated digits at the beginning
    if (this.hasInvalidStartingRepeats(phone, 5)) {
      phoneControl?.setErrors({
        repeatedDigits: true,
      });
      return;
    }

    // Sequential numbers
    if (this.hasSequentialDigits(phone, 6)) {
      phoneControl?.setErrors({
        sequentialDigits: true,
      });
      return;
    }

  }

  const fullPhone = '+' + country.dialCode + ' ' + phone;

  const formData = {
    ...this.consultationForm.value,
    phone: fullPhone,
    captchaVerified: this.captchaVerified
  };

  this.http.post(

    'http://accric.com/api/send-mail',
    
    formData
  ).subscribe({

    next: () => {

      alert('Email sent successfully!');

      this.consultationForm.reset({
        number: '',
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
      });

      this.iti.setCountry('us');
      this.phoneInput.nativeElement.value = '';

      // Reset reCAPTCHA
      this.captchaVerified = false;
      this.captchaError = false;

if (this.captchaWidgetId !== null) {
  grecaptcha.reset(this.captchaWidgetId);
}
    },

    error: () => {
      alert('Failed to send email.');
    }

  });

}
  selectOffice(map: string) {
    this.selectedMap = map;
  }
}
