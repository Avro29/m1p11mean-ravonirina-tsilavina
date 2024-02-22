import { Routes } from '@angular/router';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { PersonnelsComponent } from './components/personnels/personnels.component';
import { ServicesComponent } from './components/services/services.component';
import { DepensesComponent } from './components/depenses/depenses.component';
import { AddServicesComponent } from './components/add.services/add.services.component';
import { AddPersonnelsComponent } from './components/add.personnels/add.personnels.component';

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
  {
    path: 'depenses',
    component: DepensesComponent,
  },
  {
    path: 'services/add',
    component: AddServicesComponent,
  },
  {
    path: 'personnels/add',
    component: AddPersonnelsComponent,
  },
];
