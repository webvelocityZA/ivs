import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import {Patient} from 'src/app/models/patient.model';
import {DataService} from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Vaccine} from 'src/app/models/vaccination.model';


@Component({
  selector: 'app-inoculate',
  templateUrl: './inoculate.component.html',
  styleUrls: ['./inoculate.component.scss']
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
  options: Vaccine[];
  selectVaccine: Vaccine;
  myControl = new FormControl();

  constructor(private activatedRoute: ActivatedRoute, public data: DataService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userID = params.userID;
      this.memberId = params.memberId;
      this.vaccinationSiteId = 1;
      this.vaccinatorid = 1;
      this.doseNumber = 1;
    });
  }


  private _filter(value: string): Vaccine[] {
    console.log(  this.data.selectVaccine)
    const filterValue = value.toLowerCase();
    // console.log(typeof(filterValue));
    return this.options.filter(option => {
      if (option.name.toLowerCase().indexOf(filterValue) === 0) {
        // console.log(option);
        if (filterValue === '') {
          this.data.selectVaccine = null;
        } else {
          this.data.selectVaccine = option;
        }

      }
      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }


  inoculatePatient = (e: NgForm) => {
    if (e.valid === true) {
      this.isLoading = true;


      const payload = {
        id: 1,
        memberId: this.memberId,
        vaccinationSiteId: e.value.vaccinationSiteId,
        vaccinatorid: e.value.vaccinatorid,
        feedBack: e.value.feedBack,
        repeatInoculatedOn: e.value.repeatInoculatedOn,
        inoculatedOn: e.value.inoculatedOn,
        dosageReceived: e.value.dosageReceived,
        doseNumber: e.value.doseNumber,
        vaccinatedDate: e.value.vaccinatedDate
      };

      this.data.postVaccinationInfo(payload)
        .pipe(tap((res) => {
          this.router.navigateByUrl('/thank-you-inoculate');
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

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  };

}
