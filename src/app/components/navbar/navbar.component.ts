// import { Component, HostListener } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

// @Component({
//   imports: [RouterModule, CommonModule,RouterLink,RouterLinkActive],
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent {
//   isScrolled = false;

//   @HostListener('window:scroll', [])
//   onScroll() {
//     this.isScrolled = window.scrollY > 60;
//   }
// }




import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

   isMenuOpen = false;

  isServicesDesktopOpen = false;
  isPciDesktopOpen = false;

  isServicesMobileOpen = false;
  isPciMobileOpen = false;

  toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;

  if (this.isMenuOpen) {
    document.body.classList.add('menu-lock');
  } else {
    document.body.classList.remove('menu-lock');
  }
}

closeMenu() {
  this.isMenuOpen = false;
  document.body.classList.remove('menu-lock');
}

  closeAllDropdowns() {
    this.isServicesDesktopOpen = false;
    this.isPciDesktopOpen = false;
    this.isServicesMobileOpen = false;
    this.isPciMobileOpen = false;
  }

  toggleServicesDesktop() {
    if (window.innerWidth >= 768) {
      this.isServicesDesktopOpen = !this.isServicesDesktopOpen;
      this.isPciDesktopOpen = false;
    }
  }

  togglePciDesktop() {
    if (window.innerWidth >= 768) {
      this.isPciDesktopOpen = !this.isPciDesktopOpen;
      this.isServicesDesktopOpen = false;
    }
  }

  toggleServicesMobile() {
    if (window.innerWidth < 768) {
      this.isServicesMobileOpen = !this.isServicesMobileOpen;
      this.isPciMobileOpen = false;
    }
  }

  togglePciMobile() {
    if (window.innerWidth < 768) {
      this.isPciMobileOpen = !this.isPciMobileOpen;
      this.isServicesMobileOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('header')) {
      this.closeAllDropdowns();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 768 && this.isMenuOpen) {
      this.closeMenu();
    }
  }
}