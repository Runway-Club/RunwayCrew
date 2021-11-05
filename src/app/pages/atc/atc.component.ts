import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atc',
  templateUrl: './atc.component.html',
  styleUrls: ['./atc.component.scss']
})
export class AtcComponent implements OnInit {
  isClick = false;
  constructor() { }

  ngOnInit(): void {
  }

  enableDisableRule(){
    this.isClick = !this.isClick;
  }
}
