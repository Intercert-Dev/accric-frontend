import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';


@Component({
  selector: 'app-all-blogs',
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './all-blogs.html',
  styleUrl: './all-blogs.scss',
})
export class AllBlogs {

   blogs = [
    {
      image: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/blog1.png',
      date: 'Apr 08, 2025',
      title: 'Understanding HIPAA Compliance: Protecting Electronic Health Records and Strengthening Data Privacy in the Digital Age',
      description: '/blogs/understanding-hippa-compliance',
    },
    {
      image: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/blog2.png',
      date: 'Apr 08, 2025',
      title: 'The Significance of ISO 42001 for Agentic AI: Cultivating Trust and Promoting Responsible AI Development',
      description: '/blogs/app-is0-42001-for-agentic-ai',
    },
    {
      image: 'https://accric-pci-web.s3.ap-south-1.amazonaws.com/accric/Frontend/blog3.png',
      date: 'Apr 08, 2025',
      title: 'Implementing ISO 27001 in Financial Institutions: A Pathway to Robust Information Security',
      description: '/blogs/implement-iso-27001.component',
    },
  ];
}
