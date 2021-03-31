import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-member-profile-edit',
  templateUrl: './member-profile-edit.component.html',
  styleUrls: ['./member-profile-edit.component.scss']
})


export class MemberProfileEditComponent implements OnInit {
  idNumber:string;
  member: Patient;
  employer: string;
  schemeName: string;
  memberNumber: string;
  position: string;
  allergies: boolean;
  city: string;
  firstName: string;
  lastName: string; 
  mobileNumber: string;

  constructor(private activatedRoute: ActivatedRoute,
              private data: DataService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idNumber = paramMap.get('idNumber');
      this.data.searchByID(this.idNumber).subscribe(
        member => {
          if (member) {
            this.member = member[0];
            this.employer = this.member.employer;
            this.schemeName = this.member.schemeName;
            this.position = this.member.position;
            this.memberNumber = this.member.memberNumber;
            this.allergies = this.member.allergies;
            this.city = this.member.city;
            this.firstName = this.member.firstName;
            this.lastName = this.member.lastName; 
            this.mobileNumber = this.member.mobileNumber;
        
          }
          
      })
    });
  }

  update(){
    this.data.updatePatient(
      this.idNumber,
      this.position,
      this.employer,
      this.schemeName,
      this.memberNumber,
      this.firstName,
      this.lastName,
      this.mobileNumber,
      this.city
    ).subscribe(res => {
      console.log(res);
    })
     console.log(this.employer) 
  }
  

}
