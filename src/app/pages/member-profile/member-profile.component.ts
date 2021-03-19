import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Patient, VaccinationInfo} from '../../models/patient.model';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  patientData: Patient;
  patientVaccinationInfo: VaccinationInfo;
  patient: any = [];
  isLoading = false;
  public IVSTabIndex = 0;
  registered = false;
  userExists = false;
  idNumber!: number;
  allergies;
  allergiesDescription;
  patientID: number;
  memberId: number;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private data: DataService, private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const query = paramMap.get('query');
      // console.log(query);
      if (query !== null) {

        this.data.searchByID(query).subscribe(
          res => {
            const data = res;
            if (data) {
              this.patientData = data[0];
              this.memberId = data[0].idNumber;



              /* Fetch Patient Vacccination History */
              const patientID = data[0].id;
              this.getVaccinationInfo(patientID);


              /* Patient Allergies */
              if (this.patientData.allergies) {
                this.allergies = 'yes';
                this.allergiesDescription = this.patientData.chronicMedication;
              } else {
                this.allergies = 'no';
              }
            }

          }, err => {
            // console.log(err);
          }
        );
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  checkValidation(e: NgForm) {
    // console.log(e);
    if (e.valid === true) {
      this.navToTab();
    } else if (e.valid === false) {
      //this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    // console.log(e);
  }

  checkIfIDExists(e: any) {
    // console.log(this.data.searchByID(e));
    // console.log(e);

    // if(this.data.searchByID(e) !== undefined) {
    //   //this.data.currentPatient = this.data.searchByID(e);
    //   console.log(this.data.currentPatient);
    //   this.userExists = true;
    //   this.idNumber = e;
    //   console.log(typeof(e));
    // } else {
    //   this.userExists = false;
    // }
  }

  navToTab() {
    const tabCount = 4;
    this.IVSTabIndex = (this.IVSTabIndex + 1) % tabCount;
  }

  doesPatientHaveAllergies(e: any) {
    // console.log(e);
  }

  updatePatient(e: NgForm) {
    // console.log(e);
    if (e.valid === true) {
      this.isLoading = true;
      this.data.updatePatient(e.value.idNumber, e.value.firstName, e.value.lastName, e.value.position, e.value.employer, e.value.mobileNumber, e.value.emailAddress, e.value.schemeName)
        .pipe(tap(() => {
          this.router.navigateByUrl('/thank-you');
        }))
        .subscribe(res => {
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
          this.openSnackBar('Update Failed', 'Close');
        });
    } else if (e.valid === false) {
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    // console.log(e);

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


  getVaccinationInfo = patientID => {
    this.data.getVaccinationInfo(patientID).subscribe(res => {
      this.patientVaccinationInfo = res;
    });
  }


}
