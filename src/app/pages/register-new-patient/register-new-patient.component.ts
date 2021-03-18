import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { DataService } from 'src/app/services/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-register-new-patient',
  templateUrl: './register-new-patient.component.html',
  styleUrls: ['./register-new-patient.component.scss']
})
export class RegisterNewPatientComponent implements OnInit {
  firstname;
  isLoading = false;
  public IVSTabIndex = 0;
  registered:boolean = false;
  userExists:boolean = false;
  idNumber!:number;
  allergies;
  allergiesDescription;

  constructor(public data: DataService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  registerPatient(e:NgForm) {
    if(e.valid === true) {
      this.isLoading = true;
      this.data.registerPatient(e.value.idNumber, e.value.firstName, e.value.lastName, e.value.position, e.value.employer, e.value.mobileNumber, e.value.emailAddress, e.value.schemeName)
      .pipe(tap((res) => {
        this.router.navigateByUrl('/thank-you');
        console.log(res);
      }))
      .subscribe(res => {
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
        this.openSnackBar('Registration Failed', 'Close');
      });
    } else if(e.valid === false) {
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    console.log(e);

  }

  checkValidation(e:NgForm) {
    console.log(e);
    if(e.valid === true) {
      this.navToTab();
    } else if(e.valid === false) {
      this.openSnackBar('Please fill all required fields', 'Close');
    } else {
      alert('Something wrong');
    }
    console.log(e);
  }

  checkIfIDExists(e:any) {
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

  doesPatientHaveAllergies(e:any) {
    console.log(e);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
