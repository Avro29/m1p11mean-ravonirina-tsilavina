import { Routes } from '@angular/router';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { PersonnelsComponent } from './components/personnels/personnels.component';
import { ServicesComponent } from './components/services/services.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'statistiques',
    pathMatch: 'full',
  },
  {
    path: 'statistiques',
    component: StatistiquesComponent,
  },
  {
    path: 'personnels',
    component: PersonnelsComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
];
