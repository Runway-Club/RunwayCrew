import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AchievementService } from 'src/app/services/achievement.service';
import { ContributionService } from 'src/app/services/contribution.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SkillService } from 'src/app/services/skill.service';
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { Achievement } from 'src/models/achievement.model';
import { Skill } from 'src/models/skill.model';
import { UserProfile } from 'src/models/user-profile.model';
@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss'],
})
export class AchievementComponent implements OnInit {
  filteredAchiOptions: Achievement[]=[];
  filteredProfilesOptions: UserProfile[]=[];
  inputAchiControl!: FormControl;
  inputProfilesControl!: FormControl;

  constructor(
    private achievementService: AchievementService,
    private skillService: SkillService,
    private profileService: ProfileService,
    private contributionService: ContributionService,
    private dialog: NbDialogService
  ) {}

  ngOnInit(): void {
    // this.filteredProfilesOptions = of(this.profiles);
    // this.inputProfilesControl = new FormControl();
    // this.filteredProfilesOptions = this.inputProfilesControl.valueChanges.pipe(
    //   startWith(''),
    //   map((filterString) => this.filterProfiles(filterString))
    // );
    // this.filteredAchiOptions = of(this.achievements);
    // this.inputAchiControl = new FormControl();
    // this.filteredAchiOptions = this.inputAchiControl.valueChanges.pipe(
    //   startWith(''),
    //   map((filterString) => this.filterAchivs(filterString))
    // );
    // this.loadPage();
    this.skillService.getAll().subscribe((skills) => {
      if (!skills) {
        return;
      }
      this.skills.length = 0;
      this.skills.push(...skills);
      this.loadDoneSkills = true;
    });
    this.profileService.getAll().subscribe((profiles) => {
      this.profiles.length = 0;
      this.profiles.push(...profiles);
      this.loadDoneProfiles = true;
    });
    this.achievementService.getAll().subscribe((achievements) => {
      this.achievements.length = 0;
      this.achievements.push(...achievements);
      this.loadDoneAchi = true;
      this.totalLength = this.achievements.length
    });
  }

  public page:number = 1;
  public pageSize:number = 5;
  public totalLength!:number;
  
  public achievements: Achievement[] = [];
  public skills: Skill[] = [];
  public selectedProvidingAchievement?: Achievement;
  public profiles: UserProfile[] = [];
  public selectedProvidedUser?: UserProfile;
  public skipAchievement: boolean = false;
  public loadDoneSkills = false;
  public loadDoneProfiles = false;
  public loadDoneAchi = false;

  // private filterAchivs(value: string): Achievement[] {
  //   const filterValue = value.toLowerCase();
  //   if (filterValue == '') {
  //     return [];
  //   }
  //   return this.achievements.filter((optionValue) =>
  //     optionValue.name.toLowerCase().includes(filterValue)
  //   );
  // }

  public addEmptyAchievement() {
    this.achievements.push({
      _id: '',
      id: Date.now().toString(),
      name: '',
      description: '',
      image: '',
      exp: 0,
      skills: [],
      credit: 0,
    });
  }

  public uploadImage(i: number) {
    this.dialog.open(FileUploadComponent).onClose.subscribe((data) => {
      this.achievements[i].image = data.url;
    });
  }

  public async deleteAchievement(id: string) {
    await this.achievementService.delete(id);
    window.location.reload();
  }

  public async saveAchievement(i: number) {
    const _id = this.achievements[i]._id;
    if (!_id) {
      await this.achievementService.create(this.achievements[i]);
    } else {
      await this.achievementService.update(this.achievements[i]);
    }
  }

  onSearch(value: string) { 
    if(!value){
      return;
    }
    this.profileService.getSearch(value).subscribe((res: UserProfile[])=>{
      this.filteredProfilesOptions = res
    })
  }

  onSearchAchi(value: string){
    if(!value){
      return;
    }
    this.achievementService.getSearch(value).subscribe((res: Achievement[])=>{
      this.filteredAchiOptions = res
    })
  }

  // public async loadPage() {
  //   let achievements = await this.achievementService.getPaginate(this.page * this.size, this.size);
  //   this.achievements.length = 0;
  //   this.achievements.push(...achievements.docs.map((d) => <Achievement>d.data()));
  // }

  public async addNewSkill(achievement: Achievement) {
    achievement.skills.push({
      skillId: '',
      exp: 0,
    });
  }

  public getSkillById(id: string): Skill | undefined {
    return this.skills.find((s) => s.id == id);
  }

  public async provideAchievement() {
    if (!this.selectedProvidedUser || !this.selectedProvidingAchievement) {
      return;
    }
    try {
      // console.log(this.selectedProvidingAchievement)
      // console.log(this.selectedProvidedUser?._id)
      // console.log(this.skipAchievement)
      await this.contributionService.provide(
        this.selectedProvidingAchievement,
        this.selectedProvidedUser?.uid,
        this.skipAchievement
      );
      this.selectedProvidedUser = undefined;
      this.selectedProvidingAchievement = undefined;
      this.skipAchievement = false;
    } catch (err) {
      console.log(err);
    }
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
  AchivsSelected(value: Achievement) {
    this.selectedProvidingAchievement = value;
  }
  selectedProfiles(value: UserProfile) {
    this.selectedProvidedUser = value;
  }
}
