import { Component, OnInit } from '@angular/core';
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
  public roles!: Role[];
  public loadDone = false;
  constructor(private profileSv: ProfileService) {}

  ngOnInit(): void {
    setTimeout(async () => {
      await this.getRoles();
    }, 100);
  }
  public async getRoles() {
    this.roles = await (await this.profileSv.get()).roles;
    console.log(this.roles);
    this.loadDone = true;
  }
}
