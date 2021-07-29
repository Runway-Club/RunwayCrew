import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { SkillService } from 'src/app/services/skill.service';
import { Role } from 'src/models/role.model';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  public data!: UserProfile[];
  public commonSkill!: number[];
  public roles: Role[] = [];

  constructor(
    private profileSv: ProfileService,
    private skillSv: SkillService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getAllUser();
      await this.getCommonSkill();
    }, 0);
    this.roleService.getAll().subscribe((roles) => {
      this.roles.length = 0;
      this.roles.push(...roles);
    });
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
