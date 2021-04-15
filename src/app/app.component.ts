import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: Observable<boolean>;
  title: any;

  constructor(private data: DataService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.data.isLoggedIn();
    console.log(this.isLoggedIn);
  }

  logout(): void {
    this.cookieService.delete('vaccination-centre-name');
    this.cookieService.delete('vaccination-centre-id');
    localStorage.removeItem('userObj');
    this.data.isLoginSubject.next(false);
    this.router.navigateByUrl('landing');
  }
}


