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
      icon: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/governance.png',
      title: 'Governance, risk & compliance services',
      link: '/services/governace-risk'
    },
    {
      icon: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/business.png',
      title: 'Business excellence & transformations services',
      link: '/services/business-excellence'
    },
    {
      icon: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/environment.png',
      title: 'Environment & sustainability services',
      link: '/services/environment-sustainbility'
    },
    {
      icon: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/so.png',
      title: 'ISO management system advisory services',
      link: '/services/iso-management-system-advisory'
    }
  ];
}
