import {DataService} from './../../services/data.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {delay, map, startWith, tap} from 'rxjs/operators';
import {Centre} from 'src/app/models/centre.model';
import {CookieService} from 'ngx-cookie-service';
import {Vaccine} from 'src/app/models/vaccination.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  hide = true;
  myControl = new FormControl();
  options: Centre[];
  filteredOptions: Observable<Centre[]>;
  selectedlocation: Centre;
  selectVaccine: Vaccine;
  missingLocation = false;
  isLoading: boolean = false;
  isFormValid:boolean = false;


  constructor(private data: DataService, private router: Router, private _snackBar: MatSnackBar, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.data.disallowAccessToLoggedOutPages();
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

        console.log(option);
        this.cookieService.set('vaccination-centre-name', option.name, 20000);
        this.cookieService.set('vaccination-centre-id', option.id.toString());
      }
      ;
      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  login(e: NgForm): void {
    console.log(e);
    if(e.invalid) {
        return
    };
    this.isLoading = true;
    this.data.login(e.value.userName, e.value.password)
    .pipe(
      // For testing loading indicator
      // delay(5000),
      tap((res) => {
        console.log(res);
      this.data.encryptData(res);
      // localStorage.setItem('userObj', JSON.stringify(res));
      this.isLoading = false;
      this.data.isLoginSubject.next(true);
      this.router.navigateByUrl('dashboard');
     }))
    .subscribe(res=>{
      console.log(res);

    },
    error =>{
      this.isLoading = false;
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
