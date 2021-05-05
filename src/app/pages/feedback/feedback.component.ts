import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {takeWhile, tap} from 'rxjs/operators';
import {Feedback} from 'src/app/models/feedback.model';
import {DataService} from 'src/app/services/data.service';
import { IvsDialogComponent } from '../ivs-dialog/ivs-dialog.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  showDoctorFields: boolean = false;
  feedbackOption;
  isIDValid = false;
  registered: boolean = false;
  lastName;
  firstName;
  selectedFile;
  feedback: string;
  patientRowID: number;

  constructor(private data: DataService, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.data.disallowAccessToLoggedOutPages();
    // if(!this.data.hasUserAcceptedDisclaimer()) {
    //   this.openDialog();
    // }
    this.openDialog();
  }

  checkSelectedFeedbackOption(e: any) {
    console.log(e);
    if (e === 'general') {
      this.showDoctorFields = false;
    } else if (e === 'vaccination') {
      this.showDoctorFields = true;
    }
  }

  // @Todo
  checkIfIDExists(e: string) {
    if (e.length === 13) {
      this.isIDValid = true;
    } else {
      this.isIDValid = false;
      this.registered = false;
    }
    if (e.length < 13) {
      return;
    }
    this.data.searchByID(e)
      .subscribe(patient => {
        console.log(patient);
        if (patient.length > 0) {
          this.patientRowID = patient[0].id;

          this.lastName = patient[0].lastName;
          this.firstName = patient[0].firstName;
          console.log(this.firstName);
          this.registered = true;
        } else {
          this.registered = false;
        }
      }, err => {
        this.registered = false;
      });

  }

  postFeedback = (e: NgForm) => {
    const feedback: Feedback = {
      memberId: this.patientRowID,
      Information: e.value.feedback,
      Gategory: `${e.value.feedbackOption} feedback`,
    };

    this.data.postFeedBack(feedback, this.selectedFile)
      .pipe(tap((res) => {
        console.log(res);
        this.router.navigateByUrl('/thank-you-feedback').then(r => {});
      }))
      .subscribe(res => {
          console.log(res);
          // this.openSnackBar('Your Feedback was successfully sent.', 'Close');
        }, err => {
          console.log(err);
          this.openSnackBar('Feeback submission failed.', 'Close');
        }
      );
  }

  uploadFileEvt(event: any) {
    console.log(event);
    const files: FileList = event.target.files;
    const file: File = files[0];
    this.selectedFile = file;
    this.fileAttr = file.name;
    console.log(file);
  }

  uploadFileEvt2 = (imgFile: any) => {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);

      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Upload Doctor\'s Note';
    }
  };

  openSnackBar = (message: string, action: string) => {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  };

  openDialog() {
    const feedabckDialogRef = this.dialog.open(IvsDialogComponent, {
      disableClose: true
    });

    feedabckDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === 'accepted') {
        console.log('User has accepted');
        this.router.navigateByUrl('/feedback');
        localStorage.setItem('disclaimer', 'hasAcceptedDisclaimer');
      } else if (result === 'declined'){
        console.log('User has declined');
        this.router.navigateByUrl('/landing');
      }
    });
  }



}
