import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'ivs-navbar',
  templateUrl: './ivs-navbar.component.html',
  styleUrls: ['./ivs-navbar.component.scss']
})
export class IvsNavbarComponent implements OnInit {
  isLoggedIn : Observable<boolean>;

  constructor(private data:DataService, private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.data.isLoggedIn();
  }

  logout() : void {
    localStorage.removeItem('token');
    this.data.isLoginSubject.next(false);
    this.router.navigateByUrl('landing');
  }

}
