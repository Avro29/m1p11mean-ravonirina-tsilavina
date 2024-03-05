import {
  AsyncPipe,
  CommonModule,
  DecimalPipe,
  JsonPipe,
} from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbAlertModule,
  NgbDateStruct,
  NgbDatepickerModule,
  NgbHighlight,
  NgbModal,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import Rellax from 'rellax';
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
    AsyncPipe,
    ReactiveFormsModule,
    NgbHighlight,
    NavbarComponent,
    FooterComponent,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    NgbTimepickerModule,
  ],
  providers: [DecimalPipe],
})
export class ServicesComponent implements OnInit {
  servicesList: Services[] = [];
  isLoading: boolean = true;
  dateSelected: boolean = false;
  dateSet: boolean = false;
  closeResult!: string;
  idService!: string;
  nameService!: string;
  model!: NgbDateStruct;
  time = { hour: 0o0, minute: 0o0 };
  filter = new FormControl('', { nonNullable: true });
  dateAppointment!: Date;

  constructor(
    private readonly httpService: HttpService,
    private modalService: NgbModal
  ) {
    this.httpService.getAllServices().subscribe({
      next: (services: any) => {
        this.servicesList = services;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  add() {
    let appointment: Object = {
      employe: '65e0c40f831e19fb6c17ac6c',
      service: this.idService,
      offer: null,
      dateAppointment: this.dateAppointment,
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

  open(content: any, idService: string, nameService: string) {
    this.idService = idService;
    this.nameService = nameService;
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selectDate(): void {
    this.dateSelected = true;
  }

  searchEmpDispo(): void {
    this.dateAppointment = new Date(
      this.model.year,
      this.model.month,
      this.model.day,
      this.time.hour,
      this.time.minute
    );
    this.dateSet = true;
    this.httpService
      .getEmpDispo(this.dateAppointment, this.idService)
      .subscribe({
        next: (emp) => {
          console.log(emp);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
