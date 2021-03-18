import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gems-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {
  @Input() svgPathList:string[] | undefined;
  @Input() title:string | undefined;
  @Input() amount:string | undefined;
  @Input() color:string | undefined;


  constructor() {


  }

  ngOnInit(): void {
  }

}
