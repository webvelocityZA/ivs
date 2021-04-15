import {Registration} from './../../models/patient.model';
import {RegistrationStatus} from '../../enums/enums';
import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
// import {Patient} from 'src/app/models/patient.model';
import {DataService} from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {map, startWith, tap} from 'rxjs/operators';
import {Centre} from 'src/app/models/centre.model';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {medicalSchemesList} from 'src/app/mocks/medicalSchemesList';
import {Provinces} from 'src/app/mocks/cities';

export interface Province {
  name: string;
  shortname: string;
}

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
  myControl = new FormControl();
  schemesControl = new FormControl();
  provincesControl = new FormControl();
  options: Centre[];
  schemes: string[] = medicalSchemesList;
  provinces: any[] = Provinces;
  filteredOptions: Observable<Centre[]>;
  filteredSchemesOptions: Observable<any[]>;
  filteredProvinceOptions: Observable<any>;
  locationID;
  scheme: string;
  province: string;
  selectedProvince: Province;
  isIDValid = false;
  siteName: string;
  foundPatient: object;
  identificationPlaceholder: string;
  displayIdInputField = false;
  DOB: any;
  screenmode = RegistrationStatus.REG_SCREEN;
  chronicMedication = 'Not Applicable';
  currentDate = new Date();
  referenceNumber;


  constructor(public data: DataService, private _snackBar: MatSnackBar, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    // this.loadCentres();
    this.loadSchemes();
    this.loadProvinces();
    this.siteName = this.cookieService.get('vaccination-centre-name');
  }

  // tslint:disable-next-line:typedef
  registerPatient(e: NgForm , ourEvent) {
    // e.preventDefault();
    console.log(e);

    if (e.valid === true) {

      if (e.value.allergiesDescription) {
        this.chronicMedication = e.value.allergiesDescription;
      }

      this.idNumber = e.value.idNumber;
      // console.log(e);
      const registrationPostData: Registration = {
        idNumber: e.value.idNumber,
        firstName: e.value.firstName,
        lastName: e.value.lastName,
        isMember: e.value.gemsmember,
        city: this.locationID,
        province: this.province,
        mobileNumber: e.value.mobileNumber,
        emailAddress: e.value.emailAddress,
        frontLiner: e.value.frontline,
        memberNumber: e.value.memberNumber,
        schemeName: e.value.schemeName,
        employer: e.value.employer,
        position: e.value.position,
        allergies: e.value.allergies,
        chronicMedication: this.chronicMedication,
        dateOfBirth: e.value.dob,
      };
      console.log(registrationPostData);
      // return;
      this.postRegToApi(registrationPostData);


    } else if (e.valid === false) {
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    console.log(e);

  }


  checkIdentificationType(e: string) {
    console.log(e);
    if (e === 'SAid') {
      this.identificationPlaceholder = 'ID Number';
      this.displayIdInputField = true;
    } else {
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
          this.getDOB(e);
        }
      }, err => {
        this.registered = false;
      });

  }


  async postRegToApi(registrationPostData){
    try {
      let result = await this.data.registerPatient(registrationPostData);
      this.screenmode = RegistrationStatus.VERIFICATION
    } catch (err) {
      this.openSnackBar(err.error.message, '');
    }
  }



  doesPatientHaveAllergies(e: any) {
    console.log(e);
    // this.allergies = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }


  loadCentres(centerName: string) {
    this.data.getAllCentres()
      .subscribe(centres => {
        console.log(centerName);
        this.options = centres.filter(val => {
          console.log(this.options);
          return val.name.endsWith(this.selectedProvince.shortname);
        });
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
          console.log(this.locationID);
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
    console.log(this.filteredProvinceOptions)
    this.filteredProvinceOptions = this.provincesControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        // console.log(value);
        return this._filterProvinces(value);
      })
    );
  };

  private _filterProvinces(value: string): any[] {
    const filterValue = value.toLowerCase();
    // return this.schemes.filter(option => option.toLowerCase().includes(filterValue));
    return this.provinces.filter(option => {
      if (option.name.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          // this.data.selectedLocation = null;
        } else {
          this.selectedProvince = option;
          this.loadCentres(this.selectedProvince.shortname);
          // console.log(this.selectedProvince);
          this.province = option.name;
          this.provincePicked = false;
        }

        // console.log(this.data.selectedLocation);
      }

      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }


  getDOB(idNumber) {

    // get first 6 digits as a valid date
    let tempDate = new Date(idNumber.substring(0, 2), idNumber.substring(2, 4), idNumber.substring(4, 6));
    let id_date = tempDate.getDate();
    let id_month = tempDate.getMonth();
    let id_year = tempDate.getFullYear();
    // let fullDate = id_date + "-" + id_month + 1 + "-" + id_year;
    let fullDate = `${id_year}-${id_month}-${id_date}`;
    // get the gender
    let genderCode = idNumber.substring(6, 10);
    let gender = parseInt(genderCode) < 5000 ? 'Female' : 'Male';
    this.DOB = new FormControl('2020-09-28');
    // this.DOB = fullDate;
    console.log(fullDate);
    // get country ID for citzenship
    let citzenship = parseInt(idNumber.substring(10, 11)) == 0 ? 'Yes' : 'No';
  }

  async activateOTP(e: NgForm) {
    if (e.valid === true) {
    } else if (e.valid === false) {
      this.openSnackBar('Please fill in the otp', 'Close');
    } else {
      alert('Something wrong');
    }

    if (e.valid === true) {
      this.isLoading = true;
      console.log(this.idNumber)
      this.data.postOTP(this.idNumber, e.value.otp)
        .pipe(tap((res) => {
          console.log(res);
          this.data.searchByID(this.idNumber).subscribe(ref => {
            this.referenceNumber = ref[0].referenceNumber;
          })
          this.screenmode = RegistrationStatus.THANK_YOU;
        }))
        .subscribe(res => {
          this.isLoading = false;
        }, err => {
          if(err.error) {
            console.log(err);
          console.log(err.error.message);

          this.isLoading = false;
          this.openSnackBar(err.error.message, 'Close');
          }

        });
    } else if (e.valid === false) {
      this.openSnackBar('Please fill in the otp', 'Close');
    } else {
      alert('Something wrong');
    }
    console.log(e);

  }

}
