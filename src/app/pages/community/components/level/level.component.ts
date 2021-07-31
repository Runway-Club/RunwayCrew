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
  @Input() skillCommon!: number[];
  public skill!: UserContribution;
  public loadDone = false;
  public progressBar: number = 0;
  public level: any = 0;
  public status: string = 'primary';
  public remainingExp = 0;
  constructor(
    private contrib: ContributionService,
    private skillSv: SkillService
  ) { }

  ngOnInit(): void {
    setTimeout(async () => {
      this.skill = await this.getSkill();
      // console.log(this.skill);
      this.checkLv();
      this.progressCalc();
      this.getRemainingExp();
      this.loadDone = true;
    }, 100);
  }
  public async getSkill() {
    let result = await this.contrib.get(this.uid);
    return result;
  }
  public checkLv() {
    for (let i = 0; i < this.skillCommon.length; i++) {
      if (this.skill.exp >= this.skillCommon[i]) {
        this.level = i + 1;
      }
    }
    if (this.level == 0) {
      this.level = 1;
    }
  }
  public progressCalc() {
    if (this.skill.exp == this.skillCommon[this.level]) {
      if (this.level != this.skillCommon[length - 1]) {
        this.skill.exp = 0;
        this.level++;
        this.progressBar = 0;
      } else {
        this.progressBar = 100;
        this.level = 'Max';
      }
    } else {
      if (this.skill.exp == 0) {
        this.level = 1;
        this.progressBar = 0;
      } else {
        this.progressBar =
          Math.abs(
            (this.skill.exp - this.skillCommon[this.level - 1]) /
            Math.abs(
              this.skillCommon[this.level] - this.skillCommon[this.level - 1]
            )
          ) * 100;
      }
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
    // console.log(
    //   this.progressBar + ' status: ' + this.status + ' level: ' + this.level
    // );
  }

  public getRemainingExp() {
    if (this.skillCommon.length < this.level) {
      this.remainingExp = this.skill.exp;
    }
    else {
      this.remainingExp = this.skillCommon[this.level] - this.skill.exp;
    }
  }
}
