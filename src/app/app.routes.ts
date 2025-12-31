import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WhyAccricComponent } from './pages/why-accric/why-accric.component';
//import { ServicesComponent } from './pages/services/services.component';
import { GovernaceRiskComponent } from './pages/services/governace-risk/governace-risk.component';
import { BusinessExcellenceComponent } from './pages/services/business-excellence/business-excellence.component';
import { EnvironmentSustainabilityComponent } from './pages/services/environment-sustainability/environment-sustainability.component';
import { IsoManagementSystemAdvisoryComponent } from './pages/services/iso-management-system-advisory/iso-management-system-advisory.component';
import { UnderstandingHippaComplianceComponent } from './pages/blogs/understanding-hippa-compliance/understanding-hippa-compliance.component';
import { Is042001ForAgenticAiComponent } from './pages/blogs/is0-42001-for-agentic-ai/is0-42001-for-agentic-ai.component';
import { ImplementIso27001Component } from './pages/blogs/implement-iso-27001/implement-iso-27001.component';
import { PciCertificationComponent } from './pages/pci-certification/pci-certification.component';
import { PciDssComponent } from './pages/pci-dss/pci-dss.component';


import { ContactusComponent } from './pages/contact/contactus.component';
import { AllBlogs } from './components/all-blogs/all-blogs';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'why-accric', component: WhyAccricComponent },
  //{ path: 'services', component: ServicesComponent },
  { path: 'services/governace-risk', component: GovernaceRiskComponent },
  { path: 'services/business-excellence', component: BusinessExcellenceComponent },
  { path: 'services/environment-sustainbility', component: EnvironmentSustainabilityComponent },
  { path: 'services/iso-management-system-advisory', component: IsoManagementSystemAdvisoryComponent },
  { path: 'blogs/understanding-hippa-compliance', component: UnderstandingHippaComplianceComponent },
  { path: 'blogs/app-is0-42001-for-agentic-ai', component: Is042001ForAgenticAiComponent },
  { path: 'blogs/implement-iso-27001.component', component: ImplementIso27001Component },
  { path: 'pci-certification', component: PciCertificationComponent },
  { path: 'pci-dss', component: PciDssComponent },
  { path: 'all-blogs', component: AllBlogs },

  { path: 'contact-us', component: ContactusComponent },
];
