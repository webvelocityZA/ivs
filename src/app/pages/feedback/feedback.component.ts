import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { Feedback } from 'src/app/models/feedback.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  showDoctorFields:boolean = false;
  feedbackOption;
  isIDValid = false;
  registered:boolean = false;
  lastName;
  firstName;
  selectedFile;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.disallowAccessToLoggedOutPages();
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

  postFeedback(e:NgForm){
    const feedback: Feedback={
      memberId: 1,
      Information: "string",
      Gategory:"string",
    }

    this.data.postFeedBack(feedback, this.selectedFile).subscribe(res=>{
      console.log(res)
    }, err => {
      console.log(err);
    })
      
    
  }

  uploadFileEvt(event: any) {
    console.log(event);
    let files: FileList = event.target.files;
    let file : File = files[0];
    this.selectedFile = file;
    console.log(file)
  }

  uploadFileEvt2(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: File) => {
        this.fileAttr += file.name + ' - ';
      });

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          let imgBase64Path = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = "";
    } else {
      this.fileAttr = 'Choose File';
    }
  }

}
