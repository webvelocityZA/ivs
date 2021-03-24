import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  showDoctorFields:boolean = false;
  feedbackOption;
  isIDValid = false;
  registered:boolean = false;
  lastName;
  firstName;

  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  checkSelectedFeedbackOption(e: any) {
    console.log(e);
    if(e === 'general') {
      this.showDoctorFields = false;
    } else if (e === 'vaccination') {
      this.showDoctorFields = true;
    }
  }

  // @Todo
  checkIfIDExists(e:string) {
    if (e.length === 13) {
      this.isIDValid = true;
    } else {
      this.isIDValid = false;
      this.registered = false;
    }
    if (e.length < 13) { return}
    this.data.searchByID(e)
    .subscribe(patient => {
      console.log(patient);
      if (patient.length > 0) {
        this.lastName = patient[0].lastName;
        this.firstName = patient[0].firstName;
        console.log(this.firstName);
        this.registered = true;
      } else {
        this.registered = false;
      }
    }, err => {
      this.registered = false;
    })

  }

}
