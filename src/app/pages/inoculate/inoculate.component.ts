import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Patient} from 'src/app/models/patient.model';
import {DataService} from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {map, startWith, tap} from 'rxjs/operators';
import {Vaccination, Vaccine, VaccineCentre} from 'src/app/models/vaccination.model';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-inoculate',
  templateUrl: './inoculate.component.html',
  styleUrls: ['./inoculate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InoculateComponent implements OnInit {

  firstname;
  isLoading = false;
  public IVSTabIndex = 0;
  idNumber!: number;
  memberId: number;
  userID: number;
  vaccinationSiteId: number;
  vaccinatorid: number;
  doseNumber: number;
  options: any[];
  filteredOptions: Observable<any[]>;
  selectVaccine: any;
  myControl = new FormControl();
  vaccinationSiteNameCookie: string;
  vaccinationSiteIDCookie: string;

  constructor(private activatedRoute: ActivatedRoute, public data: DataService, private snackBar: MatSnackBar, private router: Router, private cookieService: CookieService) {
    this.vaccinationSiteNameCookie = this.cookieService.get('vaccination-centre-name');
    this.vaccinationSiteIDCookie = this.cookieService.get('vaccination-centre-id');
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      // this.userID = +paramMap.get('idNumber');
      // this.userID = +paramMap.get('memberId');
      this.memberId = +paramMap.get('memberId');
      this.vaccinatorid = 1;
      this.doseNumber = 1;
      console.log( (this.memberId));
    })
    this.loadVaccines();
  }

filter
  private _filter(value: string): Vaccine[] {
    //  console.log(  this.data.selectVaccine)
    const filterValue = value.toLowerCase();
    // console.log(typeof(filterValue));
    return this.options.filter(option => {
      if (option.vaccineName.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          this.data.selectVaccine = null;
        } else {
          this.data.selectVaccine = option;
        }

      }
      return option.vaccineName.toLowerCase().indexOf(filterValue) === 0;
    });
  }


  inoculatePatient = (e: NgForm) => {
    if (e.valid === true) {
      this.isLoading = true;
     
      console.log( this.cookieService.get('vaccination-centre-name'))
      // this.cookieService.set('vaccination-centre-id', option.id.toString());
      console.log(this.memberId);

      const payload: Vaccination = {
        // id: this.userID,
        memberId: this.memberId,
        vaccinationSiteId: e.value.vaccinationSiteId,
        vaccinatorid: e.value.vaccinatorid,
        feedBack: e.value.feedBack,
        repeatInoculatedOn: e.value.repeatInoculatedOn,
        inoculatedOn: e.value.inoculatedOn,
        dosageRecieved: e.value.dosageReceived,
        doseNumber: e.value.doseNumber,
        vaccinatedDate: e.value.vaccinatedDate
      };

      this.data.postVaccinationInfo(payload)
        .pipe(tap((res) => {
          this.router.navigateByUrl('/thank-you-inoculation');
          console.log(res);
        }))
        .subscribe(res => {
          this.isLoading = false;
        }, err => {
          console.log(err);
          this.isLoading = false;
          this.openSnackBar('Vaccination Request Failed', 'Close');
        });
    } else if (e.valid === false) {
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    console.log(e);

  };

  checkValidation = (e: NgForm) => {
    console.log(e);
    if (e.valid === true) {
      this.navToTab();
    } else if (e.valid === false) {
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    console.log(e);
  };

  navToTab = () => {
    const tabCount = 4;
    this.IVSTabIndex = (this.IVSTabIndex + 1) % tabCount;
  };

  doesPatientHaveAllergies = (e: any) => {
    console.log(e);
  };


  loadVaccines() {
    this.data.getVaccineCentre(1)
    .subscribe(vaccines => {
      // console.log(vaccines);
      console.log(vaccines);
      this.options = vaccines;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => {
           console.log(value)
          return this._filter(value)
        })
        // console.log(this.(filteredOptions));
      );
    })
  }


  





  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  };

}
