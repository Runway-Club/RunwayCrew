import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles = [
    { name: 'hello', img: '../../../assets/images/roles/ATC.png' },
    { name: 'hello', img: '../../../assets/images/roles/Threshold.png' },
    { name: 'hello', img: '../../../assets/images/roles/Lightning.png' },
    { name: 'hello', img: '../../../assets/images/roles/SWAT.png' },
    { name: 'hello', img: '../../../assets/images/roles/Corium.png' },
    { name: 'hello', img: '../../../assets/images/roles/Dev.png' },
    { name: 'hello', img: '../../../assets/images/roles/Discovery.png' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
