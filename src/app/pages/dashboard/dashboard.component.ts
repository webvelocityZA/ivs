import { Router } from '@angular/router';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { Patients } from '../../mocks/patients'; //Demo purposes only
import { Patient } from 'src/app/models/patient.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VaccinationSiteStatistics } from 'src/app/models/vaccinationSiteStatistics.model';

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



  constructor(private data: DataService, private router: Router, private _snackBar: MatSnackBar) {}

   

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadPatients();
    this.getDashboardStats();
    setInterval(() => {
      this.getDashboardStats();
  }, 2000);
  }

  loadPatients() {
    this.data.getPatients()
    .subscribe(res => {
      this.patients = res;
      console.log(res);
      this.dataSource = new MatTableDataSource<any>(this.patients);
      this.dataSource.paginator = this.paginator;
    }, err => {
      // this.patients = 'error';
    })
  }

  getDashboardStats() {
    const vaccinationSite = 1;
    this.data.getDashoardStatistics(vaccinationSite)
    .subscribe(res => {
      console.log(res);
      this.VaccinationSiteStatistics = res;
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
