import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import { Patient} from 'src/app/models/patient.model';
import {DataService} from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {map, startWith, tap} from 'rxjs/operators';
import {Centre} from 'src/app/models/centre.model';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {medicalSchemesList} from 'src/app/mocks/medicalSchemesList';
import {Provinces} from 'src/app/mocks/cities';


@Component({
  selector: 'app-register-new-patient',
  templateUrl: './register-new-patient.component.html',
  styleUrls: ['./register-new-patient.component.scss']
})
export class RegisterNewPatientComponent implements OnInit {
  firstname;
  isLoading = false;
  public IVSTabIndex = 0;
  registered = false;
  userExists = false;
  provincePicked = true;
  idNumber!: number;
  allergies;
  allergiesDescription;
  myControl = new FormControl();
  schemesControl = new FormControl();
  provincesControl = new FormControl();
  options: Centre[];
  schemes: string[] = medicalSchemesList;
  provinces: string[] = Provinces;
  filteredOptions: Observable<Centre[]>;
  filteredSchemesOptions: Observable<any[]>;
  filteredProvinceOptions: Observable<any>;
  locationID;
  scheme: string;
  province: string;
  isIDValid = false;
  siteName: string;
  foundPatient: object;
  identificationPlaceholder: string;
  displayIdInputField = false;
  DOB: any;

  constructor(public data: DataService, private _snackBar: MatSnackBar, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.loadCentres();
    this.loadSchemes();
    this.loadProvinces();
    this.siteName = this.cookieService.get('vaccination-centre-name');
  }

  // tslint:disable-next-line:typedef
  registerPatient(e: NgForm) {
    this.checkValidation;

    if (e.valid === true) {
      this.isLoading = true;
      // tslint:disable-next-line:max-line-length
      this.idNumber = e.value.idNumber;
      this.data.registerPatient(e.value.idNumber, e.value.firstName, e.value.lastName, e.value.position, e.value.employer, e.value.mobileNumber, e.value.emailAddress, this.scheme, this.locationID, this.province, e.value.dob)
        .pipe(tap((res) => {
          this.router.navigateByUrl(`/otp-authentication/${this.idNumber}`);
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

  // tslint:disable-next-line:typedef
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


  checkIdentificationType(e: string){
    console.log(e)
    if (e === 'SAid'){
      this.identificationPlaceholder = 'ID Number';
      this.displayIdInputField = true;
    }
    else{
      this.displayIdInputField = true;
      this.identificationPlaceholder = 'Passport Number';   
     }
  }


  // tslint:disable-next-line:typedef
  checkIfIDExists(e: string) {
    if (e.length === 13) {
      this.isIDValid = true;
    } else {
      this.isIDValid = false;
    }
    if (e.length < 13) {
      return;
    }
    this.data.searchByID(e)
      .subscribe(patient => {
        // console.log(patient);
        if (patient.length > 0) {
          // alert('user already registered');
          this.foundPatient = patient[0];
          this.registered = true;
        } else {
          this.registered = false;
          this.getDOB(e)
        }
      }, err => {
        this.registered = false;
      });

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
            return this._filter(value);
          })
        );
      });
  }

  private _filter(value: string): Centre[] {
    const filterValue = value.toLowerCase();
    // console.log(typeof(filterValue));

    return this.options.filter(option => {
      if (option.name.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          // this.data.selectedLocation = null;
        } else {
          this.locationID = option.name;
          console.log(this.locationID)
        }

        // console.log(this.data.selectedLocation);
      }

      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }


  // Schemes Filters

  loadSchemes = () => {
    this.filteredSchemesOptions = this.schemesControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log(value);
        return this._filterSchemes(value);
      })
    );
  };

  private _filterSchemes(value: string): any[] {
    const filterValue = value.toLowerCase();
    // return this.schemes.filter(option => option.toLowerCase().includes(filterValue));
    return this.schemes.filter(option => {
      if (option.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          // this.data.selectedLocation = null;
        } else {
          this.scheme = option;
        }

        // console.log(this.data.selectedLocation);
      }

      return option.toLowerCase().indexOf(filterValue) === 0;
    });
  }


// Provinces
  loadProvinces = () => {
    this.filteredProvinceOptions = this.provincesControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        console.log(value);
        return this._filterProvinces(value);
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
          // this.data.selectedLocation = null;
        } else {
          this.province = option;
          this.provincePicked = false;
        }

        // console.log(this.data.selectedLocation);
      }

      return option.toLowerCase().indexOf(filterValue) === 0;
    });
  }


  getDOB(idNumber){

    // get first 6 digits as a valid date
    let tempDate = new Date(idNumber.substring(0, 2), idNumber.substring(2, 4), idNumber.substring(4, 6));
    let id_date = tempDate.getDate();
    let id_month = tempDate.getMonth();
    let id_year = tempDate.getFullYear();
    // let fullDate = id_date + "-" + id_month + 1 + "-" + id_year;
    let fullDate =  `${id_year}-${id_month}-${id_date}`;
    // get the gender
    let genderCode = idNumber.substring(6, 10);
    let gender = parseInt(genderCode) < 5000 ? "Female" : "Male";
    this.DOB = new FormControl('2020-09-28');
    // this.DOB = fullDate;
    console.log(fullDate)
    // get country ID for citzenship
    let citzenship = parseInt(idNumber.substring(10, 11)) == 0 ? "Yes" : "No";
  }

}
