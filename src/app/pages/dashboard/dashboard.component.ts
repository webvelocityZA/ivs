import { Router } from '@angular/router';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { Patients } from '../../mocks/patients'; //Demo purposes only
import { Patient } from 'src/app/models/patient.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VaccinationSiteStatistics } from 'src/app/models/vaccinationSiteStatistics.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  patients:any = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'emailAddress'];
  query;
  dataSource;
  VaccinationSiteStatistics:VaccinationSiteStatistics;
  overallTotal:any = '-';



  constructor(private data: DataService, private router: Router, private _snackBar: MatSnackBar, private cookieService: CookieService) {}


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    console.log(this.cookieService.get('vaccination-centre-name'))
    console.log(this.data.selectedLocation);
    this.loadPatients();
    this.getDashboardStats();
    this.getTotalDashboardStats();
    setInterval(() => {
      this.getDashboardStats();
      this.getTotalDashboardStats();
  }, 2000000);
  }



  loadPatients() {
    this.data.getPatients()
    .subscribe(res => {
      this.patients = res;
      console.log(res);
      this.dataSource = new MatTableDataSource<any>(this.patients);
      this.dataSource.paginator = this.paginator;
    }, err => {
    })
  }

  getDashboardStats() {

    const vaccinationSite = this.cookieService.get('vaccination-centre-id');
    
    this.data.getDashboardStatistics(vaccinationSite)
    .subscribe(res => {
      console.log(res);
      this.VaccinationSiteStatistics = res;
    });
  }

  getTotalDashboardStats() {
    
    this.data.getDashboardStatistics(0)
    .subscribe(res => {
      console.log(res);
      this.overallTotal = res.totalAvailable;
    });
  }

  search(){
    if (this.query) {
      this.data.searchByID(this.query).subscribe(
        res => {
          console.log(res[0]?.idNumber);
          const idnumber = res[0]?.idNumber;
          if (idnumber !== undefined) {
            this.router.navigateByUrl(`/member-profile/${idnumber}`);
          } else {
            this.openSnackBar('No result found', 'close');
          }
          
        }, err => {
          this.openSnackBar('No result found', 'close');
        }
      )
    }
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
