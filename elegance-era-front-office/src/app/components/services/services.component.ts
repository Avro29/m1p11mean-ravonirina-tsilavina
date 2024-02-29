import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, HostListener, OnInit, PipeTransform } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import Rellax from 'rellax';
import { Observable, map, startWith } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../services/http.service';

interface Services {
  commission: number;
  duration: number;
  name: string;
  price: number;
  _id: string;
}

@Component({
  standalone: true,
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  imports: [
    DecimalPipe,
    AsyncPipe,
    ReactiveFormsModule,
    NgbHighlight,
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    CommonModule,
  ],
  providers: [DecimalPipe],
})
export class ServicesComponent implements OnInit {
  servicesList!: Services[];
  isLoading: boolean = true;
  filter = new FormControl('', { nonNullable: true });
  constructor(pipe: DecimalPipe, private readonly httpService: HttpService) {
    this.httpService.getAllServices().subscribe({
      next: (services: any) => {
        this.servicesList = services;
        this.isLoading = false;
        console.log(this.servicesList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  add(idService: string) {
    let appointment: Object = {
      employe: '65e0c40f831e19fb6c17ac6c',
      service: idService,
      offer: null,
      dateAppointment: new Date(),
    };
    this.httpService.addAppointment(appointment).subscribe({
      next: () => {
        console.log('ok');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // searchService(text: string, pipe: PipeTransform): Services[] {
  //   let returnValue: Services[] = [];
  //   this.servicesList.subscribe((value) => {
  //     returnValue = value;
  //     return value.filter((service) => {
  //       const term = text.toLowerCase();
  //       return (
  //         service.name.toLowerCase().includes(term) ||
  //         pipe.transform(service.price).includes(term) ||
  //         pipe.transform(service.commission).includes(term) ||
  //         pipe.transform(service.duration).includes(term)
  //       );
  //     });
  //   });
  //   return returnValue;
  // }

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
