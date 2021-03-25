import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ivs-heading',
  templateUrl: './ivs-heading.component.html',
  styleUrls: ['./ivs-heading.component.scss']
})
export class IvsHeadingComponent implements OnInit {

  @Input() title: string;
  @Input() backLink: string;
  siteName: string;
  @Input() viewFromShow: boolean = false;
  
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.siteName = this.cookieService.get('vaccination-centre-name');
  }

}
