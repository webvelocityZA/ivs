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

  howManyTimesUserHasBeenDosed:number;


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
              // console.log(this.patientData);
              this.memberId = data[0].idNumber;
              this.getHowManyTimes(this.memberId);
              console.log(this.patientData)


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
  }

  navToTab() {
    const tabCount = 4;
    this.IVSTabIndex = (this.IVSTabIndex + 1) % tabCount;
  }

  doesPatientHaveAllergies(e: any) {
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
      console.log(res);
    });
  }



  getHowManyTimes = (idNumber) =>{
    // console.log(this.idNumber)
    this.data.getHowManyTimes(idNumber).subscribe (numberOfVaccinations => {
       this.howManyTimesUserHasBeenDosed = numberOfVaccinations.howMany;
       console.log(this.howManyTimesUserHasBeenDosed)
    })
  }



}
