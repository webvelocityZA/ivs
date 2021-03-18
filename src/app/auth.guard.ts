import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedState:boolean;
  constructor(public data: DataService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.data.isLoggedIn());
      this.data.isLoggedIn().subscribe(res => {
        console.log(res);
        if(res === true) {
          this.loggedState = true;
        } else {
          this.loggedState = false;
          this.router.navigateByUrl('landing');
        }

      }, err => {
        this.loggedState = false;
        console.log(err);
      })
      return this.loggedState
  }

}
