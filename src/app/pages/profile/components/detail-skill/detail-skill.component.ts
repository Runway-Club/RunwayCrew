import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';

@Component({
  selector: 'app-detail-skill',
  templateUrl: './detail-skill.component.html',
  styleUrls: ['./detail-skill.component.scss'],
})
export class DetailSkillComponent implements OnInit {
  @Input() item!: Skill;
  constructor() {}
  ngOnInit(): void {}
  public skillCalculate(exp: any) {
    return (exp / 2000) * 100;
  }
  public checkStatus(): string {
    let temp = this.item.exp;
    if (temp >= 1500) {
      return 'success';
    } else if (temp < 1500 && temp >= 1000) {
      return 'primary';
    } else if (temp < 1000 && temp >= 500) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
}
