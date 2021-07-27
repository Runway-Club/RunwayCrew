import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  public skills: Array<Skill> = [
    { name: 'Dev', description: 'None', exp: 750, level: 5 },
    { name: 'Angular', description: 'Ai biết', exp: 1500, level: 5 },
    { name: 'Communication', description: 'đoán xem', exp: 1000, level: 5 },
    { name: 'NodeJS', description: 'Lorem Ipsum', exp: 200, level: 5 },
    { name: 'Dev', description: 'None', exp: 750, level: 5 },
    { name: 'Angular', description: 'Ai biết', exp: 1500, level: 5 },
    { name: 'Communication', description: 'đoán xem', exp: 1000, level: 5 },
    { name: 'NodeJS', description: 'Lorem Ipsum', exp: 200, level: 5 },
    { name: 'Dev', description: 'None', exp: 750, level: 5 },
    { name: 'Angular', description: 'Ai biết', exp: 1500, level: 5 },
    { name: 'Communication', description: 'đoán xem', exp: 1000, level: 5 },
    { name: 'NodeJS', description: 'Lorem Ipsum', exp: 200, level: 5 },
  ];
  constructor() {}

  ngOnInit(): void {}
}
