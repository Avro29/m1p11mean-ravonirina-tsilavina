import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

declare interface serviceInterface {
  nom: String;
  duree: String;
  commission: String;
  prix: String;
  id: String;
  [key: string]: String;
}

@Component({
  standalone: true,
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  imports: [CommonModule],
})
export class ServicesComponent implements OnInit {
  tableTitle: String = 'Liste des services';
  headTable: string[] = ['Nom', 'Duree', 'Commission', 'Prix'];
  serviceDatas: serviceInterface[] = [];

  constructor() {}

  ngOnInit() {
    this.serviceDatas = [
      {
        nom: 'nom1',
        duree: 'duree1',
        commission: '1',
        prix: '$554',
        id: '1',
      },
      {
        nom: 'nom2',
        duree: 'duree2',
        commission: '2',
        prix: '$554',
        id: '2',
      },
      {
        nom: 'nom3',
        duree: 'duree3',
        commission: '3',
        prix: '$554',
        id: '3',
      },
      {
        nom: 'nom4',
        duree: 'duree4',
        commission: '4',
        prix: '$554',
        id: '4',
      },
      {
        nom: 'nom5',
        duree: 'duree5',
        commission: '5',
        prix: '$554',
        id: '5',
      },
      {
        nom: 'nom6',
        duree: 'duree6',
        commission: '6',
        prix: '$554',
        id: '6',
      },
      {
        nom: 'nom7',
        duree: 'duree7',
        commission: '7',
        prix: '$554',
        id: '7',
      },
      {
        nom: 'nom8',
        duree: 'duree8',
        commission: '8',
        prix: '$554',
        id: '8',
      },
      {
        nom: 'nom9',
        duree: 'duree9',
        commission: '9',
        prix: '$554',
        id: '9',
      },
    ];
  }

  editItem(service: serviceInterface) {
    console.log('Edit:', service);
  }

  removeItem(service: serviceInterface) {
    // const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
    //   data: { message: `Are you sure you want to remove "${service.nom}"?` },
    // });

    // confirmationDialog.afterClosed().subscribe((confirmed) => {
    //   if (confirmed) {
    //     console.log('Item removed:', service);
    const index = this.serviceDatas.findIndex((obj) => obj.id === service.id);
    if (index !== -1) {
      this.serviceDatas.splice(index, 1); // Remove 1 item at the found index
    }
    //   }
    // });
  }
}
