import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/statistiques',
    title: 'Statistiques',
    icon: 'business_chart-bar-32',
    class: '',
  },
  {
    path: '/personnels',
    title: 'Gestion du personnel',
    icon: 'users_single-02',
    class: '',
  },
  {
    path: '/services',
    title: 'Gestion des services',
    icon: 'shopping_bag-16',
    class: '',
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'elegance-era-back-office';
  menuItems: any[] = [];
  test: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
