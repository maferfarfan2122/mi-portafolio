import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PageProjectsComponent } from './pages/page-projects/page-projects.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'project/:id',
    component: PageProjectsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];