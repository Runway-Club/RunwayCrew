import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/models/role.model';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {

  @Input()
  public set roleIds(roles: string[]) {
    roles.map(async (r) => {
      this.roles.push(await this.roleService.getRoleId(r));
    })
  }

  public roles: Role[] = [];

  constructor(private profileSv: ProfileService, private roleService: RoleService) { }

  @Input()
  uid = '';

  ngOnInit(): void { }
}
