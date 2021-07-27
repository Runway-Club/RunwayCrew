import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  exp: number = 0;
  avgas: number = 1028;
  rank: string = 'S';
  constructor() { }

  ngOnInit(): void {
  }

}
