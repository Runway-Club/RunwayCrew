import { Component, Input, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { SkillService } from 'src/app/services/skill.service';
import { Role } from 'src/models/role.model';
import { Skill } from 'src/models/skill.model';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  @Input() listUser!: UserProfile[];
  @Input() commonSkill!: number[];

  skills: Skill[] = [];
  roles: Role[] = [];

  public loadDone = false;
  constructor(private skillSv: SkillService, private roleService: RoleService) { }

  loaded!: Promise<boolean>;

  ngOnInit(): void {
    this.loadDone = true;

    this.skillSv.getAll().subscribe((skills) => {
      this.skills.length = 0;
      this.skills.push(...skills);
    });

    this.roleService.getAll().subscribe((roles) => {
      this.roles.length = 0;
      this.roles.push(...roles);
      this.loaded = Promise.resolve(true);
    });

  }

  getRoleById(id: string) {
    return this.roles.find((s, i) => s.id == id);
  }
}
