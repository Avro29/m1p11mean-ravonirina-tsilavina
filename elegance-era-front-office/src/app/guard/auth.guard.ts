import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private httpService: HttpService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.length != 0 && this.httpService.isLogedIn) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
