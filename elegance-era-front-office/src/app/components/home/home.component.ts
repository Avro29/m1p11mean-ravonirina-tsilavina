import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import Rellax from 'rellax';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    NgbModule,
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
  ],
})
export class HomeComponent implements OnInit {
  constructor() {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > 500) {
      element.classList.remove('navbar-transparent');
    } else {
      element.classList.add('navbar-transparent');
    }
  }

  ngOnInit(): void {
    var rellaxHeader = new Rellax('.rellax-header');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
  }
}
