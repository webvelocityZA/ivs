import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from 'src/app/models/patient.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-self-register',
  templateUrl: './self-register.component.html',
  styleUrls: ['./self-register.component.scss']
})
export class SelfRegisterComponent implements OnInit {

  public IVSTabIndex = 0;
  registered:boolean = false;
  userExists:boolean = false;
  idNumber!:number;
  allergies;
  allergiesDescription;

  constructor(public data: DataService) { }

  ngOnInit(): void {
  }

  registerPatient(e:NgForm) {
    if(e.valid === true) {
      this.navToTab();
      console.log(e.value);
    } else if(e.valid === false) {
      alert('Errors on form');
    } else {
      alert('Something wrong');
    }
    console.log(e);

  }

  checkIfIDExists(e:any) {
    console.log(this.data.searchByID(e));
    console.log(e);

    if(this.data.searchByID(e) !== undefined) {
      // this.data.currentPatient = this.data.searchByID(e);
      console.log(this.data.currentPatient);
      this.userExists = true;
      this.idNumber = e;
      console.log(typeof(e));
    } else {
      this.userExists = false;
    }
  }

  navToTab() {
    const tabCount = 4;
    this.IVSTabIndex = (this.IVSTabIndex + 1) % tabCount;
  }

  doesPatientHaveAllergies(e:any) {
    console.log(e);
  }

}
