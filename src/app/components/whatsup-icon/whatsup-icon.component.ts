import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-whatsup-icon',
  standalone: true,
   imports: [
    CommonModule,
    RouterLink,
  ],   // ✅ Add this!
  templateUrl: './whatsup-icon.component.html',
  styleUrl: './whatsup-icon.component.scss',
})
export class WhatsupIconComponent {
  isOpen = false;

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }
}