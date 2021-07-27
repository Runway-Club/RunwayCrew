import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  public roles = [
    { name: 'Runway ATC', img: '../../../assets/images/roles/ATC.png' },
    {
      name: 'Runway Threshold',
      img: '../../../assets/images/roles/Threshold.png',
    },
    {
      name: 'Runway Lightning',
      img: '../../../assets/images/roles/Lightning.png',
    },
    { name: 'Runway SWAT', img: '../../../assets/images/roles/SWAT.png' },
    { name: 'Runway Corium', img: '../../../assets/images/roles/Corium.png' },
    { name: 'Runway Dev', img: '../../../assets/images/roles/Dev.png' },
    {
      name: 'Runway Discovery',
      img: '../../../assets/images/roles/Discovery.png',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
