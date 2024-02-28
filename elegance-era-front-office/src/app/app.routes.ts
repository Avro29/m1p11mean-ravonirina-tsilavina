import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
];
