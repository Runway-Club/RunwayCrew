import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component'
@Component({
  selector: 'app-atc',
  templateUrl: './atc.component.html',
  styleUrls: ['./atc.component.scss']
})
export class AtcComponent implements OnInit {
  constructor(
    private AppComponent:AppComponent
  ) { }

  ngOnInit(): void {
    this.AppComponent.selectedMenu = 2
  }
}
