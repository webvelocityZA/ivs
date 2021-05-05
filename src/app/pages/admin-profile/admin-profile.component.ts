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

  id = 2;  // For demo purposes only
  firstName: string;
  lastName: string;
  emailAddress: string =  this.data.decryptData().email;
  username: string = this.data.decryptData().username;

  disabledInput = false;




  constructor(public data: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // tslint:disable-next-line: no-unused-expression
    this.updataUserProfile;

    // For demo purposes only
    // if(this.username ==='KEVINM') this.id=1;
    // if(this.username ==='PALESAP') this.id=2;
    // if(this.username ==='ABEGAILM') this.id=3;
    // if(this.username ==='CLEMENTM') this.id=4;
  }



  fetchUserProfile = () => {
  }

  updataUserProfile = (e) => {
    const payload: UserAdmin = {
      id: this.id,
      firstName: 'Kevin',
      surname: 'Mpofu',
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
