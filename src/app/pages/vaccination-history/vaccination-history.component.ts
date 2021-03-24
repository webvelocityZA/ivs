import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { SiteVaccinationHistory } from 'src/app/models/site-vaccination-history.model';
import { Vaccination } from 'src/app/models/vaccination.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vaccination-history',
  templateUrl: './vaccination-history.component.html',
  styleUrls: ['./vaccination-history.component.scss']
})
export class VaccinationHistoryComponent implements AfterViewInit {
  siteVaccinationHistory:SiteVaccinationHistory[] = [];
  displayedColumns: string[] = ['fullname', 'vaccineName', 'vaccinatedDate', 'siteLocation', 'siteProvince'];
  dataSource;


  constructor(private data: DataService, private _snackBar: MatSnackBar) {}

   

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.loadPatients();
    
  }

  loadPatients() {
    this.data.getSiteVaccinationHistory()
    .subscribe(res => {
      this.siteVaccinationHistory = res;
      console.log(res);
      this.dataSource = new MatTableDataSource<any>(this.siteVaccinationHistory);
      this.dataSource.paginator = this.paginator;
    }, err => {
    })
  }

  applyFilter(e:any) {

  }



}
