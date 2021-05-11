import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'ivs-footer',
  templateUrl: './ivs-footer.component.html',
  styleUrls: ['./ivs-footer.component.scss']
})
export class IvsFooterComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  currentYear= new Date().getUTCFullYear();

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.data.isLoggedIn();
  }

  reportFraud() {
    window.open('https://www.gems.gov.za/en/Information/Fraud', '_blank');
  }
}
