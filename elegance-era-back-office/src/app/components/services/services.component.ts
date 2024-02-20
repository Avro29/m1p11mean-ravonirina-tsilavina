import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

declare interface serviceInterface {
  name: String;
  country: String;
  city: String;
  salary: String;
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
  headTable: string[] = ['Name', 'Country', 'City', 'Salary'];
  serviceDatas: serviceInterface[] = [];

  constructor() {}

  ngOnInit() {
    this.serviceDatas = [
      {
        name: 'name1',
        country: 'country1',
        city: 'city1',
        salary: '$554',
        id: '1',
      },
      {
        name: 'name2',
        country: 'country2',
        city: 'city2',
        salary: '$554',
        id: '2',
      },
      {
        name: 'name3',
        country: 'country3',
        city: 'city3',
        salary: '$554',
        id: '3',
      },
      {
        name: 'name4',
        country: 'country4',
        city: 'city4',
        salary: '$554',
        id: '4',
      },
      {
        name: 'name5',
        country: 'country5',
        city: 'city5',
        salary: '$554',
        id: '5',
      },
      {
        name: 'name6',
        country: 'country6',
        city: 'city6',
        salary: '$554',
        id: '6',
      },
      {
        name: 'name7',
        country: 'country7',
        city: 'city7',
        salary: '$554',
        id: '7',
      },
      {
        name: 'name8',
        country: 'country8',
        city: 'city8',
        salary: '$554',
        id: '8',
      },
      {
        name: 'name9',
        country: 'country9',
        city: 'city9',
        salary: '$554',
        id: '9',
      },
    ];
  }

  editItem(service: serviceInterface) {
    console.log('Edit:', service);
  }

  removeItem(service: serviceInterface) {
    // const confirmationDialog = this.dialog.open(ConfirmationDialogComponent, {
    //   data: { message: `Are you sure you want to remove "${service.name}"?` },
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
