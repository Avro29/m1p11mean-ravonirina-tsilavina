import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../services/http.service';
import { HttpClientModule } from '@angular/common/http';

declare interface navItem {
  path: string;
  icon: string;
  title: string;
}

export const ROUTES: navItem[] = [
  {
    path: '/services',
    title: 'Services disponibles',
    icon: 'shopping_tag-content',
  },
  {
    path: '/appointments',
    title: 'Mes rendez-vous',
    icon: 'ui-1_calendar-60',
  },
];

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, NgbModule, CommonModule, HttpClientModule],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  menuItems!: any[];

  constructor(
    public location: Location,
    private element: ElementRef,
    private readonly httpService: HttpService
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.menuItems = ROUTES.filter((menuItem: any) => menuItem);
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  logout() {
    this.httpService.logout().subscribe(() => {
      localStorage.clear();
      this.httpService.router.navigate(['/signin']);
    });
  }
}
