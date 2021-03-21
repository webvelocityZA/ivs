import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Centre } from 'src/app/models/centre.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  myControl = new FormControl();
  options: Centre[];
  filteredOptions: Observable<Centre[]>;
  

  constructor(private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadCentres();
    
  }

  private _filter(value: string): Centre[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  login(e:any) : void {
    localStorage.setItem('token', 'JWT');
    this.data.isLoginSubject.next(true);
    this.router.navigateByUrl('dashboard');
  }

  loadCentres() {
    this.data.getAllCentres()
    .subscribe(centres => {
      console.log(centres);
      this.options = centres;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }

}
