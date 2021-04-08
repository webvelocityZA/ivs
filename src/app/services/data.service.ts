import {Patients} from './../mocks/patients';
import {Injectable} from '@angular/core';
import {Patient, VaccinationInfo} from '../models/patient.model';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {VaccinationSiteStatistics} from '../models/vaccinationSiteStatistics.model';
import { Centre } from '../models/centre.model';
import { getHowManyTimes, Vaccination, Vaccine, VaccineCentre } from '../models/vaccination.model';
import { SiteVaccinationHistory } from '../models/site-vaccination-history.model';
import {environment} from '../../environments/environment.prod';
import { Feedback } from '../models/feedback.model';
import { UserAdmin } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = environment.API_ENDPOINT;
  currentPatient!: Patient;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  selectedLocation: Centre;
  selectVaccine: Vaccine;

  constructor(private http: HttpClient) {}


  private hasToken(): boolean {
    return !!localStorage.getItem('userObj');
  }

  getLoggedInUserInfo(): UserAdmin{
    const userObj: UserAdmin = JSON.parse(localStorage.getItem('userObj'));
    return userObj
  }
  
  addHeaderToken(){
    const headerToken = {
      headers: new HttpHeaders({
       "Authorization": `Bearer ${this.getLoggedInUserInfo().token}`
      })
    }
    return headerToken;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  login(userName, password): Observable<UserAdmin>{
    console.log(this.hasToken())

    const userData= {
      userName,
      password
    }

    return this.http.post<UserAdmin>(`${this.url}/User/Login/`,  userData );
  }


  registerPatient(idNumber, firstName, lastName, position, employer, mobileNumber, emailAddress, schemeName, city, province, dateOfBirth): Observable<any> {
    const postData = {
      id: 0,
      idNumber,
      firstName,
      lastName,
      isMember: true,
      confirmed: true,
      city,
      province,
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
      dateOfBirth,
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

  updatePatient = (idNumber, position?, employer?, schemeName?, memberNumber?, firstName?, lastName?, mobileNumber?, city?,  province?, dateOfBirth?) => {
    const postData = {
      idNumber,
      memberNumber,
      schemeName,
      employer,
      position,
      firstName,
      lastName,
      mobileNumber,
      city,
      province,
      dateOfBirth
    };
    return this.http.put(`${this.url}/Registration`, postData);
  }


  postOTP(idNumber, otp): Observable<any>{
    const otpData = {
      // idNumber: idNumber,
      idNumber: '8304155023081',
      otp

    };
    return this.http.post(`${this.url}/Registration/Confirm`, otpData);
  }

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

    const headerToken = {
      headers: new HttpHeaders({
      "Authorization": `Bearer ${this.getLoggedInUserInfo().token}`
      })
    }
    const searchData = {
      idNumber: ID
    };
    return this.http.post(`${this.url}/Registration/Search`, searchData,  headerToken);
  }


  /* Vaccination */

  getVaccinationInfo(patientID: any): Observable<VaccinationInfo> {

    // return this.http.get<VaccinationInfo>(`${this.url}/Vaccination/${patientID}`); @TODO add  httpOptions


    return this.http.get<VaccinationInfo>(`${this.url}/Vaccination/${patientID}`);
  }

  postFeedBack(feedback: Feedback, selectedFile:any): Observable<any> {  
    // console.log(selectedFile); 
    const httpOptions = {
      headers: new HttpHeaders({
       "Content-Type": "multipart/form-data;boundary {}"
      })
    };

    const formData = new FormData();
    formData.append('file', selectedFile);
    
    const feedBackData = {
      file: selectedFile
    }
    
    const encodedString = encodeURI(JSON.stringify(feedback));
    console.log(encodedString)

    return this.http.post<any>(`${this.url}/Vaccination/Feedback?FeedbackString=${encodedString}`, formData, httpOptions);
  }

  postVaccinationInfo(payload: any): any {
    const vacData = {
      memberId: payload.memberId,
      vaccinationSiteId: payload.vaccinationSiteId,
      vaccinatorid: 2,
      feedBack: 'Was Good Service',
      // dosageRecieved: payload.dosageRecieved,
      dosageRecieved: '1',
      doseNumber: payload.doseNumber,
      repeatInoculatedOn: '2021-03-25T23:42:55.459Z',
      inoculatedOn: '2021-03-25T23:42:55.459Z',
      vaccinatedDate: '2021-03-25T23:42:55.459Z'
    };
    return this.http.post(`${this.url}/Vaccination/`, vacData);
  }

  getDashboardStatistics(ID: any): Observable<VaccinationSiteStatistics> {
    return this.http.get<VaccinationSiteStatistics>(`${this.url}/VaccinationSite/Statistics/${ID}`);
  }

  getAllCentres(): Observable<Centre[]> {
    return this.http.get<Centre[]>(`${this.url}/Centre`);
  }


  getSiteVaccinationHistory(): Observable<SiteVaccinationHistory[]> {
    return this.http.get<SiteVaccinationHistory[]>(`${this.url}/Vaccination/History/0`);
  }

  getVaccineCentre(siteId: number): Observable<VaccineCentre[]> {
    return this.http.get<VaccineCentre[]>(`${this.url}/Centre/Vaccines/${siteId}`);
  }

  getHowManyTimes(ID: number): Observable<getHowManyTimes>{
    return this.http.get<getHowManyTimes>(`${this.url}/Registration/Vaccinated/${ID}`);
  }


  // @TODO refractory
  getAllVaccines(): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(`${this.url}/Vaccine`);
  }


}
