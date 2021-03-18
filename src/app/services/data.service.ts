import { Patients } from './../mocks/patients';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { last } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = "http://10.123.142.196:5100/api";
  currentPatient!: Patient;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) { }

  private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }


  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
   }

  registerPatient(idNumber, firstName, lastName, position, employer, mobileNumber, emailAddress, schemeName): Observable<any> {
    console.log('');
    let postData = {
      "id": 0,
      "idNumber": idNumber,
      "firstName": firstName,
      "lastName": lastName,
      "isMember": true,
      "confirmed": true,
      "city": "string",
      "siteId": 0,
      "mobileNumber": mobileNumber,
      "emailAddress": emailAddress,
      "memberNumber": "12345678",
      "schemeName": schemeName,
      "employer": employer,
      "position": position,
      "allergies": true,
      "chronicMedication": "string",
      "vaccinationInfo": [
        {
          "id": 0,
          "memberId": 0,
          "vaccinationSiteId": 0,
          "vaccinatorid": 0,
          "feedBack": "string",
          "repeatInoculatedOn": "2021-03-13T16:00:18.718Z",
          "inoculatedOn": "2021-03-13T16:00:18.718Z",
          "dosageRecieved": "string",
          "doseNumber": 0,
          "vaccinatedDate": "2021-03-13T16:00:18.718Z",
          "createdOn": "2021-03-13T16:00:18.718Z",
          "createdby": "string",
          "updatedOn": "2021-03-13T16:00:18.718Z",
          "updatedby": "string",
          "deleted": true,
          "deletedOn": "2021-03-13T16:00:18.718Z",
          "deletedBy": "string"
        }
      ],
      "appointmentDate": "2021-03-13",
      "createdOn": "2021-03-13T16:00:18.718Z",
      "createdby": "string",
      "updatedOn": "2021-03-13T16:00:18.718Z",
      "updatedby": "string",
      "deleted": true,
      "deletedOn": "2021-03-13T16:00:18.718Z",
      "deletedBy": "string"
    };
    return this.http.post(`${this.url}/Registration`, postData, {responseType: 'text'});
  }

  updatePatient(idNumber, firstName, lastName, position, employer, mobileNumber, emailAddress, schemeName) {
    let postData = {
      "id": 0,
      "idNumber": idNumber,
      "firstName": firstName,
      "lastName": lastName,
      "isMember": true,
      "confirmed": true,
      "city": "string",
      "mobileNumber": mobileNumber,
      "emailAddress": emailAddress,
      "memberNumber": "string",
      "schemeName": schemeName,
      "employer": employer,
      "position": position,
      "allergies": true,
      "chronicMedication": "string",
      "appointmentDate": "2021-03-11",
      // "createdOn": "2021-03-11T17:55:45.942Z",
      // "createdby": "string",
      // "updatedOn": "2021-03-11T17:55:45.942Z",
      // "updatedby": "string",
      // "deleted": true,
      // "deletedOn": "2021-03-11T17:55:45.942Z",
      // "deletedBy": "string"
    };
    return this.http.put(`${this.url}/Registration`, postData);
  }

  loadPatient():Patient {
    this.currentPatient = Patients[0];
    return this.currentPatient;
  }

  getPatients() {
    // return of('string');
    return this.http.get(`${this.url}/Registration`);
  }

  searchResults(term: string) {
    return Patients;
  }

  getSelectedSearchItem(index: number):Patient {
    return Patients[index];
  }

  searchByID(ID:any): any {
    const searchData = {
        "idNumber": ID
    };
    return this.http.post(`${this.url}/Registration/Search`, searchData);
  }
}
