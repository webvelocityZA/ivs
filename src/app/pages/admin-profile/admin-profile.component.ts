import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserAdmin } from './../../models/user.model';
import { DataService } from 'src/app/services/data.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})


export class AdminProfileComponent implements OnInit {

  id = this.data.decryptData().userId;  // For demo purposes only
  firstName: string = this.data.decryptData().firstName;
  lastName: string = this.data.decryptData().surname;
  emailAddress: string =  this.data.decryptData().email;
  username: string = this.data.decryptData().username;

  disabledInput = false;




  constructor(public data: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.updataUserProfile;
    console.log(this.data.decryptData())
  }


  updataUserProfile = (e) => {
    const payload: UserAdmin = {
      id: this.id,
      firstName: this.firstName,
      surname: this.lastName,
      username: this.username,
      password: e.value.password,
      isAdmin: true
    };
    this.data.updataUserProfile(payload)
      .subscribe(
        res => {
        this.openSnackBar(res.toString(), 'Close');
      }, err => {
        console.log(err);
        this.openSnackBar(err.error, 'Close');
      });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
