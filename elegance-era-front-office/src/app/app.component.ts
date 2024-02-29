import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NouisliderModule } from 'ng2-nouislider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesComponent } from './components/services/services.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { MainComponent } from './components/main/main.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NgbModule,
    RouterModule,
    NouisliderModule,
    FormsModule,
    HttpClientModule,
    NavbarComponent,
    ServicesComponent,
    HomeComponent,
    FooterComponent,
    AppointmentsComponent,
    MainComponent,
    SigninComponent,
    SignupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'elegance-era';
  constructor() {}

  ngOnInit(): void {}
}
