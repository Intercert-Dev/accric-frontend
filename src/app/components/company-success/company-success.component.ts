import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-success.component.html',
  styleUrls: ['./company-success.component.scss']
})
export class CompanySuccessComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Ensures DOM is fully ready
    setTimeout(() => {
      this.startCounters();
    }, 50);
  }

  startCounters() {
    const counters = document.querySelectorAll<HTMLElement>('.timer');
    if (!counters.length) return;

    const duration = 1500;
    const interval = 20;

    counters.forEach(counter => {
      const targetValue = counter.getAttribute('data-to');
      if (!targetValue) return;

      const target = Number(targetValue);
      let count = 0;
      const increment = target / (duration / interval);

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
