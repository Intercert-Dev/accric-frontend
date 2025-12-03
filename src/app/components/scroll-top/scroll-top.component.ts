import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {
constructor() {
  console.log("ScrollTopComponent LOADED");
}
  showScroll = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScroll = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}
