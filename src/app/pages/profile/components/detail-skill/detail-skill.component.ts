import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-skill',
  templateUrl: './detail-skill.component.html',
  styleUrls: ['./detail-skill.component.scss'],
})
export class DetailSkillComponent implements OnInit {
  @Input() item = '';
  constructor() {}

  ngOnInit(): void {}
}
