import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [RouterModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent {
  services = [
    {
      icon: '/assets/images/governance.png',
      title: 'Governance, risk & compliance services',
      link: '/services/governace-risk'
    },
    {
      icon: '/assets/images/business.png',
      title: 'Business excellence & transformations services',
      link: '/services/business-excellence'
    },
    {
      icon: '/assets/images/environment.png',
      title: 'Environment & sustainability services',
      link: '/services/environment-sustainbility'
    },
    {
      icon: '/assets/images/iso.png',
      title: 'ISO management system advisory services',
      link: '/services/iso-management-system-advisory'
    }
  ];
}
