import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    icon: 'ui-1_settings-gear-63',
    class: '',
  },
  {
    path: '/depenses',
    title: 'Gestion des depenses',
    icon: 'shopping_cart-simple',
    class: '',
  },
];

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterModule, NgbModule, CommonModule],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
