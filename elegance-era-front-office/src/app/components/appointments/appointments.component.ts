import {
  AsyncPipe,
  CommonModule,
  DatePipe,
  DecimalPipe,
} from '@angular/common';
import { Component, HostListener, OnInit, PipeTransform } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Observable, startWith, map } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import Rellax from 'rellax';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

interface Rdv {
  client: { name: string };
  dateAppointment: Date;
  employe: { name: string };
  service: { name: string; price: number };
  _id: string;
}

interface ShowTable {
  client: string;
  dateAppointment: string;
  employe: string;
  service: string;
  price: number;
  _id: string;
}

@Component({
  standalone: true,
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    NgbHighlight,
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    CommonModule,
  ],
  providers: [DecimalPipe, DatePipe],
})
export class AppointmentsComponent implements OnInit {
  rdvList!: Rdv[];
  showTable: ShowTable[] = [];
  isLoading: boolean = true;
  filter = new FormControl('', { nonNullable: true });
  constructor(
    private datePipe: DatePipe,
    private readonly httpService: HttpService
  ) {
    this.httpService
      .getUsersRdv(localStorage.getItem('id') as string)
      .subscribe({
        next: (rdv: any) => {
          this.rdvList = rdv;
          this.rdvList.forEach((rdv) => {
            let temp: ShowTable = {
              _id: rdv._id as string,
              client: rdv.client.name as string,
              dateAppointment: this.datePipe.transform(
                rdv.dateAppointment,
                'MMM d, y, h:mm:ss a'
              ) as string,
              employe: rdv.employe.name as string,
              service: rdv.service.name as string,
              price: rdv.service.price,
            };
            this.showTable.push(temp);
          });
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > 500) {
      element.classList.remove('navbar-transparent');
    } else {
      element.classList.add('navbar-transparent');
    }
  }

  // ngOnDestroy(): void {
  //   var navbar = document.getElementsByTagName('nav')[0];
  //   navbar.classList.remove('navbar-transparent');
  //   var body = document.getElementsByTagName('body')[0];
  //   body.classList.remove('index-page');
  // }

  ngOnInit(): void {
    var rellaxHeader = new Rellax('.rellax-header');

    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('index-page');
  }
}
