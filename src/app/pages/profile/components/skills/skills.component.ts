import { Component, OnInit, Input } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { AchievedSkill } from 'src/models/achievement.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  @Input() skills!: AchievedSkill[];
  @Input() uid = '';
  public loadDone = false;
  constructor(public contributeSv: ContributionService) { }
  ngOnInit(): void { }
  public async get() {
    this.skills = await (await this.contributeSv.get()).skills;
    console.log(typeof (this.skills));
    this.loadDone = true;
  }
}
