import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ContributionService } from 'src/app/services/contribution.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserContribution } from 'src/models/user-profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usr: any = null;
  contributionInfo: UserContribution | undefined;
  loadDone = false;
  public commonSkill!: number[];
  public skill!: UserContribution;
  public level: any = 0;
  constructor(
    private authService: AuthenticationService,
    private auth: AngularFireAuth,
    private contributionService: ContributionService,
    private skillService: SkillService
  ) { }

  ngOnInit() {
    setTimeout(async () => {
      await this.getContributions();
      this.usr = await this.authService.user;
      this.commonSkill = await this.getCommonSkill();
      await this.getSkill();
      this.loadDone = true;
    }, 500);
  }

  async getContributions() {
    this.contributionInfo = await this.contributionService.get();
  }
  public async getCommonSkill() {
    return (await this.skillService.get('common')).levels;
  }
  public async getSkill() {
    this.skill = await this.contributionService.get(this.usr.uid);
    console.log(this.skill);
  }
  public checkLevel() {
    for (let i = 0; i < this.commonSkill.length; i++) {
      if (this.skill.exp >= this.commonSkill[i]) {
        this.level = i + 1;
      }
    }
    if (this.level == 0) {
      this.level = 1;
    }
  }
}
