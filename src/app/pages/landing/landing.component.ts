import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.disallowAccessToLoggedOutPages();
  }

  joinGEMS() {
    window.open('https://member.gems.gov.za/JoinGems', '_blank');
  }

}
