import { Component, OnInit, Input } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { AchievedSkill } from 'src/models/achievement.model';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  public skills!: AchievedSkill[];
  public loadDone = false;
  constructor(public contribute: ContributionService) {}

  ngOnInit(): void {
    setTimeout(async () => {
      await this.get();
    }, 100);
  }
  public async get() {
    this.skills = await (await this.contribute.get()).skills;
    this.loadDone = true;
  }
}
