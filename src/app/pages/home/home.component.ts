import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccricSectionComponent } from '../../components/accric-section/accric-section.component';
import { CompanySuccessComponent } from '../../components/company-success/company-success.component';
import { OurServicesComponent } from '../../components/our-services/our-services.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { WhyChooseUsComponent } from '../../components/why-choose-us/why-choose-us.component';
import { KeyCustomersComponent } from '../../components/key-customers/key-customers.component';
import { BlogSectionComponent } from '../../components/blog-section/blog-section.component';
import { OurOfferingComponent } from '../../components/our-offering/our-offering.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    OurOfferingComponent,
    AccricSectionComponent,
    CompanySuccessComponent,
    OurServicesComponent,
    HeroSectionComponent,
    WhyChooseUsComponent,
    KeyCustomersComponent,
    BlogSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  slides = [
    {
      img: 'https://accric.com/wp-content/themes/acrric/Assets/images/home/slide-1.jpg',
      title: 'Precision and Commitment in Governance & Compliance',
      subtitle: 'Driving risk-aware, efficient, and compliant business operations with accuracy and integrity.'
    },
    {
      img: 'https://accric.com/wp-content/themes/acrric/Assets/images/home/slide-2.jpg',
      title: 'Ensuring Accuracy, Adherence, and Business Excellence',
      subtitle: 'Seamless integration of governance, risk, and compliance to enhance business success.'
    },
    {
      img: 'https://accric.com/wp-content/themes/acrric/Assets/images/home/slide-3.jpg',
      title: 'Navigating Compliance with Expertise and Innovation',
      subtitle: 'Innovative solutions to simplify compliance, mitigate risks, and drive sustainable growth.'
    }
  ];

  currentIndex = 0;
  showText = true;
  interval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startSlider();
  }

  startSlider() {
    this.interval = setInterval(() => {

      // Hide text before changing image
      this.showText = false;
      this.cdr.detectChanges();

      setTimeout(() => {
        // Change slide
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.showText = true;
        this.cdr.detectChanges();
      }, 900);

    }, 3500); // total cycle ~3.5 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}