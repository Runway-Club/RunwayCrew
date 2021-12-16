import { Component, OnInit } from '@angular/core';
import { ATCService } from 'src/app/services/atc.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/models/role.model';
import { UserProfile } from 'src/models/user-profile.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private atcService: ATCService,
    private roleService: RoleService,
    private authSevice: AuthenticationService
  ) { }
  selectedTypeUser = '';
  countRolesOfUser: number = 0;
  public profiles: UserProfile[] = [];
  public roles: Role[] = [];
  public atcMembers: UserProfile[] = [];
  public selectedRole?: Role;
  public selectedProfile?: UserProfile;
  public selectedRoleForReclaim?: string;
  public selectedProfileForReclaim?: UserProfile;
  public selectedProfileForATCZone?: UserProfile;
  public selectedProfileRemoveFromATC!: UserProfile;
  public selectedMultipleProfile: UserProfile[] = [];

  public loadDoneATC = false;
  public loadDoneProfiles = false;
  public loadDoneRoles = false;

  async ngOnInit(): Promise<void> {
    this.profileService.getAll().subscribe((profiles) => {
      this.profiles.length = 0;
      this.profiles.push(...profiles);
      this.loadDoneProfiles = true;
    });
    this.roleService.getAll().subscribe((roles) => {
      this.roles.length = 0;
      this.roles.push(...roles);
      this.loadDoneRoles = true;
    });
    this.atcService.getATCMembers(this.authSevice.token).subscribe((profiles) => {
      this.atcMembers.length = 0;
      this.atcMembers.push(...profiles);
      this.loadDoneATC = true;
    });
  }

  public getRoleString(profile: UserProfile) {
    if (!profile.roles) {
      return 'No role';
    }
    let r = profile.roles.length == 0 ? 'No role' : '';
    for (let role of profile.roles) {
      r += role + ', ';
    }
    return r;
  }
  public getRoleATCString(profile: any) {
    if (!profile.roles) {
      return 'No role';
    }
    let r = profile.roles.length == 0 ? 'No role' : '';
    for (let role of profile.roles) {
      r += role.name + ', ';
    }
    return r;
  }
  public getDate(time: number) {
    return new Date(time).toLocaleDateString();
  }

  // check logic for selected multiple profile
  public checkLogicMultipleProfiles(profile: UserProfile) {
    let count = 0;
    if (this.selectedMultipleProfile.length == 0) {
      this.selectedMultipleProfile.push(profile);
      return;
    }
    for (let i = 0; i < this.selectedMultipleProfile.length; i++) {
      if (profile.uid == this.selectedMultipleProfile[i]?.uid) {
        count++;
        break;
      }
    }
    if (count > 0) {
      return
    } else {
      this.selectedMultipleProfile.push(profile);
    }
  }

  public async assignRole() {

    for (let i = 0; i < this.selectedMultipleProfile.length; i++) {
      if (!this.selectedMultipleProfile[i]?.roles) {
        this.selectedMultipleProfile[i]!.roles = [];
      }
      if (
        this.selectedMultipleProfile[i]?.roles?.findIndex(
          (r) => r == this.selectedRole?.id
        ) == -1
      ) {
        if (!this.selectedRole) {
          break;
        }
        this.selectedMultipleProfile[i].roles.push(this.selectedRole.id);
        try {
          
          await this.profileService.updateProfile(this.selectedMultipleProfile[i]);
        } catch (error) {
          console.log(error);
        }
      }
      if (!this.selectedMultipleProfile[i]) {
        continue;
      }
    }
    this.selectedMultipleProfile = [];
    this.selectedProfile = undefined;
    this.selectedRole = undefined;

  }
  public async reclaimRole() {
    if (!this.selectedProfileForReclaim) {
      return;
    }
    let roleId = this.selectedProfileForReclaim?.roles.findIndex(
      (r) => r == this.selectedRoleForReclaim
    );
    if (roleId != -1) {
      this.selectedProfileForReclaim?.roles.splice(roleId ?? -1, 1);
    }
    try {
      await this.profileService.updateProfile(this.selectedProfileForReclaim);
      this.selectedProfileForReclaim = undefined;
      this.selectedRoleForReclaim = undefined;
    } catch (err) {
      console.log(err);
    }
  }

  public async addToATC() {
    if (!this.selectedProfileForATCZone) {
      return;
    }
    await this.atcService.addToATC(this.selectedProfileForATCZone);
    window.location.reload();
  }

  public async removeFromATC(id: string) {
    // console.log(this.selectedProfileRemoveFromATC);
    // console.log(id);
    await this.atcService.removeFromATC(id);
    window.location.reload();
  }
  public changeTypeUser() {
    this.countRolesOfUser = (this.profiles.map((profile) => {
      return profile.roles.filter(i => i === this.selectedTypeUser).length
    })).filter(i => i == 1).length;
  }
}
