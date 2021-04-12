import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-otp-user-check',
  templateUrl: './otp-user-check.component.html',
  styleUrls: ['./otp-user-check.component.scss']
})
export class OtpUserCheckComponent implements OnInit {

  isLoading = false;
  idNumber: string;

  constructor(public data: DataService, private _snackBar: MatSnackBar, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.idNumber = paramMap.get('idNumber');
      this.data.activateProfileEditOTP(this.idNumber)
       .subscribe(res => {
         console.log('OTP REQ SENT')
        // this.isLoading = false;
      }, err => {
        if(err.error) {
        console.log(err.error.message);
        // this.openSnackBar(err.error.message, 'Close');
        }

      });
    });
  }


  activateProfileEditOTP(e: NgForm): void {

    if (e.valid === true) {
      this.isLoading = true;
      this.data.activateProfileEditOTP(this.idNumber)
        .pipe(tap((res) => {
          this.router.navigateByUrl(`/member-profile-edit/${this.idNumber}`);
         console.log(res);
        }))
        .subscribe(res => {
          this.isLoading = false;
        }, err => {
          if(err.error) {
            console.log(err);
          console.log(err.error.message);

          this.isLoading = false;
          this.openSnackBar(err.error.message, 'Close');
          }

        });
    } else if (e.valid === false) {
      this.openSnackBar('Please fill in the otp', 'Close');
    } else {
      alert('Something wrong');
    }
    // console.log(e);

  }

  openSnackBar = (message: string, action: string) => {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  };

}


