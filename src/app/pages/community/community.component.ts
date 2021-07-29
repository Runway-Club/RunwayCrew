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
  public data: UserProfile[] = [];
  public commonSkill!: number[];
  public roles: Role[] = [];
  public selectedRoleId?: string = undefined;
  public lasts: UserProfile[] = [];
  constructor(
    private profileSv: ProfileService,
    private skillSv: SkillService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getUsers();
      await this.getCommonSkill();
    }, 0);
    this.roleService.getAll().subscribe((roles) => {
      this.roles.length = 0;
      this.roles.push(...roles);
    });
  }
  public async getUsers() {
    let users = await this.profileSv.getPaginate(1000, this.selectedRoleId);//, this.data[this.data.length - 1]);
    if (users.length == 0) {
      return false;
    }
    this.data.length = 0;
    this.data.push(...users);
    return true;
  }
  public async getCommonSkill() {
    this.commonSkill = await (await this.skillSv.get('common')).levels;
  }
  public async goNext() {
    this.lasts.push(this.data[this.data.length - 1]);
    await this.getUsers();
  }
  public async goPrevious() {
    this.lasts.pop();
    this.data.push(this.lasts[this.lasts.length - 1]);
    await this.getUsers();
  }

  public async getUserByRole(roleId?: string) {
    this.selectedRoleId = roleId;
    await this.getUsers();
  }

}
