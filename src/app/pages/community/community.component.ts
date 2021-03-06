import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { SkillService } from 'src/app/services/skill.service';
import { environment } from '../../../environments/environment.prod';
import { Role } from 'src/models/role.model';
import { RegistrationProfile, UserContribution, UserProfile } from 'src/models/user-profile.model';
import { PageEvent } from '@angular/material/paginator';
import { UtilsService } from 'src/app/services/utils.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Achievement } from 'src/models/achievement.model';
import { Contribution } from 'src/models/contribution.model';
import { Skill } from 'src/models/skill.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppComponent } from '../../app.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.service';
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
  public loadDone = false;
  public totalItems!: number;
  constructor(
    private profileSv: ProfileService,
    private skillSv: SkillService,
    private roleService: RoleService,
    private httpClient: HttpClient,
    private utils: UtilsService,
    private auth: AuthenticationService,
    private AppComponent: AppComponent,
    private route: ActivatedRoute,
    private location: Location,
    private Router:Router
  ) {
    this.route.queryParams.subscribe((params: any) => {
      if (params) {
        this.selectedRoleId = params.role || undefined
        this.params.pageNum = params.pageNum || 0
      }
    })
  }
  totalLength: any
  ngOnInit(): void {

    setTimeout(async () => {
      await this.getUsers();
      await this.getCommonSkill();
      this.loadDone = true;
    }, 0);
    this.roleService.getAll().subscribe((roles) => {
      this.roles.length = 0;
      this.roles.push(...roles);
    });
    this.AppComponent.selectedMenu = 1
    this.AppComponent.showSidemenu = false
    this.totalLength = this.data.length
  }

  public params = {
    pageSize: 16,
    pageNum: 0
  }

  async changePage(event: any) {
    this.params.pageNum = event
    this.location.replaceState(`?pageNum=${event}&role=${this.selectedRoleId}`);
    await this.getUsers();
  }

  public async getUsers() {
    let users = await this.profileSv.getPaginate(this.params.pageSize, this.selectedRoleId, this.params.pageNum);//, this.data[this.data.length - 1]);
    this.totalItems = users.totalItems
    if (users.data.length == 0 && this.params.pageNum !=0) {
      this.pageEmpty()
      this.data = users.data
      return false;
    }
    this.data.length = 0;
    this.data.push(...users.data);
    return true;
  }

  private async pageEmpty(){
    const FIRST_PAGE = 0;
    // this.Router.navigate([`/community?pageNum=${FIRST_PAGE}&role=${this.selectedRoleId}`])
    window.location.href = `/community?pageNum=${FIRST_PAGE}&role=${this.selectedRoleId}`
    // this.location.replaceState(`/community?pageNum=${FIRST_PAGE}&role=${this.selectedRoleId}`);
  }

  public async getCommonSkill() {
    this.commonSkill = await (await this.skillSv.get('614854c1a58a2a2a3c8e428b')).levels;
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
    this.params.pageNum = 0
    if(roleId == undefined){
      this.location.replaceState('community')
    }else{
      this.location.replaceState(`?pageNum=${this.params.pageNum}&role=${roleId}`);
    }
    this.selectedRoleId = roleId;
    await this.getUsers();
  }

  async testPost() {
    let newATC: UserProfile = {
      _id: '',
      address: 'HCM',
      dob: 0,
      email: 'test@gaml.com',
      gender: 'male',
      name: '',
      phoneNumber: '',
      photoUrl: '',
      roles: [],
      selectedRoles: [],
      uid: '',
      contribMetadata: {},
      facebook: '',
      linkIn: '',
      profileMetadata: {},
      styleUserRead: ''
    }


    await this.httpClient.post(environment.endpoint + 'atc', newATC).toPromise().then((res) => {
      console.log(res)
    })
  }

  cloneAchiCollection() {
    this.utils.getAll<Achievement>("achievements").subscribe(async (datas) => {
      for (let i = 0; i < datas.length; i++) {
        await this.httpClient.post<Achievement>(environment.endpoint + "achievements123", datas[i]).toPromise().then(res => {
          console.log(res)
        })
      }
    })
  }
  cloneATCCollection() {
    this.utils.getAll<UserProfile>("atc").subscribe(async (datas) => {
      for (let i = 0; i < datas.length; i++) {
        await this.httpClient.post(environment.endpoint + "atc", datas[i]).toPromise().then(res => {
          console.log(res)
        })
      }
    })
  }
  cloneContriCollection() {
    this.utils.getAll<Contribution>("contributions").subscribe(async (datas) => {
      for (let i = 0; i < datas.length; i++) {
        await this.httpClient.post(environment.endpoint + "contri", datas[i]).toPromise().then(res => {
          console.log(res)
        })
      }
    })
  }
  cloneProfileCollection() {
    this.utils.getAll<UserProfile>("profiles").subscribe(async (datas) => {
      for (let i = 0; i < datas.length; i++) {
        const newProfile = {
          ...datas[i],
          styleUserRead: 'Everyone'
        }
        await this.httpClient.post(environment.endpoint + "profile", newProfile).toPromise().then(res => {
          console.log(res)
        })
      }
    })
  }
  cloneRoleCollection() {
    this.utils.getAll<Role>("roles").subscribe(async (datas) => {
      for (let i = 0; i < datas.length; i++) {
        await this.httpClient.post(environment.endpoint + "roles123", datas[i]).toPromise().then(res => {
          console.log(res)
        })
      }
    })
  }
  cloneSkillCollection() {
    this.utils.getAll<Skill>("skills").subscribe(async (datas) => {
      for (let i = 0; i < datas.length; i++) {
        await this.httpClient.post(environment.endpoint + "skill123", datas[i]).toPromise().then(res => {
          console.log(res)
        })
      }
    })
  }
}
