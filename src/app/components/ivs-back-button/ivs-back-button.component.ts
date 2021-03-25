import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ivs-back-button',
  templateUrl: './ivs-back-button.component.html',
  styleUrls: ['./ivs-back-button.component.scss']
})
export class IvsBackButtonComponent implements OnInit {

  @Input() url: string;
  constructor() { }

  ngOnInit(): void {
  }

}
