import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  NgForm
} from '@angular/forms';
import {
  Patient
} from 'src/app/models/patient.model';
import {
  DataService
} from 'src/app/services/data.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Router
} from '@angular/router';
import {
  map,
  startWith,
  tap
} from 'rxjs/operators';
import {
  Centre
} from 'src/app/models/centre.model';
import {
  Observable
} from 'rxjs';
import {
  CookieService
} from 'ngx-cookie-service';
import {
  medicalSchemesList
} from 'src/app/mocks/medicalSchemesList';
import { Provinces } from 'src/app/mocks/cities';


@Component({
  selector: 'app-register-new-patient',
  templateUrl: './register-new-patient.component.html',
  styleUrls: ['./register-new-patient.component.scss']
})
export class RegisterNewPatientComponent implements OnInit {
  firstname;
  isLoading = false;
  public IVSTabIndex = 0;
  registered: boolean = false;
  userExists: boolean = false;
  idNumber!: number;
  allergies;
  allergiesDescription;
  myControl = new FormControl();
  schemesControl = new FormControl();
  provincesControl = new FormControl();
  options: Centre[];
  schemes: string[] = medicalSchemesList;
  provinces: string[] = Provinces;
  filteredOptions: Observable < Centre[] > ;
  filteredSchemesOptions: Observable <any[]> ;
  filteredProvinceOptions: Observable<any>;
  locationID;
  scheme: string;
  province: string;
  isIDValid = false;
  siteName: string;

  constructor(public data: DataService, private _snackBar: MatSnackBar, private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.loadCentres();
    this.loadSchemes();
    this.loadProvinces();
    this.siteName = this.cookieService.get('vaccination-centre-name');
  }

  registerPatient(e: NgForm) {
    if (e.valid === true) {
      this.isLoading = true;
      this.data.registerPatient(e.value.idNumber, e.value.firstName, e.value.lastName, e.value.position, e.value.employer, e.value.mobileNumber, e.value.emailAddress, this.scheme, this.locationID, this.province, e.value.dob)
        .pipe(tap((res) => {
          this.router.navigateByUrl('/thank-you');
          // console.log(res);
        }))
        .subscribe(res => {
          this.isLoading = false;
        }, err => {
          console.log(err);
          this.isLoading = false;
          this.openSnackBar('Registration Failed', 'Close');
        });
    } else if (e.valid === false) {
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    // console.log(e);

  }

  checkValidation(e: NgForm) {
    // console.log(e);
    if (e.valid === true) {
      this.navToTab();
    } else if (e.valid === false) {
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    // console.log(e);
  }

  checkIfIDExists(e: string) {
    if (e.length === 13) {
      this.isIDValid = true;
    } else {
      this.isIDValid = false;
    }
    if (e.length < 13) {
      return
    }
    this.data.searchByID(e)
      .subscribe(patient => {
        // console.log(patient);
        if (patient.length > 0) {
          // alert('user already registered');
          this.registered = true;
        } else {
          this.registered = false;
        }
      }, err => {
        this.registered = false;
      })

  }

  navToTab() {
    const tabCount = 4;
    this.IVSTabIndex = (this.IVSTabIndex + 1) % tabCount;
  }

  doesPatientHaveAllergies(e: any) {
    console.log(e);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


  loadCentres() {
    this.data.getAllCentres()
      .subscribe(centres => {
        // console.log(centres);
        this.options = centres;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            console.log(value);
            return this._filter(value)
          })
        );
      })
  }

  private _filter(value: string): Centre[] {
    const filterValue = value.toLowerCase();
    // console.log(typeof(filterValue));

    return this.options.filter(option => {
      if (option.name.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          //this.data.selectedLocation = null;
        } else {
          this.locationID = option.name;
        }

        // console.log(this.data.selectedLocation);
      };
      return option.name.toLowerCase().indexOf(filterValue) === 0
    });
  }






  //Schemes Filters

  loadSchemes() {
    this.filteredSchemesOptions = this.schemesControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log(value);
        return this._filterSchemes(value)
      })
    );
  }

  private _filterSchemes(value: string): any[] {
    const filterValue = value.toLowerCase();
    // return this.schemes.filter(option => option.toLowerCase().includes(filterValue));
    return this.schemes.filter(option => {
      if (option.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          //this.data.selectedLocation = null;
        } else {
          this.scheme = option;
        }

        // console.log(this.data.selectedLocation);
      };
      return option.toLowerCase().indexOf(filterValue) === 0
    });
  }




//Provinces
  loadProvinces() {
    this.filteredProvinceOptions = this.provincesControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log(value);
        return this._filterProvinces(value)
      })
    );
  }

  private _filterProvinces(value: string): any[] {
    const filterValue = value.toLowerCase();
    // return this.schemes.filter(option => option.toLowerCase().includes(filterValue));
    return this.provinces.filter(option => {
      if (option.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          //this.data.selectedLocation = null;
        } else {
          this.province = option;
        }

        // console.log(this.data.selectedLocation);
      };
      return option.toLowerCase().indexOf(filterValue) === 0
    });
  }



}
