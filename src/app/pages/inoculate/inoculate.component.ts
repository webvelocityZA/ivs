import {
  Component,
  OnInit,
  ViewEncapsulation
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
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  map,
  startWith,
  tap
} from 'rxjs/operators';
import {
  Vaccination,
  Vaccine,
  VaccineCentre
} from 'src/app/models/vaccination.model';
import {
  Observable
} from 'rxjs';
import {
  CookieService
} from 'ngx-cookie-service';
import {ConsoleLogger} from 'node_modules_old/@angular/compiler-cli/ngcc';


@Component({
  selector: 'app-inoculate',
  templateUrl: './inoculate.component.html',
  styleUrls: ['./inoculate.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class InoculateComponent implements OnInit {
  firstname;
  isLoading = false;
  // public IVSTabIndex = 0;
  idNumber!: number;
  memberId: number;
  userID: number;
  vaccinationSiteId: number;
  vaccinatorid: number;
  vaccineId: number;
  doseNumber: number;
  options: any[];
  filteredOptions: Observable<any[]>;
  selectVaccine: any;
  myControl = new FormControl();
  vaccinationSiteNameCookie: string;
  vaccinationSiteIDCookie: string;
  dosageReceived: string;
  dosageRequired: number;
  filter;
  selectedProgramme;
  adminUser: string;
  howManyTimesUserHasBeenDosed: number;
  programmes;
  programmeID: number;
  vaccinationSiteIDNew: any;
  sideId: number;
  vaccinationSiteRowID: number;

  constructor(private activatedRoute: ActivatedRoute,
              public data: DataService,
              private snackBar: MatSnackBar,
              private router: Router,
              private cookieService: CookieService) {
    this.vaccinationSiteNameCookie = this.cookieService.get('vaccination-centre-name');
    this.vaccinationSiteIDCookie = this.cookieService.get('vaccination-centre-id');
  }


  ngOnInit(): void {
    this.getProgrammes();
    this.adminUser = this.data.decryptData().username;
    this.sideId = +(this.vaccinationSiteIDCookie);


    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.memberId = +paramMap.get('memberId');
      this.vaccinatorid = 1;
      this.idNumber = +paramMap.get('idNumber');

    });
    this.loadVaccines();
    this.getHowManyTimes();
  }

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

  // getVaccinationSiteID() {

  // }

  onChangeProgramme(e) {
    console.log(e);
    this.selectedProgramme = e;
  }


  inoculatePatient(e: NgForm): void {

    console.log(e);
    // return
    if (e.valid === true) {


      this.isLoading = true;

      // console.log(this.cookieService.get('vaccination-centre-name'));
      // this.cookieService.set('vaccination-centre-id', option.id.toString());
      // console.log(this.memberId);


      // Get Vaccination Site by requested search using /api/VaccinationSite/BySiteAndVaccineId


      // console.log(this.vaccinationSiteRowID);


      const payload: any = {
        id: this.vaccinationSiteRowID,
        memberId: this.memberId,
        vaccinationSiteId: this.sideId,
        vaccinatorid: 1,
        doseNumber: this.howManyTimesUserHasBeenDosed,
        dosageRecieved: this.selectedProgramme,
        vaccinatedDate: e.value.vaccinatedDate,
        programId: e.value.programme.id
      };

      console.log(payload);

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
          this.openSnackBar('Vaccination Error: Next round of inoculation has not elapse yet.You will be allowed to inocculated after 2 days.', 'Close');
        });
    } else if (e.valid === false) {
      console.log(e.valid);
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    console.log(e);
  }


  getHowManyTimes = () => {
    this.data.getHowManyTimes(this.idNumber).subscribe(numberOfVaccinations => {
      this.howManyTimesUserHasBeenDosed = numberOfVaccinations.howMany;
    });
  }


  loadVaccines = () => {
    this.vaccinationSiteIDCookie = this.cookieService.get('vaccination-centre-id');
    this.data.getVaccineCentre(+this.vaccinationSiteIDCookie)
      .subscribe(vaccines => {
        console.log(vaccines);
        this.options = vaccines;


        this.vaccineId = this.options[0].vaccineId;
        // console.log(this.vaccineId);


        /* Fetch SiteID*/
        const requestVaccinationSiteID: any = {
          vaccineId: this.vaccineId,
          sideId: this.sideId
        };
        this.data.getBySiteAndVaccineId(requestVaccinationSiteID)
          .subscribe(res => {
            this.vaccinationSiteRowID = res.id;
            // return this.vaccinationSiteRowID;
            // console.log(this.vaccinationSiteRowID);
          }, err => {
            console.log(err);
          });

        /*end Fetch SiteID */


        this.doseNumber = this.options[0].dosageRequired;

        if (this.options.length > 0) {
          this.dosageRequired = this.options[0].dosageRequired;
        }

        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => {
              // console.log(value);
              return this._filter(value);
            })
            // console.log(this.(filteredOptions));
          );
      });
  };


  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  };

  getProgrammes() {
    this.data.getProgrammes()
      .subscribe(programmes => {
        this.programmes = programmes;
      }, err => {
        this.programmes = null;
      });
  }

}
