import { Component, OnInit, Input } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { SkillService } from 'src/app/services/skill.service';
import { AchievedSkill } from 'src/models/achievement.model';
import { Skill } from 'src/models/skill.model';

@Component({
  selector: 'app-detail-skill',
  templateUrl: './detail-skill.component.html',
  styleUrls: ['./detail-skill.component.scss'],
})
export class DetailSkillComponent implements OnInit {
  @Input() item!: AchievedSkill;
  public skillDetail!: Skill;
  public loadDone = false;
  public level: any = 0;
  public progressBar: any;
  public status!: string;
  constructor(public skillSv: SkillService) {}
  ngOnInit(): void {
    setTimeout(async () => {
      await this.getSkillDetail();
    }, 0);
  }
  public async getSkillDetail() {
    this.skillDetail = await this.skillSv.get(this.item.skillId);
    this.getLevel();
    this.progressCal();
    this.loadDone = true;
  }
  public getLevel() {
    for (let i = 0; i < this.skillDetail.levels.length; i++) {
      if (this.item.exp > this.skillDetail.levels[i]) {
        if (this.level != this.skillDetail.levels.length) {
          this.level = i + 1;
        }
      }
    }
  }
  public progressCal() {
    if (this.item.exp == this.skillDetail.levels[this.level]) {
      if (this.level != this.skillDetail.levels.length - 1) {
        this.item.exp = 0;
        this.level++;
        this.progressBar = 0;
      } else {
        this.progressBar = 100;
        this.level = 'Max';
      }
    } else {
      this.progressBar = parseInt(
        (
          ((this.item.exp - this.skillDetail.levels[this.level - 1]) /
            (this.skillDetail.levels[this.level] -
              this.skillDetail.levels[this.level - 1])) *
          100
        ).toString()
      );
    }

    if (this.progressBar <= 40) {
      this.status = 'info';
    }
    if (this.progressBar > 40) {
      this.status = 'primary';
    }
    if (this.progressBar > 80) {
      this.status = 'success';
    }
  }
}
