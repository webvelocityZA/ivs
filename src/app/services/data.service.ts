import {Patients} from './../mocks/patients';
import {Injectable} from '@angular/core';
import {Patient, VaccinationInfo} from '../models/patient.model';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {last} from 'rxjs/operators';
import {VaccinationSiteStatistics} from '../models/vaccinationSiteStatistics.model';
import { Centre } from '../models/centre.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://10.123.142.196:5100/api';
  currentPatient!: Patient;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  selectedLocation:Centre;

  constructor(private http: HttpClient) {
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }


  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  registerPatient(idNumber, firstName, lastName, position, employer, mobileNumber, emailAddress, schemeName, city): Observable<any> {
    const postData = {
      id: 0,
      idNumber,
      firstName,
      lastName,
      isMember: true,
      confirmed: true,
      city: city,
      siteId: 0,
      mobileNumber,
      emailAddress,
      memberNumber: '12345678',
      schemeName,
      employer,
      position,
      allergies: true,
      chronicMedication: 'string',
      vaccinationInfo: [
        {
          id: 0,
          memberId: 0,
          vaccinationSiteId: 0,
          vaccinatorid: 0,
          feedBack: 'string',
          repeatInoculatedOn: '2021-03-13T16:00:18.718Z',
          inoculatedOn: '2021-03-13T16:00:18.718Z',
          dosageRecieved: 'string',
          doseNumber: 0,
          vaccinatedDate: '2021-03-13T16:00:18.718Z',
          createdOn: '2021-03-13T16:00:18.718Z',
          createdby: 'string',
          updatedOn: '2021-03-13T16:00:18.718Z',
          updatedby: 'string',
          deleted: true,
          deletedOn: '2021-03-13T16:00:18.718Z',
          deletedBy: 'string'
        }
      ],
      appointmentDate: '2021-03-13',
      createdOn: '2021-03-13T16:00:18.718Z',
      createdby: 'string',
      updatedOn: '2021-03-13T16:00:18.718Z',
      updatedby: 'string',
      deleted: true,
      deletedOn: '2021-03-13T16:00:18.718Z',
      deletedBy: 'string'
    };
    return this.http.post(`${this.url}/Registration`, postData, {responseType: 'text'});
  }

  updatePatient = (idNumber, firstName, lastName, position, employer, mobileNumber, emailAddress, schemeName, city?) => {
    const postData = {
      id: 0,
      idNumber,
      firstName,
      lastName,
      isMember: true,
      confirmed: true,
      city: city,
      mobileNumber,
      emailAddress,
      memberNumber: 'string',
      schemeName,
      employer,
      position,
      allergies: true,
      chronicMedication: 'string',
      appointmentDate: '2021-03-11',
      // "createdOn": "2021-03-11T17:55:45.942Z",
      // "createdby": "string",
      // "updatedOn": "2021-03-11T17:55:45.942Z",
      // "updatedby": "string",
      // "deleted": true,
      // "deletedOn": "2021-03-11T17:55:45.942Z",
      // "deletedBy": "string"
    };
    return this.http.put(`${this.url}/Registration`, postData);
  };

  loadPatient(): Patient {
    this.currentPatient = Patients[0];
    return this.currentPatient;
  }

  getPatients = () => {
    // return of('string');
    return this.http.get(`${this.url}/Registration`);
  }

  searchResults = (term: string) => Patients;

  getSelectedSearchItem(index: number): Patient {
    return Patients[index];
  }

  searchByID(ID: any): Observable<any> {
    const searchData = {
      idNumber: ID
    };
    return this.http.post(`${this.url}/Registration/Search`, searchData);
  }


  /* Vaccination */

  getVaccinationInfo(patientID: any): Observable<VaccinationInfo> {
    return this.http.get<VaccinationInfo>(`${this.url}/Vaccination/${patientID}`);
  }

  postVaccinationInfo(payload: any): any {
    const vacData = {
      memberId: payload.memberId,
      vaccinationSiteId: 1,
      vaccinatorid: 1,
      feedBack: 'Was Good Service',
      repeatInoculatedOn: '2021-03-16T12:42:55.459Z',
      inoculatedOn: '2021-03-16T12:42:55.459Z',
      dosageRecieved: '560ml',
      doseNumber: 1,
      vaccinatedDate: '2021-03-16T12:42:55.459Z'
    };
    return this.http.post(`${this.url}/Vaccination/`, vacData);
  }

  getDashoardStatistics(ID: any): Observable<VaccinationSiteStatistics> {
    return this.http.get<VaccinationSiteStatistics>(`${this.url}/VaccinationSite/Statistics/${ID}`);
  }

  getAllCentres():Observable<Centre[]> {
    return this.http.get<Centre[]>(`${this.url}/Centre`);
  }
}
