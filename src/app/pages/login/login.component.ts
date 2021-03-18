import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  login(e:any) : void {
    localStorage.setItem('token', 'JWT');
    this.data.isLoginSubject.next(true);
    this.router.navigateByUrl('dashboard');
  }

}
