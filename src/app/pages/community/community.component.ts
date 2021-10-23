import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { SkillService } from 'src/app/services/skill.service';
import { environment } from '../../../environments/environment.prod';
import { Role } from 'src/models/role.model';
import { RegistrationProfile, UserContribution, UserProfile } from 'src/models/user-profile.model';

import { UtilsService } from 'src/app/services/utils.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { Achievement } from 'src/models/achievement.model';
import { Contribution } from 'src/models/contribution.model';
import { Skill } from 'src/models/skill.model';


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
    private roleService: RoleService,

    private httpClient: HttpClient,
    private utils: UtilsService,
    private db: AngularFirestore
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

    // this.getData()
    // this.getData()
    // this.testPost()
    // this.cloneATCCollection()
    //this.cloneAchiCollection()
    // this.cloneContriCollection()
    //this.cloneProfileCollection()
    //this.cloneRoleCollection()
    //this.cloneSkillCollection()
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
    this.selectedRoleId = roleId;
    await this.getUsers();
  }

  async getData() {
    this.utils.getAll("achievements").subscribe(async (data) => {
      console.log({ achievements: data })
    })
    this.utils.getAll("achievements").subscribe(async (data) => {
      console.log({ achievements: data })
    })
    this.utils.getAll("atc").subscribe(async (data) => {
      console.log({ atc: data })
    })
    this.utils.getAll("contributions").subscribe(async (data) => {
      console.log({ contributions: data })
    })
    this.utils.getAll("profiles").subscribe(async (data) => {
      console.log({ profiles: data })
    })
    this.utils.getAll("roles").subscribe(async (data) => {
      console.log({ roles: data })
    })
    this.utils.getAll("skills").subscribe(async (data) => {
      console.log({ skills: data })
    })
  }
  async testPost() {
    let newATC: UserProfile={
      _id:'',
      address:'HCM',
      dob:0,
      email:'test@gaml.com',
      gender:'male',
      name:'',
      phoneNumber: '',
      photoUrl:'',
      roles:[],
      selectedRoles:[],
      uid:'',
      contribMetadata:{},
      facebook:'',
      linkIn:'',
      profileMetadata:{}
    }


    await this.httpClient.post(environment.endpoint+'atc', newATC).toPromise().then((res) => {
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
        await this.httpClient.post(environment.endpoint + "profile123", datas[i]).toPromise().then(res => {
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
