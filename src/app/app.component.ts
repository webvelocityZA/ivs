import {Component} from '@angular/core';
import {Router} from '@angular/router';
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

  constructor(private data: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.data.isLoggedIn();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.data.isLoginSubject.next(false);
    this.router.navigateByUrl('landing');
  }
}


