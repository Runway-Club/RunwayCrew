import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  public data!: UserProfile[];
  public commonSkill!: number[];
  constructor(
    private profileSv: ProfileService,
    private skillSv: SkillService
  ) {}

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getAllUser();
      await this.getCommonSkill();
    }, 0);
  }
  public async getAllUser() {
    await this.profileSv.getAll().subscribe(async (user) => {
      this.data = user;
      console.log(this.data);
    });
  }
  public async getCommonSkill() {
    this.commonSkill = await (await this.skillSv.get('common')).levels;
  }
}
