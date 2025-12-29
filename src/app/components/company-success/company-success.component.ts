import { Component, AfterViewInit, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-success.component.html',
  styleUrls: ['./company-success.component.scss']
})
export class CompanySuccessComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCountersWhenVisible();
    }
  }

  startCountersWhenVisible() {
    const counters = this.el.nativeElement.querySelectorAll('.timer') as NodeListOf<HTMLElement>;

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((counter: HTMLElement) => {
      observer.observe(counter.parentElement!);
    });
  }

  startCounters() {
    const counters = this.el.nativeElement.querySelectorAll('.timer') as NodeListOf<HTMLElement>;

    counters.forEach((counter: HTMLElement) => {
      const targetValue = counter.getAttribute('data-to');
      if (!targetValue) return;

      const target = Number(targetValue);
      let count = 0;
      const duration = 2000;
      const interval = 30;
      const increment = target / (duration / interval);

      counter.textContent = '0';

      const timer = setInterval(() => {
        count += increment;

        if (count >= target) {
          count = target;
          clearInterval(timer);
        }

        counter.textContent = Math.floor(count).toString();
      }, interval);
    });
  }
}