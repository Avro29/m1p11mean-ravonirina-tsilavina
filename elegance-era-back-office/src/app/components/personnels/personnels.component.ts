import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

declare interface personnelInterface {
  nom: String;
  email: String;
  numero: String;
  id: String;
  [key: string]: String;
}

@Component({
  standalone: true,
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css'],
  imports: [CommonModule],
})
export class PersonnelsComponent implements OnInit {
  tableTitle: String = 'Liste du personnel';
  headTable: string[] = ['Nom', 'Email', 'Numero'];
  personnelDatas: personnelInterface[] = [];

  constructor() {}

  ngOnInit() {
    this.personnelDatas = [
      {
        nom: 'nom1',
        email: 'email1',
        numero: 'numero1',
        id: '1',
      },
      {
        nom: 'nom2',
        email: 'email2',
        numero: 'numero2',
        id: '2',
      },
      {
        nom: 'nom3',
        email: 'email3',
        numero: 'numero3',
        id: '3',
      },
      {
        nom: 'nom4',
        email: 'email4',
        numero: 'numero4',
        id: '4',
      },
      {
        nom: 'nom5',
        email: 'email5',
        numero: 'numero5',
        id: '5',
      },
      {
        nom: 'nom6',
        email: 'email6',
        numero: 'numero6',
        id: '6',
      },
      {
        nom: 'nom7',
        email: 'email7',
        numero: 'numero7',
        id: '7',
      },
      {
        nom: 'nom8',
        email: 'email8',
        numero: 'numero8',
        id: '8',
      },
      {
        nom: 'nom9',
        email: 'email9',
        numero: 'numero9',
        id: '9',
      },
    ];
  }

  editItem(personnel: personnelInterface) {
    console.log('Edit:', personnel);
  }

  removeItem(personnel: personnelInterface) {
    // const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
    //   data: { message: `Are you sure you want to remove "${service.nom}"?` },
    // });

    // confirmationDialog.afterClosed().subscribe((confirmed) => {
    //   if (confirmed) {
    //     console.log('Item removed:', service);
    const index = this.personnelDatas.findIndex(
      (obj) => obj.id === personnel.id
    );
    if (index !== -1) {
      this.personnelDatas.splice(index, 1); // Remove 1 item at the found index
    }
    //   }
    // });
  }
}
