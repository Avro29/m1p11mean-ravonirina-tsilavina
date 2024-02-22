import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { PersonnelsComponent } from './components/personnels/personnels.component';
import { ServicesComponent } from './components/services/services.component';
import { DepensesComponent } from './components/depenses/depenses.component';
import { AddServicesComponent } from './components/add.services/add.services.component';
import { AddPersonnelsComponent } from './components/add.personnels/add.personnels.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgbModule,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    StatistiquesComponent,
    PersonnelsComponent,
    ServicesComponent,
    DepensesComponent,
    AddServicesComponent,
    AddPersonnelsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
