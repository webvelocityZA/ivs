import {DataService} from './../../services/data.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {Centre} from 'src/app/models/centre.model';
import {CookieService} from 'ngx-cookie-service';
import {Vaccine} from 'src/app/models/vaccination.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selectedlocation: Centre;
  selectVaccine: Vaccine;
  missingLocation = false;


  constructor(private data: DataService, private router: Router, private _snackBar: MatSnackBar, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.loadCentres();

  }

  private _filter(value: string): Centre[] {
    const filterValue = value.toLowerCase();
    // console.log(typeof(filterValue));


    return this.options.filter(option => {
      if (option.name.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          this.data.selectedLocation = null;
        } else {
          this.data.selectedLocation = option;
        }

        console.log(this.data.selectedLocation);
        this.cookieService.set('vaccination-centre-name', option.name, 20000);
        this.cookieService.set('vaccination-centre-id', option.id.toString());
      }
      ;
      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  login(e: NgForm): void {
    if(e.invalid || this.data.selectedLocation === null) {
        if(this.data.selectedLocation === null) this.missingLocation = true;
        return
    };


    this.data.login(e.value.userName, e.value.password)
    .pipe(tap((res) => {
      localStorage.setItem('userObj', JSON.stringify(res));
      this.data.isLoginSubject.next(true);
      this.router.navigateByUrl('dashboard');
     }))
    .subscribe(res=>{
      console.log(res)
    }, 
    error =>{
      this.openSnackBar(error.error, 'Close');
      console.log(error)
    }
    )

    console.log(e.value);
  }

  loadCentres() {
    this.data.getAllCentres()
      .subscribe(centres => {
        console.log(centres);
        this.options = centres;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            console.log(value);
            return this._filter(value);
          })
        );
      });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
