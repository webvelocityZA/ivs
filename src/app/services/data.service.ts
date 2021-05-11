import { Observable } from 'rxjs';
// tslint:disable: typedef
import { Registration } from './../models/patient.model';
import {Patients} from './../mocks/patients';
import {Injectable} from '@angular/core';
import {Patient, VaccinationInfo} from '../models/patient.model';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {VaccinationSiteStatistics} from '../models/vaccinationSiteStatistics.model';
import { Centre } from '../models/centre.model';
import { getHowManyTimes, RequestVaccinationSiteID, Vaccination, Vaccine, VaccineCentre } from '../models/vaccination.model';
import { SiteVaccinationHistory } from '../models/site-vaccination-history.model';
import {environment} from '../../environments/environment.prod';
import { Feedback } from '../models/feedback.model';
import { UserAdmin } from '../models/user.model';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = environment.API_ENDPOINT;
  currentPatient!: Patient;
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  selectedLocation: Centre;
  selectVaccine: Vaccine;

  constructor(private http: HttpClient, private router: Router) {}


  private hasToken(): boolean {
    // Check if we have user in local storage
    if (localStorage.getItem('userObj')) {

      // Get current date and time
      const now = new Date();
      // Convert token expiration string to Javascript date and time
      const tokenExpirationDate = new Date(this.decryptData().expires);
      // Check if token expiration is before current date and time
      if (now.getTime() >= tokenExpirationDate.getTime()) {
        // tslint:disable-next-line: max-line-length
        // If token has expired remove the entire user from local storage. Our hasToken() function will automatically log user out when that is taken out of local storage
        localStorage.removeItem('userObj');
        console.log('Token has expired');
      } else {
        console.log('Token still valid');
      }
    }
    return !!localStorage.getItem('userObj');
  }

  // If member is logged in this code will disallow accessing a page were it is used. Auto redirect to dashboard
  disallowAccessToLoggedOutPages() {
    if (localStorage.getItem('userObj') != null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  hasUserAcceptedDisclaimer() {
    return !!localStorage.getItem('disclaimer');
  }

  async encryptData(dataToEncrypt: any) {
    try {
      console.log(dataToEncrypt);
      const encryptedData = await CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt), '123456').toString();
      localStorage.setItem('userObj', encryptedData);
    } catch (e) {
      console.log(e);
      return;
    }
  }


  decryptData() {
    try {
      const encryptedFromlocalstorage = localStorage.getItem('userObj');
      if (encryptedFromlocalstorage) {
      const bytes = CryptoJS.AES.decrypt(encryptedFromlocalstorage, '123456');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      }
      return encryptedFromlocalstorage;
    } catch (e) {
      console.log(e);
    }
  }

  addHeaderToken(){
    const headerToken = {
      headers: new HttpHeaders({
      Authorization: `Bearer ${this.decryptData().token}`
      })
    };
    return headerToken;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  login(userName, password): Observable<UserAdmin>{
    console.log(this.hasToken());

    const userData = {
      userName,
      password
    };

    return this.http.post<UserAdmin>(`${this.url}/User/Login/`,  userData );
  }

  fetchUserProfile(ID: number): Observable<UserAdmin>{
    return this.http.get<UserAdmin>(`${this.url}/User/${ID}`);
  }

  updataUserProfile(payload): Observable<UserAdmin>{
    const userData = {
      id: payload.id,
      firstName: payload.firstName,
      surname: payload.surname,
      username: payload.username,
      password: payload.password,
      isAdmin: true
    };
    return this.http.put<UserAdmin>(`${this.url}/User/`,  userData );
  }




  registerPatient(registrationPostData: Registration): Promise<any> {
    return this.http.post(`${this.url}/Registration`, registrationPostData).toPromise();
  }

  // tslint:disable-next-line: max-line-length
  updatePatient = (userRowId, referenceNumber, idNumber, position?, employer?, schemeName?, memberNumber?, firstName?, lastName?, mobileNumber?, city?,  province?, dateOfBirth?, emailAddress?) => {
    const postData = {
      id: userRowId,
      referenceNumber,
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
      dateOfBirth,
      emailAddress
    };
    return this.http.put(`${this.url}/Registration`, postData);
  }


// OTP Request on FirstTime Registration
  postOTP(idNumber, otp): Observable<any>{
    const otpData = {
      idNumber,
      otp
    };
    return this.http.post(`${this.url}/Registration/Confirm`, otpData);
  }

// Resend OTP on Registration
resendOTP(idNumber): Observable<any>{
  return this.http.get(`${this.url}/Registration/ResendOtp/${idNumber}`);
}

// OTP Request on Editing Member Profile
 activateProfileEditOTP(idNumber): Observable<any>{
    return this.http.get(`${this.url}/Registration/RequestOtp/${idNumber}`);
  }


  loadPatient(): Patient {
    this.currentPatient = Patients[0];
    return this.currentPatient;
  }

  getPatients() {
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
    return this.http.get<VaccinationInfo>(`${this.url}/Vaccination/${patientID}`, this.addHeaderToken());
  }


  getVaccinationFeedbackByRowID(patientID: any): Observable<any> {
    return this.http.get<any>(`${this.url}/Vaccination/Feedback/${patientID}`, this.addHeaderToken());
  }

  getVaccinationFeedbackByRowIDv2(patientID: any): Observable<any> {
    return this.http.get<any>(`${this.url}/Vaccination/Member/History/${patientID}`, this.addHeaderToken());
  }



  postFeedBack(feedback: Feedback, selectedFile: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type': 'multipart/form-data;boundary {}',
      //  "Authorization": `Bearer ${this.decryptData().token}`
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiS2V2aW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zdXJuYW1lIjoiS2V2aW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9jb3VudHJ5IjoiWkEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImlkIjoiMSIsImV4cCI6MTY1OTczMTAzOSwiaXNzIjoid3d3LmdlbXMuZ292LnphIiwiYXVkIjoid3d3LmdlbXMuZ292LnphIn0.g3v6rcB7nT3qC4vxoDHciLJuxmUnuFXoe4ZRFTE3cq4`
      })
    };

    const formData = new FormData();
    formData.append('file', selectedFile);

    const feedBackData = {
      file: selectedFile
    };

    const encodedString = encodeURI(JSON.stringify(feedback));
    console.log(feedback);
    console.log(encodedString);

    return this.http.post<any>(`${this.url}/Vaccination/Feedback?FeedbackString=${encodedString}`, formData, httpOptions);
  }

  postVaccinationInfo(payload: any): any {
    const vacData = {
      // id: payload.id,
      memberId: payload.memberId,
      vaccinationSiteId: +payload.id,
      // vaccinatorid: this.decryptData().id,
      vaccinatorid: 1,
      dosageRecieved: 'string',
      doseNumber: payload.doseNumber,
      programId: payload.programId

    };

    console.log(vacData);

    return this.http.post(`${this.url}/Vaccination/`, vacData , this.addHeaderToken());
  }

  getDashboardStatistics(ID: any): Observable<VaccinationSiteStatistics> {
    return this.http.get<VaccinationSiteStatistics>(`${this.url}/VaccinationSite/Statistics/${ID}`);
  }

  getAllCentres(): Observable<Centre[]> {
    return this.http.get<Centre[]>(`${this.url}/Centre`);
  }

  getSiteVaccinationHistory(): Observable<SiteVaccinationHistory[]> {
    return this.http.get<SiteVaccinationHistory[]>(`${this.url}/Vaccination/History/0`, this.addHeaderToken());
  }

  getVaccineCentre(siteId: number): Observable<VaccineCentre[]> {
    return this.http.get<VaccineCentre[]>(`${this.url}/Centre/Vaccines/${siteId}`);
  }

  getHowManyTimes(ID: number): Observable<getHowManyTimes>{
    return this.http.get<getHowManyTimes>(`${this.url}/Registration/Vaccinated/${ID}`, this.addHeaderToken());
  }


  // @TODO refractory
  getAllVaccines(): Observable<Vaccine[]> {
    return this.http.get<Vaccine[]>(`${this.url}/Vaccine`);
  }

  getBySiteAndVaccineId(requestVaccinationSiteID: any): any{
    // return this.http.get<VaccineCentre[]>(`${this.url}/Centre/Vaccines/${siteId}`);
    const formdata = {
      vaccineId: requestVaccinationSiteID.vaccineId,
      sideId: requestVaccinationSiteID.sideId
    };

    return this.http.post<any>(`${this.url}/VaccinationSite/BySiteAndVaccineId/`, formdata);
  }




  getProgrammes() {
    return this.http.get(`${this.url}/Program`);
  }

  // New Implementation
  // getVaccinationSite(siteID) {
  //   return this.http.get(`${this.url}/api/VaccinationSite/${siteID}`);
  // }


}
