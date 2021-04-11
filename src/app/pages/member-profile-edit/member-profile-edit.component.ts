import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { medicalSchemesList } from 'src/app/mocks/medicalSchemesList';
import { Patient } from 'src/app/models/patient.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-member-profile-edit',
  templateUrl: './member-profile-edit.component.html',
  styleUrls: ['./member-profile-edit.component.scss']
})


export class MemberProfileEditComponent implements OnInit {
  userRowId:number;
  idNumber:string;
  member: Patient;
  employer: string;
  schemeName: string;
  memberNumber: string;
  position: string;
  province: string;
  allergies: boolean;
  city: string;
  firstName: string;
  lastName: string; 
  mobileNumber: string;
  emailAddress: string;
  dateOfBirth: string;

  constructor(private activatedRoute: ActivatedRoute,
              private data: DataService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idNumber = paramMap.get('idNumber');
      this.data.searchByID(this.idNumber).subscribe(
        member => {
          if (member) {
            this.member = member[0];
            this.userRowId = this.member.id;
            this.employer = this.member.employer;
            this.schemeName = this.member.schemeName;
            this.position = this.member.position;
            this.memberNumber = this.member.memberNumber;
            this.allergies = this.member.allergies;
            this.city = this.member.city;
            this.province = this.member.province;
            this.firstName = this.member.firstName;
            this.lastName = this.member.lastName; 
            this.mobileNumber = this.member.mobileNumber;
            this.emailAddress = this.member.emailAddress;
            this.dateOfBirth = this.member.dateOfBirth;
          }
          
      })
    });
  }

  update(){
    this.data.updatePatient(
      this.userRowId,
      this.idNumber,
      this.position,
      this.employer,
      this.schemeName,
      this.memberNumber,
      this.firstName,
      this.lastName,
      this.mobileNumber,
      this.city,
      this.province,
      this.dateOfBirth,
      this.emailAddress
    ).subscribe(res => {
      console.log(res);
    })
     console.log(this.employer) 
  }
  

}
