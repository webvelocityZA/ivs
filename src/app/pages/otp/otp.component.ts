import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {DataService} from 'src/app/services/data.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  isLoading = false;
  idNumber: string;

  constructor(public data: DataService, private _snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }


  activateOTP(e: NgForm): void {

    if (e.valid === true) {
      this.isLoading = true;
      this.data.postOTP(this.idNumber, e.value.otp)
        .pipe(tap((res) => {
          console.log(res);
          this.router.navigateByUrl('/thank-you');
          // console.log(res);
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


  // checkValidation(e: NgForm){
  //   // console.log(e);
  //   if (e.valid === true) {
  //     // this.navToTab();
  //   } else if (e.valid === false) {
  //     this.openSnackBar('Please fill all required fields', 'Close');
  //   } else {
  //     alert('Something wrong');
  //   }
  //   // console.log(e);
  // }

}


