import { Component, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  public listUser!: UserProfile[];
  public commonSkill?: number[];
  public loadDone = false;
  constructor(
    private profileSv: ProfileService,
    private skillSv: SkillService
  ) {}

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getAllUser();
      this.commonSkill = await this.getCommonSkill();
      this.loadDone = true;
    }, 500);
  }

  public async getAllUser() {
    await this.profileSv.getAll().subscribe(async (user) => {
      this.listUser = user;
      console.log(this.listUser);
    });
  }
  public async getCommonSkill() {
    let result = await this.skillSv.get('common');
    return result.levels;
  }
}
