import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WhatsupIconComponent } from './components/whatsup-icon/whatsup-icon.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, WhatsupIconComponent, FooterComponent, ScrollTopComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'accric-website';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Check if window is available before using it
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0); // Scroll to the top of the page when navigation starts
        }
      }
    });
  }
}
