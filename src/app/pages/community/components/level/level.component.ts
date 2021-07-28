import { Component, Input, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserContribution } from 'src/models/user-profile.model';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss'],
})
export class LevelComponent implements OnInit {
  @Input() uid!: string;
  @Input() skillCommon?: any;
  public skill!: UserContribution;
  public loadDone = false;
  constructor(
    private contrib: ContributionService,
    private skillSv: SkillService
  ) {}

  ngOnInit(): void {
    setTimeout(async () => {
      this.skill = await this.getSkill();
      console.log(this.skill);
      this.loadDone = true;
    }, 100);
  }
  public async getSkill() {
    let result = await this.contrib.get(this.uid);
    return result;
  }
}
