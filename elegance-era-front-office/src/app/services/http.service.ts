import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  backendUrl: string =
    'https://m1p11mean-ravonirina-tsilavina-api.up.railway.app';
  isLogedIn: boolean = false;

  //users
  urlSignUp: string = '/users/signup';
  urlSignIn: string = '/users/login';
  urlEmpRegister: string = '/users/empRegister';
  urlGetMe: string = '/users/me';
  urlGetAllUsers: string = '/users/all';
  urlGetAllEmp: string = '/users/allEmploye';
  urlGetAllClient: string = '/users/allClient';
  urlGetEmpDispo: string = '/users/:dateRendezVous/:idServicenaidOffre';
  urlGetUserById: string = '/users/:id';

  //worktime
  urlAddWorktime: string = '/worktimes/addWorktime';
  urlGetAllWorktime: string = '/worktimes/all';
  urlGetWorktimeEmp: string = '/worktimes/:idEmp';

  //services
  urlAddService: string = '/services/addService';
  urlGetAllService: string = '/services/allService';
  urlSearchService: string = '/services/search?name=';
  urlGetServiceById: string = '/services/:idService';

  //offer
  urlAddOffer: string = '/offers/addOffer';
  urlDisableOffer: string = '/offers/disable/:idOffre';
  urlGetAllOffers: string = '/offers/all';
  urlGetOfferById: string = '/offers/offer/:idOffre';

  //payment
  urlAddPayement: string = '/payments/addPayment';
  urlGetAllPayment: string = '/payments/all';
  urlGetPayment: string = '/payments/appointment/:idRendezVous';

  //expenses
  urlAddExpenses: string = '/expenses/addExpenses';
  urlGetExpenses: string = '/expenses/all';

  //appointments
  urlAddAppointment: string = '/appointments/addAppointment';
  urlGetAllAppointments: string = '/appointments/all';
  urlServicePrefered: string = '/appointments/servicePrefered';
  urlEmpPrefered: string = '/appointments/employePrefered';
  urlRdvFini: string = '/appointments/rendezVousFini';
  urlCommission: string = '/appointments/commission';
  urlTask: string = '/appointments/task';
  urlMontantRdv: string = '/appointments/montant/:idAppoint';
  urlRdvParClient: string = '/appointments/client/';
  urlRdvParEmp: string = '/appointments/employe/:idEmp';

  //finish appointments
  urlAddFinish: string = '/finishappointments/addFinishAppointment';
  urlGetAllFinish: string = '/finishappointments/all';
  urlGetFinishById: string = '/finishappointments/appointment/:idAppointment';

  constructor(
    public readonly router: Router,
    private readonly http: HttpClient
  ) {}

  checkIsLogedIn(): Observable<boolean> {
    return of(localStorage.getItem('token') !== null);
  }

  login(userData: Object): Observable<any> {
    return this.http.post(this.backendUrl + this.urlSignIn, userData);
  }

  logout(): Observable<null> {
    return of(null);
  }

  getAllServices(): Observable<any> {
    return this.http.get(this.backendUrl + this.urlGetAllService, {
      headers: new HttpHeaders().set(
        'auth-token',
        localStorage.getItem('token') as string
      ),
    });
  }

  getUsersRdv(idClient: string): Observable<any> {
    return this.http.get(this.backendUrl + this.urlRdvParClient + idClient, {
      headers: new HttpHeaders().set(
        'auth-token',
        localStorage.getItem('token') as string
      ),
    });
  }

  addAppointment(appointmentData: Object): Observable<any> {
    return this.http.post(
      this.backendUrl + this.urlAddAppointment,
      appointmentData,
      {
        headers: new HttpHeaders().set(
          'auth-token',
          localStorage.getItem('token') as string
        ),
      }
    );
  }

  signup(userData: Object): Observable<any> {
    return this.http.post(this.backendUrl + this.urlSignUp, userData);
  }
}
