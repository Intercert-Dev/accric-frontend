import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { WhyAccricComponent } from './pages/why-accric/why-accric.component';
//import { ServicesComponent } from './pages/services/services.component';
import { GovernaceRiskComponent } from './pages/services/governace-risk/governace-risk.component';
import { BusinessExcellenceComponent } from './pages/services/business-excellence/business-excellence.component';
import { EnvironmentSustainabilityComponent } from './pages/services/environment-sustainability/environment-sustainability.component';
import { IsoManagementSystemAdvisoryComponent } from './pages/services/iso-management-system-advisory/iso-management-system-advisory.component';

import { ContactusComponent } from './pages/contact/contactus.component';

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
  { path: 'contact-us', component: ContactusComponent },
];