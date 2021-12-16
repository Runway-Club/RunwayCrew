import { Component, Input, OnInit } from '@angular/core';
import { ContributionService } from 'src/app/services/contribution.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoleService } from 'src/app/services/role.service';
import { SkillService } from 'src/app/services/skill.service';
import { Role } from 'src/models/role.model';
import { Skill } from 'src/models/skill.model';
import { UserContribution, UserProfile } from 'src/models/user-profile.model';
import { Router } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  @Input() listUser!: UserProfile[];
  @Input() commonSkill!: any[];
  @Input() params: any;
  @Output() changePageEvent = new EventEmitter<number>();
  skills: Skill[] = [];
  roles: Role[] = [];
  public skill!: UserContribution;
  public level: any = 0;
  public status: string = 'primary';
  public remainingExp = 0;
  public loadDone = false;
  public progressBar: number = 0;
  public exp: any[] = [];
  public totalLength:any;
  public page:number = 1;
  constructor(
    private skillSv: SkillService,
    private roleService: RoleService,
    private Router:Router
  ) {}

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
    this.listUser.length = this.totalLength
    console.log(this.params)
  }

  change(event:any){
    const page = event - 1;
    this.changePageEvent.emit(page)
  }

  getRoleById(id: string) {
    return this.roles.find((s, i) => s.id == id);
  }

  getOutput(newItem: any) {
    this.exp.push(newItem);
  }
  getProgress(uid: string) {
    for (let i of this.exp) {
      if (i.uid == uid) {
        return i.progress;
      }
    }
  }
  
  getProfile(id: string){
    this.Router.navigate(['profile'], { queryParams: {id} })
  }
}