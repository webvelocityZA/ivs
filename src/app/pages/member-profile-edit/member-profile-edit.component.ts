import { Provinces } from './../../mocks/cities';
import {medicalSchemesListv2} from 'src/app/mocks/medicalSchemesList';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {Patient} from 'src/app/models/patient.model';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'app-member-profile-edit',
  templateUrl: './member-profile-edit.component.html',
  styleUrls: ['./member-profile-edit.component.scss']
})


export class MemberProfileEditComponent implements OnInit {
  referenceNumber: string;
  userRowId: number;
  idNumber: string;
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

  myControl = new FormControl();
  options = medicalSchemesListv2;
  filteredOptions: Observable<any[]>;

  optionsProvinces = Provinces;

  constructor(private activatedRoute: ActivatedRoute,
              private data: DataService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idNumber = paramMap.get('idNumber');
      this.data.searchByID(this.idNumber).subscribe(
        member => {
          if (member) {
            this.member = member[0];
            this.userRowId = this.member.id;
            this.referenceNumber = this.member.referenceNumber;
            this.employer = this.member.employer;
            this.schemeName = this.member.schemeName;
            this.position = this.member.position;
            this.memberNumber = this.member.memberNumber;
            this.allergies = this.member.allergies;
            this.city = this.member.city;
            // this.province = this.member.province;
            this.firstName = this.member.firstName;
            this.lastName = this.member.lastName;
            this.mobileNumber = this.member.mobileNumber;
            this.emailAddress = this.member.emailAddress;
            this.dateOfBirth = this.member.dateOfBirth;
          }

          this.myControl.setValue({name: this.province}); // Set province from the DB
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith<string | any>(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filterProvinces(name) : this.optionsProvinces.slice())
            );

          this.myControl.setValue({name: this.schemeName}); // Set scheme name from the DB
          this.filteredOptions = this.myControl.valueChanges
            .pipe(
              startWith<string | any>(''),
              map(value => typeof value === 'string' ? value : value.name),
              map(name => name ? this._filter(name) : this.options.slice())
            );
        });
    });
  }

  update = () => {
    this.data.updatePatient(
      this.userRowId,
      this.referenceNumber,
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
      this.openSnackBar('Member Profile successfully updated', 'Close');
    }, err => {
      console.log(err);
      this.openSnackBar('Update Failed', 'Close');
    });
    console.log(this.employer);
  }


  // Schemes

  displayFn(scheme?: any): string | undefined {
    return scheme ? scheme.name : undefined;
  }

  displayFnProvinces(province?: any): string | undefined {
    return province ? province.name : undefined;
  }


  

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();

    this.schemeName = this.myControl.value.name;
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // Provinces
  private _filterProvinces(name: string): any[] {
    const filterValue = name.toLowerCase();

    this.province = this.myControl.value.name;
    return this.optionsProvinces.filter(item => item.name.toLowerCase().indexOf(filterValue) === 0);
  }



  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
