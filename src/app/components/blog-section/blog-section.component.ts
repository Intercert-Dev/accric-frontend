
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.scss'],
})
export class BlogSectionComponent {
  blogs = [
    {
      image: '/assets/images/blog1.png',
      date: 'Apr 08, 2025',
      title: 'Understanding HIPAA Compliance: Protecting Electronic Health Records and Strengthening Data Privacy in the Digital Age',
      description: '',
    },
    {
      image: '/assets/images/blog2.png',
      date: 'Apr 08, 2025',
      title: 'The Significance of ISO 42001 for Agentic AI: Cultivating Trust and Promoting Responsible AI Development',
      description: '',
    },
    {
      image: '/assets/images/blog3.png',
      date: 'Apr 08, 2025',
      title: 'Implementing ISO 27001 in Financial Institutions: A Pathway to Robust Information Security',
      description: '',
    },
  ];
}
