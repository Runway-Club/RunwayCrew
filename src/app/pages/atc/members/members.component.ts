import { Component, OnInit } from '@angular/core';
import { ATCService } from 'src/app/services/atc.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from 'src/models/role.model';
import { UserProfile } from 'src/models/user-profile.model';
import { FormControl } from '@angular/forms';
import { Observable, ObservableInput, of } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { NbTagComponent } from '@nebular/theme';

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
  ) {}
  // myControl = new FormControl();
  // roleName!: Role['name'];
  // filteredRoles!: Observable<string[]>;
  filteredRolesOptions!: Observable<Role[]>;
  filteredProfilesOptions: UserProfile[] = []
  filteredATCmemsOptions!: Observable<UserProfile[]>;
  inputRolesControl!: FormControl;
  inputProfilesControl!: FormControl;
  inputATCmemsControl!: FormControl;
  rolesFilter = [];
  profilesFilter = [];

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

  public totalLength!:number;
  public page:number = 1;
  public pageSize:number = 4;

  public loadDoneATC = false;
  public loadDoneProfiles = false;
  public loadDoneRoles = false;

  async ngOnInit(): Promise<void> {
    // this.filteredRoles = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value))
    // );

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

    this.filteredRolesOptions = of(this.roles);
    this.inputRolesControl = new FormControl();
    this.filteredRolesOptions = this.inputRolesControl.valueChanges.pipe(
      startWith(''),
      map((filterString) => this.filterRoles(filterString))
    );
    // this.filteredProfilesOptions = of(this.profiles);
    // this.inputProfilesControl = new FormControl();
    // this.filteredProfilesOptions = this.inputProfilesControl.valueChanges.pipe(
    //   startWith(''),
    //   map((filterString) => this.filterProfiles(filterString))
    // );
    this.filteredATCmemsOptions = of(this.atcMembers);
    this.inputATCmemsControl = new FormControl();
    this.filteredATCmemsOptions = this.inputATCmemsControl.valueChanges.pipe(
      startWith(''),
      map((filterString) => this.filterATCzone(filterString))
    );

    this.atcService
      .getATCMembers(this.authSevice.token)
      .subscribe((profiles) => {
        this.atcMembers.length = 0;
        this.atcMembers.push(...profiles);
        this.loadDoneATC = true;
      });
  }

  onSearch(value: string) { 
    if(!value){
      return;
    }
    this.profileService.getSearch(value).subscribe((res: UserProfile[])=>{
      this.filteredProfilesOptions = res
    })
  }

  // public _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.roleName.filter((role) =>
  //     role.toLowerCase().includes(filterValue)
  //   )
  // }

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
      return;
    } else {
      this.selectedMultipleProfile.push(profile);
    }
  }
  onTagRemove(tagToRemove: NbTagComponent): void {
    let index = this.selectedMultipleProfile.findIndex(
      (item: any) => item.name === tagToRemove.text
    );
    this.selectedMultipleProfile.splice(index, 1);
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
          await this.profileService.updateProfile(
            this.selectedMultipleProfile[i]
          );
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
    this.countRolesOfUser = this.profiles
      .map((profile) => {
        return profile.roles.filter((i) => i === this.selectedTypeUser).length;
      })
      .filter((i) => i == 1).length;
  }

  private filterRoles(value: string): Role[] {
    const filterValue = value.toLowerCase();
    if (filterValue == '') {
      return [];
    }
    return this.roles.filter((optionValue) =>
      optionValue.name.toLowerCase().includes(filterValue)
    );
  }

  private filterProfiles(value: string): UserProfile[] {
    const filterValue = value.toLowerCase();
    if (filterValue == '') {
      return [];
    }
    return this.profiles.filter(
      (optionValue) =>
        optionValue.name.toLowerCase().includes(filterValue) ||
        optionValue.email.toLowerCase().includes(filterValue)
    );
  }

  private filterATCzone(value: string): UserProfile[] {
    const filterValue = value.toLowerCase();
    if (filterValue == '') {
      return [];
    }
    return this.atcMembers.filter(
      (optionValue) =>
        optionValue.name.toLowerCase().includes(filterValue) ||
        optionValue.email.toLowerCase().includes(filterValue)
    );
  }

  changeRole(value: Role) {
    this.selectedRole = value;
  }
  changeProfile(value: UserProfile) {
    this.selectedProfile = value;
  }
  selectedForATC(value: UserProfile) {
    this.selectedProfileForATCZone = value;
  }
  selectedRemoveATC(value: UserProfile) {
    this.selectedProfileRemoveFromATC = value;
  }
  selectedReclaim(value: UserProfile) {
    this.selectedProfileForReclaim = value;
  }
}
